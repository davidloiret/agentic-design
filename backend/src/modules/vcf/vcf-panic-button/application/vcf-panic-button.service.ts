import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { VcfPanicButtonRepository } from '../infrastructure/vcf-panic-button.repository';
import { VcfPanicButtonEntity, VcfPanicButtonStatus, VcfPanicButtonSeverity, VcfPanicButtonType } from '../domain/vcf-panic-button.entity';
import { VcfSubscriptionsService } from '../../vcf-subscriptions/application/vcf-subscriptions.service';
import { User } from '../../../user/domain/entity/user.entity';

@Injectable()
export class VcfPanicButtonService {
  constructor(
    private readonly panicButtonRepository: VcfPanicButtonRepository,
    private readonly subscriptionsService: VcfSubscriptionsService,
  ) {}

  async triggerPanicButton(
    user: User,
    data: {
      type: VcfPanicButtonType;
      severity: VcfPanicButtonSeverity;
      title: string;
      description: string;
      impactDescription: string;
      affectedUsers?: number;
      isProductionIssue?: boolean;
      errorMessage?: string;
      stackTrace?: string;
      affectedServices?: string[];
      attemptedSolutions?: string[];
      estimatedDowntimeMinutes?: number;
      estimatedRevenueLoss?: number;
    },
  ): Promise<VcfPanicButtonEntity> {
    const subscription = await this.subscriptionsService.getSubscriptionByUserId(user.id);

    if (!['vip', 'startup', 'scaleup', 'enterprise'].includes(subscription.tier)) {
      throw new ForbiddenException('Panic button is only available for VIP and team subscriptions');
    }

    const panic = await this.panicButtonRepository.create({
      user,
      status: VcfPanicButtonStatus.TRIGGERED,
      triggeredAt: new Date(),
      ...data,
    });

    await this.panicButtonRepository.addTimelineEntry(
      panic.id,
      'Panic button triggered',
      user.id,
      `Severity: ${data.severity}, Type: ${data.type}`,
    );

    return panic;
  }

  async getPanicButton(panicId: string): Promise<VcfPanicButtonEntity> {
    const panic = await this.panicButtonRepository.findOne(panicId);
    if (!panic) {
      throw new NotFoundException('Panic button alert not found');
    }
    return panic;
  }

  async getActiveAlerts(): Promise<VcfPanicButtonEntity[]> {
    return this.panicButtonRepository.findActiveAlerts();
  }

  async getUserAlerts(userId: string): Promise<VcfPanicButtonEntity[]> {
    return this.panicButtonRepository.findUserAlerts(userId);
  }

  async acknowledgeAlert(panicId: string, expertId: string): Promise<VcfPanicButtonEntity> {
    const panic = await this.getPanicButton(panicId);

    if (panic.status !== VcfPanicButtonStatus.TRIGGERED) {
      throw new BadRequestException('Alert has already been acknowledged');
    }

    panic.status = VcfPanicButtonStatus.ACKNOWLEDGED;
    panic.acknowledgedAt = new Date();
    panic.responseTimeMinutes = Math.round(
      (panic.acknowledgedAt.getTime() - panic.triggeredAt.getTime()) / (1000 * 60)
    );

    await this.panicButtonRepository.update(panic);
    await this.panicButtonRepository.addTimelineEntry(
      panicId,
      'Alert acknowledged',
      expertId,
    );

    return panic;
  }

  async assignExpert(panicId: string, expert: User): Promise<VcfPanicButtonEntity> {
    const panic = await this.getPanicButton(panicId);

    if (panic.assignedExpert) {
      throw new BadRequestException('An expert is already assigned to this alert');
    }

    panic.assignedExpert = expert;
    panic.expertAssignedAt = new Date();
    panic.status = VcfPanicButtonStatus.IN_PROGRESS;
    panic.resolutionStartedAt = new Date();

    await this.panicButtonRepository.update(panic);
    await this.panicButtonRepository.addTimelineEntry(
      panicId,
      'Expert assigned',
      expert.id,
      `Expert: ${expert.name || expert.email}`,
    );

    return panic;
  }

  async updateStatus(
    panicId: string,
    expertId: string,
    status: VcfPanicButtonStatus,
    notes?: string,
  ): Promise<VcfPanicButtonEntity> {
    const panic = await this.getPanicButton(panicId);

    if (panic.assignedExpert?.id !== expertId) {
      throw new ForbiddenException('Only the assigned expert can update the status');
    }

    const previousStatus = panic.status;
    panic.status = status;

    if (status === VcfPanicButtonStatus.IN_PROGRESS && !panic.resolutionStartedAt) {
      panic.resolutionStartedAt = new Date();
    }

    await this.panicButtonRepository.update(panic);
    await this.panicButtonRepository.addTimelineEntry(
      panicId,
      `Status updated from ${previousStatus} to ${status}`,
      expertId,
      notes,
    );

    return panic;
  }

  async resolveAlert(
    panicId: string,
    expertId: string,
    data: {
      resolution: string;
      rootCause?: string;
      preventionSteps?: string[];
      postMortemUrl?: string;
    },
  ): Promise<VcfPanicButtonEntity> {
    const panic = await this.getPanicButton(panicId);

    if (panic.assignedExpert?.id !== expertId) {
      throw new ForbiddenException('Only the assigned expert can resolve the alert');
    }

    if (panic.status === VcfPanicButtonStatus.RESOLVED) {
      throw new BadRequestException('Alert is already resolved');
    }

    panic.status = VcfPanicButtonStatus.RESOLVED;
    panic.resolvedAt = new Date();
    panic.resolution = data.resolution;
    panic.rootCause = data.rootCause;
    panic.preventionSteps = data.preventionSteps || [];
    panic.postMortemUrl = data.postMortemUrl;

    panic.resolutionTimeMinutes = Math.round(
      (panic.resolvedAt.getTime() - panic.triggeredAt.getTime()) / (1000 * 60)
    );

    await this.panicButtonRepository.update(panic);
    await this.panicButtonRepository.addTimelineEntry(
      panicId,
      'Alert resolved',
      expertId,
      data.resolution,
    );

    return panic;
  }

  async markAsFalseAlarm(
    panicId: string,
    userId: string,
    reason: string,
  ): Promise<VcfPanicButtonEntity> {
    const panic = await this.getPanicButton(panicId);

    if (panic.user.id !== userId && panic.assignedExpert?.id !== userId) {
      throw new ForbiddenException('Only the alert owner or assigned expert can mark as false alarm');
    }

    panic.status = VcfPanicButtonStatus.FALSE_ALARM;
    panic.resolution = reason;
    panic.resolvedAt = new Date();

    await this.panicButtonRepository.update(panic);
    await this.panicButtonRepository.addTimelineEntry(
      panicId,
      'Marked as false alarm',
      userId,
      reason,
    );

    return panic;
  }

  async addFeedback(
    panicId: string,
    userId: string,
    rating: number,
    feedback?: string,
  ): Promise<VcfPanicButtonEntity> {
    const panic = await this.getPanicButton(panicId);

    if (panic.user.id !== userId) {
      throw new ForbiddenException('Only the alert owner can provide feedback');
    }

    if (panic.status !== VcfPanicButtonStatus.RESOLVED) {
      throw new BadRequestException('Can only provide feedback for resolved alerts');
    }

    if (rating < 1 || rating > 5) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }

    panic.satisfactionRating = rating;
    panic.feedback = feedback;

    await this.panicButtonRepository.update(panic);
    await this.panicButtonRepository.addTimelineEntry(
      panicId,
      'Feedback provided',
      userId,
      `Rating: ${rating}/5`,
    );

    return panic;
  }

  async getAlertsBySeverity(severity: VcfPanicButtonSeverity): Promise<VcfPanicButtonEntity[]> {
    return this.panicButtonRepository.findBySeverity(severity);
  }

  async getPanicButtonStats(startDate?: Date, endDate?: Date) {
    return this.panicButtonRepository.getStats(startDate, endDate);
  }
}