import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { VcfPaymentsRepository } from '../infrastructure/vcf-payments.repository';
import { VcfSubscriptionsService } from '../../vcf-subscriptions/application/vcf-subscriptions.service';
import { VcfNotificationsService } from '../../vcf-notifications/application/vcf-notifications.service';
import {
  VcfPaymentEventEntity,
  VcfPaymentEventType,
  VcfPaymentEventStatus
} from '../domain/vcf-payment-event.entity';
import {
  VcfSubscriptionTier,
  VcfSubscriptionStatus
} from '../../vcf-subscriptions/domain/vcf-subscription.entity';
import { VcfNotificationType } from '../../vcf-notifications/domain/vcf-notification.entity';

@Injectable()
export class VcfPaymentsService {
  private readonly logger = new Logger(VcfPaymentsService.name);
  private stripe: Stripe;
  private readonly webhookSecret: string;

  constructor(
    private readonly paymentsRepository: VcfPaymentsRepository,
    private readonly subscriptionsService: VcfSubscriptionsService,
    private readonly notificationsService: VcfNotificationsService,
    private readonly configService: ConfigService,
  ) {
    const stripeSecretKey = this.configService.get('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      this.logger.warn('Stripe secret key not configured - payment functionality disabled');
      this.stripe = null;
    } else {
      this.stripe = new Stripe(stripeSecretKey, {
        apiVersion: '2025-08-27.basil' as any,
      });
    }

    this.webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET', '');
  }

  async handleWebhook(body: string, signature: string): Promise<void> {
    if (!this.stripe) {
      this.logger.warn('Stripe not configured - webhook ignored');
      return;
    }

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(body, signature, this.webhookSecret);
    } catch (error) {
      this.logger.error(`Webhook signature verification failed: ${error.message}`);
      throw new Error('Invalid webhook signature');
    }

    // Check for duplicate events
    const existingEvent = await this.paymentsRepository.findByStripeEventId(event.id);
    if (existingEvent) {
      this.logger.warn(`Duplicate webhook event received: ${event.id}`);
      return;
    }

    // Create payment event record
    const paymentEvent = await this.createPaymentEvent(event);

    try {
      // Process the event based on type
      await this.processEvent(paymentEvent, event);

      paymentEvent.status = VcfPaymentEventStatus.PROCESSED;
      paymentEvent.processedAt = new Date();
    } catch (error) {
      paymentEvent.status = VcfPaymentEventStatus.FAILED;
      paymentEvent.failedAt = new Date();
      paymentEvent.errorMessage = error.message;
      paymentEvent.retryCount++;

      if (paymentEvent.retryCount < paymentEvent.maxRetries) {
        paymentEvent.nextRetryAt = new Date(Date.now() + Math.pow(2, paymentEvent.retryCount) * 60000);
        this.logger.warn(`Event ${event.id} processing failed, will retry`);
      } else {
        this.logger.error(`Event ${event.id} processing failed after max retries`);
      }
    }

    await this.paymentsRepository.update(paymentEvent);
  }

  private async createPaymentEvent(event: Stripe.Event): Promise<VcfPaymentEventEntity> {
    const paymentEvent = this.paymentsRepository.create({
      stripeEventId: event.id,
      type: event.type as VcfPaymentEventType,
      status: VcfPaymentEventStatus.PENDING,
      eventData: event.data.object,
      webhookReceivedAt: new Date(),
    });

    // Extract common fields
    const dataObject = event.data.object as any;

    if (dataObject.customer) {
      paymentEvent.stripeCustomerId = dataObject.customer;
    }
    if (dataObject.subscription) {
      paymentEvent.stripeSubscriptionId = dataObject.subscription;
    }
    if (dataObject.invoice) {
      paymentEvent.stripeInvoiceId = dataObject.invoice;
    }
    if (dataObject.charge) {
      paymentEvent.stripeChargeId = dataObject.charge;
    }
    if (dataObject.payment_intent) {
      paymentEvent.stripePaymentIntentId = dataObject.payment_intent;
    }
    if (dataObject.amount) {
      paymentEvent.amount = dataObject.amount;
    }
    if (dataObject.currency) {
      paymentEvent.currency = dataObject.currency;
    }

    await this.paymentsRepository.save(paymentEvent);
    return paymentEvent;
  }

  private async processEvent(paymentEvent: VcfPaymentEventEntity, event: Stripe.Event): Promise<void> {
    this.logger.log(`Processing event: ${event.type}`);

    switch (event.type) {
      case 'customer.subscription.created':
        await this.handleSubscriptionCreated(paymentEvent, event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.updated':
        await this.handleSubscriptionUpdated(paymentEvent, event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await this.handleSubscriptionDeleted(paymentEvent, event.data.object as Stripe.Subscription);
        break;

      case 'invoice.payment_succeeded':
        await this.handlePaymentSucceeded(paymentEvent, event.data.object as Stripe.Invoice);
        break;

      case 'invoice.payment_failed':
        await this.handlePaymentFailed(paymentEvent, event.data.object as Stripe.Invoice);
        break;

      case 'customer.subscription.trial_will_end':
        await this.handleTrialWillEnd(paymentEvent, event.data.object as Stripe.Subscription);
        break;

      default:
        this.logger.log(`Unhandled event type: ${event.type}`);
        paymentEvent.status = VcfPaymentEventStatus.IGNORED;
    }
  }

  private async handleSubscriptionCreated(
    paymentEvent: VcfPaymentEventEntity,
    subscription: Stripe.Subscription
  ): Promise<void> {
    const user = await this.getUserFromCustomerId(subscription.customer as string);
    if (!user) {
      throw new Error(`User not found for customer ${subscription.customer}`);
    }

    const tier = this.mapStripePriceToTier(subscription.items.data[0].price.id);

    const vcfSubscription = await this.subscriptionsService.createSubscription(
      user,
      tier,
      subscription.customer as string
    );

    // Update subscription with Stripe details
    vcfSubscription.stripeSubscriptionId = subscription.id;
    vcfSubscription.status = VcfSubscriptionStatus.ACTIVE;
    vcfSubscription.startDate = new Date((subscription as any).current_period_start * 1000);
    vcfSubscription.endDate = new Date((subscription as any).current_period_end * 1000);
    vcfSubscription.cancelAtPeriodEnd = subscription.cancel_at_period_end;
    // Note: The repository.update method will be called internally

    paymentEvent.user = user;
    paymentEvent.subscription = vcfSubscription;

    // Send notification
    await this.notificationsService.sendNotification(
      user,
      {
        type: VcfNotificationType.SUBSCRIPTION_CREATED,
        subject: 'Welcome to VibeCodeFix!',
        content: `Your ${tier} subscription is now active. You have access to all features included in your plan.`,
        metadata: { subscriptionId: vcfSubscription.id },
      }
    );
  }

  private async handleSubscriptionUpdated(
    paymentEvent: VcfPaymentEventEntity,
    subscription: Stripe.Subscription
  ): Promise<void> {
    const vcfSubscription = await this.subscriptionsService.findByStripeId(subscription.id);
    if (!vcfSubscription) {
      throw new Error(`VCF subscription not found for Stripe ID ${subscription.id}`);
    }

    const newTier = this.mapStripePriceToTier(subscription.items.data[0].price.id);
    const oldTier = vcfSubscription.tier;

    vcfSubscription.tier = newTier;
    vcfSubscription.status = this.mapStripeStatusToVcf(subscription.status);
    vcfSubscription.endDate = new Date((subscription as any).current_period_end * 1000);
    vcfSubscription.cancelAtPeriodEnd = subscription.cancel_at_period_end;

    await this.subscriptionsService.updateSubscription(vcfSubscription);

    if (newTier !== oldTier) {
      await this.notificationsService.sendNotification(
        vcfSubscription.user,
        {
          type: VcfNotificationType.SUBSCRIPTION_RENEWED,
          subject: 'Subscription Updated',
          content: `Your subscription has been changed from ${oldTier} to ${newTier}.`,
          metadata: { subscriptionId: vcfSubscription.id },
        }
      );
    }
  }

  private async handleSubscriptionDeleted(
    paymentEvent: VcfPaymentEventEntity,
    subscription: Stripe.Subscription
  ): Promise<void> {
    const vcfSubscription = await this.subscriptionsService.findByStripeId(subscription.id);
    if (!vcfSubscription) {
      return;
    }

    vcfSubscription.status = VcfSubscriptionStatus.CANCELLED;
    vcfSubscription.cancelledAt = new Date();

    await this.subscriptionsService.updateSubscription(vcfSubscription);

    await this.notificationsService.sendNotification(
      vcfSubscription.user,
      {
        type: VcfNotificationType.SUBSCRIPTION_CANCELLED,
        subject: 'Subscription Cancelled',
        content: 'Your VibeCodeFix subscription has been cancelled. You will continue to have access until the end of your current billing period.',
        metadata: { subscriptionId: vcfSubscription.id },
      }
    );
  }

  private async handlePaymentSucceeded(
    paymentEvent: VcfPaymentEventEntity,
    invoice: Stripe.Invoice
  ): Promise<void> {
    if (!(invoice as any).subscription) return;

    const vcfSubscription = await this.subscriptionsService.findByStripeId((invoice as any).subscription as string);
    if (!vcfSubscription) return;

    vcfSubscription.lastPaymentDate = new Date();
    vcfSubscription.lastPaymentAmount = invoice.amount_paid / 100; // Convert from cents

    await this.subscriptionsService.updateSubscription(vcfSubscription);

    await this.notificationsService.sendNotification(
      vcfSubscription.user,
      {
        type: VcfNotificationType.SUBSCRIPTION_RENEWED,
        subject: 'Payment Successful',
        content: `Your payment of €${invoice.amount_paid / 100} has been processed successfully.`,
        metadata: {
          subscriptionId: vcfSubscription.id,
          invoiceId: invoice.id,
        },
      }
    );
  }

  private async handlePaymentFailed(
    paymentEvent: VcfPaymentEventEntity,
    invoice: Stripe.Invoice
  ): Promise<void> {
    if (!(invoice as any).subscription) return;

    const vcfSubscription = await this.subscriptionsService.findByStripeId((invoice as any).subscription as string);
    if (!vcfSubscription) return;

    vcfSubscription.paymentFailedCount = (vcfSubscription.paymentFailedCount || 0) + 1;

    if (vcfSubscription.paymentFailedCount >= 3) {
      vcfSubscription.status = VcfSubscriptionStatus.PAST_DUE;
    }

    await this.subscriptionsService.updateSubscription(vcfSubscription);

    await this.notificationsService.sendNotification(
      vcfSubscription.user,
      {
        type: VcfNotificationType.SUBSCRIPTION_PAYMENT_FAILED,
        subject: 'Payment Failed',
        content: 'We were unable to process your payment. Please update your payment method to continue your subscription.',
        metadata: {
          subscriptionId: vcfSubscription.id,
          invoiceId: invoice.id,
        },
      }
    );
  }

  private async handleTrialWillEnd(
    paymentEvent: VcfPaymentEventEntity,
    subscription: Stripe.Subscription
  ): Promise<void> {
    const vcfSubscription = await this.subscriptionsService.findByStripeId(subscription.id);
    if (!vcfSubscription) return;

    const trialEndDate = new Date(subscription.trial_end * 1000);
    const daysRemaining = Math.ceil((trialEndDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

    await this.notificationsService.sendNotification(
      vcfSubscription.user,
      {
        type: VcfNotificationType.SUBSCRIPTION_RENEWED,
        subject: 'Trial Ending Soon',
        content: `Your trial period will end in ${daysRemaining} days. Add a payment method to continue your subscription.`,
        metadata: { subscriptionId: vcfSubscription.id },
      }
    );
  }

  private mapStripePriceToTier(priceId: string): VcfSubscriptionTier {
    const priceMapping = {
      [this.configService.get('STRIPE_PRICE_BASIC')]: VcfSubscriptionTier.BASIC,
      [this.configService.get('STRIPE_PRICE_PRO')]: VcfSubscriptionTier.PRO,
      [this.configService.get('STRIPE_PRICE_VIP')]: VcfSubscriptionTier.VIP,
      [this.configService.get('STRIPE_PRICE_STARTUP')]: VcfSubscriptionTier.STARTUP,
      [this.configService.get('STRIPE_PRICE_SCALEUP')]: VcfSubscriptionTier.SCALEUP,
    };

    return priceMapping[priceId] || VcfSubscriptionTier.BASIC;
  }

  private mapStripeStatusToVcf(status: Stripe.Subscription.Status): VcfSubscriptionStatus {
    const statusMapping = {
      'active': VcfSubscriptionStatus.ACTIVE,
      'past_due': VcfSubscriptionStatus.PAST_DUE,
      'canceled': VcfSubscriptionStatus.CANCELLED,
      'unpaid': VcfSubscriptionStatus.PAST_DUE,
      'trialing': VcfSubscriptionStatus.TRIAL,
    };

    return statusMapping[status] || VcfSubscriptionStatus.CANCELLED;
  }

  private async getUserFromCustomerId(customerId: string): Promise<any> {
    // This would typically query the user repository
    return this.subscriptionsService.getUserByStripeCustomerId(customerId);
  }

  async processRetryQueue(): Promise<void> {
    const pendingEvents = await this.paymentsRepository.findPendingRetries();

    for (const event of pendingEvents) {
      try {
        event.status = VcfPaymentEventStatus.PROCESSING;
        await this.paymentsRepository.update(event);

        // Reconstruct Stripe event and process
        const stripeEvent = {
          id: event.stripeEventId,
          type: event.type,
          data: { object: event.eventData },
        } as Stripe.Event;

        await this.processEvent(event, stripeEvent);

        event.status = VcfPaymentEventStatus.PROCESSED;
        event.processedAt = new Date();
      } catch (error) {
        event.status = VcfPaymentEventStatus.FAILED;
        event.failedAt = new Date();
        event.errorMessage = error.message;
        event.retryCount++;

        if (event.retryCount < event.maxRetries) {
          event.nextRetryAt = new Date(Date.now() + Math.pow(2, event.retryCount) * 60000);
        }
      }

      await this.paymentsRepository.update(event);
    }
  }

  async getPaymentHistory(userId: string): Promise<VcfPaymentEventEntity[]> {
    return this.paymentsRepository.findByUser(userId);
  }
}

// Add these methods to VcfSubscriptionsService
declare module '../../vcf-subscriptions/application/vcf-subscriptions.service' {
  interface VcfSubscriptionsService {
    findByStripeId(stripeId: string): Promise<any>;
    updateSubscription(subscription: any): Promise<void>;
    getUserByStripeCustomerId(customerId: string): Promise<any>;
  }
}