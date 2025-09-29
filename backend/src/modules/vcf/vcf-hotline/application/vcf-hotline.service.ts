import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { VcfHotlineRepository } from '../infrastructure/vcf-hotline.repository';
import { VcfSubscriptionsService } from '../../vcf-subscriptions/application/vcf-subscriptions.service';
import { VcfHotlineSessionEntity, VcfSessionStatus, VcfSessionPriority } from '../domain/vcf-hotline-session.entity';
import { VcfHotlineMessageEntity, VcfMessageType } from '../domain/vcf-hotline-message.entity';
import { User } from '../../../user/domain/entity/user.entity';
import { VcfSubscriptionTier } from '../../vcf-subscriptions/domain/vcf-subscription.entity';

@Injectable()
export class VcfHotlineService {
  constructor(
    private readonly hotlineRepository: VcfHotlineRepository,
    private readonly subscriptionsService: VcfSubscriptionsService,
  ) {}

  async createSession(
    user: User,
    data: {
      title: string;
      description: string;
      programmingLanguage?: string;
      framework?: string;
      errorMessage?: string;
      codeSnippet?: string;
      tags?: string[];
    },
  ): Promise<VcfHotlineSessionEntity> {
    const canCreate = await this.subscriptionsService.checkUsageLimits(user.id);
    if (!canCreate) {
      throw new ForbiddenException('Usage limit reached for your subscription');
    }

    const subscription = await this.subscriptionsService.getSubscriptionByUserId(user.id);

    let priority = VcfSessionPriority.NORMAL;
    if (subscription.tier === VcfSubscriptionTier.VIP ||
        subscription.tier === VcfSubscriptionTier.ENTERPRISE) {
      priority = VcfSessionPriority.HIGH;
    } else if (subscription.tier === VcfSubscriptionTier.SCALEUP) {
      priority = VcfSessionPriority.HIGH;
    } else if (subscription.tier === VcfSubscriptionTier.STARTUP) {
      priority = VcfSessionPriority.NORMAL;
    }

    const session = await this.hotlineRepository.createSession({
      user,
      status: VcfSessionStatus.WAITING,
      priority,
      ...data,
    });

    await this.subscriptionsService.recordUsage(user.id, 'codeFix');

    await this.createSystemMessage(
      session,
      `New hotline session created. Priority: ${priority}. Expected response time: ${subscription.features.responseTimeHours} hours.`
    );

    return session;
  }

  async getSession(sessionId: string, userId: string): Promise<VcfHotlineSessionEntity> {
    const session = await this.hotlineRepository.findSessionById(sessionId);
    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (session.user.id !== userId && session.expert?.id !== userId) {
      throw new ForbiddenException('Access denied to this session');
    }

    return session;
  }

  async getUserSessions(userId: string): Promise<VcfHotlineSessionEntity[]> {
    return this.hotlineRepository.findUserSessions(userId);
  }

  async getWaitingSessions(): Promise<VcfHotlineSessionEntity[]> {
    return this.hotlineRepository.findWaitingSessions();
  }

  async assignExpert(sessionId: string, expert: User): Promise<VcfHotlineSessionEntity> {
    const session = await this.hotlineRepository.findSessionById(sessionId);
    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (session.status !== VcfSessionStatus.WAITING) {
      throw new BadRequestException('Session is not in waiting status');
    }

    session.expert = expert;
    session.status = VcfSessionStatus.IN_PROGRESS;
    session.startedAt = new Date();

    const waitTime = (session.startedAt.getTime() - session.createdAt.getTime()) / (1000 * 60);
    session.responseTimeMinutes = Math.round(waitTime);

    await this.hotlineRepository.updateSession(session);

    await this.createSystemMessage(
      session,
      `Expert ${expert.name || expert.email} has joined the session.`
    );

    return session;
  }

  async sendMessage(
    sessionId: string,
    senderId: string,
    content: string,
    type: VcfMessageType = VcfMessageType.USER_MESSAGE,
    codeSnippet?: string,
    programmingLanguage?: string,
  ): Promise<VcfHotlineMessageEntity> {
    const session = await this.getSession(sessionId, senderId);

    const sender = session.user.id === senderId ? session.user : session.expert;
    if (!sender) {
      throw new ForbiddenException('You are not part of this session');
    }

    const message = await this.hotlineRepository.createMessage({
      session,
      sender,
      type,
      content,
      codeSnippet,
      programmingLanguage,
    });

    return message;
  }

  async getSessionMessages(sessionId: string, userId: string): Promise<VcfHotlineMessageEntity[]> {
    await this.getSession(sessionId, userId);
    return this.hotlineRepository.findSessionMessages(sessionId);
  }

  async markSessionResolved(
    sessionId: string,
    expertId: string,
    resolution: string,
  ): Promise<VcfHotlineSessionEntity> {
    const session = await this.hotlineRepository.findSessionById(sessionId);
    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (session.expert?.id !== expertId) {
      throw new ForbiddenException('Only the assigned expert can resolve the session');
    }

    session.status = VcfSessionStatus.RESOLVED;
    session.resolution = resolution;
    session.resolvedAt = new Date();

    const totalTime = (session.resolvedAt.getTime() - session.createdAt.getTime()) / (1000 * 60);
    session.resolutionTimeMinutes = Math.round(totalTime);

    await this.hotlineRepository.updateSession(session);

    await this.createSystemMessage(
      session,
      'Session has been marked as resolved by the expert.'
    );

    return session;
  }

  async closeSession(sessionId: string, userId: string): Promise<VcfHotlineSessionEntity> {
    const session = await this.hotlineRepository.findSessionById(sessionId);
    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (session.user.id !== userId) {
      throw new ForbiddenException('Only the session owner can close it');
    }

    session.status = VcfSessionStatus.CLOSED;
    await this.hotlineRepository.updateSession(session);

    await this.createSystemMessage(session, 'Session closed by user.');

    return session;
  }

  async rateSatisfaction(
    sessionId: string,
    userId: string,
    rating: number,
    feedback?: string,
  ): Promise<VcfHotlineSessionEntity> {
    const session = await this.hotlineRepository.findSessionById(sessionId);
    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (session.user.id !== userId) {
      throw new ForbiddenException('Only the session owner can rate it');
    }

    if (session.status !== VcfSessionStatus.RESOLVED && session.status !== VcfSessionStatus.CLOSED) {
      throw new BadRequestException('Can only rate resolved or closed sessions');
    }

    if (rating < 1 || rating > 5) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }

    session.satisfactionRating = rating;
    session.feedback = feedback;
    await this.hotlineRepository.updateSession(session);

    return session;
  }

  private async createSystemMessage(
    session: VcfHotlineSessionEntity,
    content: string,
  ): Promise<void> {
    await this.hotlineRepository.createMessage({
      session,
      sender: session.user,
      type: VcfMessageType.SYSTEM_MESSAGE,
      content,
    });
  }

  async getHotlineStats(startDate?: Date, endDate?: Date) {
    return this.hotlineRepository.getSessionStats(startDate, endDate);
  }
}