import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { VcfOfficeHoursRepository } from '../infrastructure/vcf-office-hours.repository';
import { VcfOfficeHoursEntity, VcfOfficeHoursStatus, VcfOfficeHoursType } from '../domain/vcf-office-hours.entity';
import { VcfSubscriptionsService } from '../../vcf-subscriptions/application/vcf-subscriptions.service';
import { User } from '../../../user/domain/entity/user.entity';

@Injectable()
export class VcfOfficeHoursService {
  constructor(
    private readonly officeHoursRepository: VcfOfficeHoursRepository,
    private readonly subscriptionsService: VcfSubscriptionsService,
  ) {}

  async scheduleOfficeHours(
    host: User,
    data: {
      type: VcfOfficeHoursType;
      title: string;
      description: string;
      topics?: string[];
      scheduledAt: Date;
      durationMinutes?: number;
      maxAttendees?: number;
      meetingUrl?: string;
      isRecurring?: boolean;
      recurringPattern?: string;
      requiresSubscription?: boolean;
      allowedTiers?: string[];
    },
  ): Promise<VcfOfficeHoursEntity> {
    if (data.scheduledAt <= new Date()) {
      throw new BadRequestException('Cannot schedule office hours in the past');
    }

    const session = await this.officeHoursRepository.create({
      host,
      status: VcfOfficeHoursStatus.SCHEDULED,
      ...data,
    });

    return session;
  }

  async getOfficeHours(sessionId: string): Promise<VcfOfficeHoursEntity> {
    const session = await this.officeHoursRepository.findOne(sessionId);
    if (!session) {
      throw new NotFoundException('Office hours session not found');
    }
    return session;
  }

  async getUpcomingSessions(): Promise<VcfOfficeHoursEntity[]> {
    return this.officeHoursRepository.findUpcoming();
  }

  async getHostSessions(hostId: string): Promise<VcfOfficeHoursEntity[]> {
    return this.officeHoursRepository.findByHost(hostId);
  }

  async getUserSessions(userId: string): Promise<VcfOfficeHoursEntity[]> {
    return this.officeHoursRepository.findByAttendee(userId);
  }

  async joinSession(sessionId: string, user: User): Promise<VcfOfficeHoursEntity> {
    const session = await this.getOfficeHours(sessionId);

    if (session.status !== VcfOfficeHoursStatus.SCHEDULED) {
      throw new BadRequestException('Session is not available for joining');
    }

    if (session.attendeeIds.includes(user.id)) {
      throw new BadRequestException('You have already joined this session');
    }

    if (session.attendeeIds.length >= session.maxAttendees) {
      throw new BadRequestException('Session is full');
    }

    if (session.requiresSubscription) {
      const subscription = await this.subscriptionsService.getSubscriptionByUserId(user.id);
      if (!session.allowedTiers.includes(subscription.tier)) {
        throw new ForbiddenException('Your subscription tier does not have access to this session');
      }
    }

    const added = await this.officeHoursRepository.addAttendee(sessionId, user.id);
    if (!added) {
      throw new BadRequestException('Failed to join session');
    }

    return this.getOfficeHours(sessionId);
  }

  async leaveSession(sessionId: string, userId: string): Promise<void> {
    const session = await this.getOfficeHours(sessionId);

    if (session.status === VcfOfficeHoursStatus.IN_PROGRESS) {
      throw new BadRequestException('Cannot leave session that is in progress');
    }

    const removed = await this.officeHoursRepository.removeAttendee(sessionId, userId);
    if (!removed) {
      throw new BadRequestException('You are not registered for this session');
    }
  }

  async startSession(sessionId: string, hostId: string): Promise<VcfOfficeHoursEntity> {
    const session = await this.getOfficeHours(sessionId);

    if (session.host.id !== hostId) {
      throw new ForbiddenException('Only the host can start the session');
    }

    if (session.status !== VcfOfficeHoursStatus.SCHEDULED) {
      throw new BadRequestException('Session is not scheduled');
    }

    session.status = VcfOfficeHoursStatus.IN_PROGRESS;
    session.startedAt = new Date();

    await this.officeHoursRepository.update(session);
    return session;
  }

  async endSession(
    sessionId: string,
    hostId: string,
    notes?: string,
    recordingUrl?: string,
  ): Promise<VcfOfficeHoursEntity> {
    const session = await this.getOfficeHours(sessionId);

    if (session.host.id !== hostId) {
      throw new ForbiddenException('Only the host can end the session');
    }

    if (session.status !== VcfOfficeHoursStatus.IN_PROGRESS) {
      throw new BadRequestException('Session is not in progress');
    }

    session.status = VcfOfficeHoursStatus.COMPLETED;
    session.endedAt = new Date();
    if (notes) session.notes = notes;
    if (recordingUrl) session.recordingUrl = recordingUrl;

    await this.officeHoursRepository.update(session);
    return session;
  }

  async cancelSession(sessionId: string, hostId: string): Promise<VcfOfficeHoursEntity> {
    const session = await this.getOfficeHours(sessionId);

    if (session.host.id !== hostId) {
      throw new ForbiddenException('Only the host can cancel the session');
    }

    if (session.status !== VcfOfficeHoursStatus.SCHEDULED) {
      throw new BadRequestException('Can only cancel scheduled sessions');
    }

    session.status = VcfOfficeHoursStatus.CANCELLED;
    await this.officeHoursRepository.update(session);

    return session;
  }

  async addFeedback(
    sessionId: string,
    userId: string,
    rating: number,
    comment?: string,
  ): Promise<VcfOfficeHoursEntity> {
    const session = await this.getOfficeHours(sessionId);

    if (session.status !== VcfOfficeHoursStatus.COMPLETED) {
      throw new BadRequestException('Can only provide feedback for completed sessions');
    }

    if (!session.attendeeIds.includes(userId)) {
      throw new ForbiddenException('Only attendees can provide feedback');
    }

    if (rating < 1 || rating > 5) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }

    const existingFeedback = session.feedback.find(f => f.userId === userId);
    if (existingFeedback) {
      throw new BadRequestException('You have already provided feedback for this session');
    }

    session.feedback.push({
      userId,
      rating,
      comment,
      submittedAt: new Date(),
    });

    const totalRating = session.feedback.reduce((sum, f) => sum + f.rating, 0);
    session.averageRating = totalRating / session.feedback.length;

    await this.officeHoursRepository.update(session);
    return session;
  }

  async getAvailableSessions(userId: string): Promise<VcfOfficeHoursEntity[]> {
    try {
      const subscription = await this.subscriptionsService.getSubscriptionByUserId(userId);
      return this.officeHoursRepository.findAvailableSessions(userId, [subscription.tier]);
    } catch {
      return this.officeHoursRepository.findAvailableSessions(userId, []);
    }
  }
}