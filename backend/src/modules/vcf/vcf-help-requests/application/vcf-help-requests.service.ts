import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { VcfHelpRequestsRepository } from '../infrastructure/vcf-help-requests.repository';
import { VcfHelpRequestEntity, VcfHelpRequestStatus, VcfHelpRequestType, VcfHelpRequestPriority } from '../domain/vcf-help-request.entity';
import { User } from '../../../user/domain/entity/user.entity';
import { VcfSubscriptionsService } from '../../vcf-subscriptions/application/vcf-subscriptions.service';

@Injectable()
export class VcfHelpRequestsService {
  constructor(
    private readonly helpRequestsRepository: VcfHelpRequestsRepository,
    private readonly subscriptionsService: VcfSubscriptionsService,
  ) {}

  async createHelpRequest(
    user: User,
    data: {
      type: VcfHelpRequestType;
      title: string;
      description: string;
      priority?: VcfHelpRequestPriority;
      tags?: string[];
      programmingLanguage?: string;
      framework?: string;
      currentCode?: string;
      expectedBehavior?: string;
      actualBehavior?: string;
      errorMessage?: string;
      stepsToReproduce?: string[];
      estimatedTimeHours?: number;
      bountyAmount?: number;
      isPublic?: boolean;
      expiresAt?: Date;
    },
  ): Promise<VcfHelpRequestEntity> {
    const canCreate = await this.subscriptionsService.checkUsageLimits(user.id);
    if (!canCreate) {
      throw new ForbiddenException('Usage limit reached for your subscription');
    }

    const subscription = await this.subscriptionsService.getSubscriptionByUserId(user.id);

    let priority = data.priority || VcfHelpRequestPriority.NORMAL;
    if (subscription.tier === 'vip' || subscription.tier === 'enterprise') {
      if (!data.priority || data.priority === VcfHelpRequestPriority.NORMAL) {
        priority = VcfHelpRequestPriority.HIGH;
      }
    }

    const request = await this.helpRequestsRepository.create({
      user,
      status: VcfHelpRequestStatus.OPEN,
      priority,
      ...data,
    });

    await this.subscriptionsService.recordUsage(user.id, 'question');

    return request;
  }

  async getHelpRequest(requestId: string): Promise<VcfHelpRequestEntity> {
    const request = await this.helpRequestsRepository.findOne(requestId);
    if (!request) {
      throw new NotFoundException('Help request not found');
    }

    await this.helpRequestsRepository.incrementViewCount(requestId);

    return request;
  }

  async getUserHelpRequests(userId: string): Promise<VcfHelpRequestEntity[]> {
    return this.helpRequestsRepository.findUserRequests(userId);
  }

  async getOpenHelpRequests(
    filters?: {
      type?: VcfHelpRequestType;
      priority?: VcfHelpRequestPriority;
      programmingLanguage?: string;
      framework?: string;
      tags?: string[];
    }
  ): Promise<VcfHelpRequestEntity[]> {
    return this.helpRequestsRepository.findOpenRequests(filters);
  }

  async claimHelpRequest(
    requestId: string,
    expert: User,
  ): Promise<VcfHelpRequestEntity> {
    const request = await this.helpRequestsRepository.findOne(requestId);
    if (!request) {
      throw new NotFoundException('Help request not found');
    }

    if (request.status !== VcfHelpRequestStatus.OPEN) {
      throw new BadRequestException('Request is not open for claiming');
    }

    if (request.metadata.declinedExperts.includes(expert.id)) {
      throw new ForbiddenException('You have already declined this request');
    }

    request.assignedExpert = expert;
    request.status = VcfHelpRequestStatus.CLAIMED;
    request.claimedAt = new Date();

    await this.helpRequestsRepository.update(request);

    return request;
  }

  async startWork(requestId: string, expertId: string): Promise<VcfHelpRequestEntity> {
    const request = await this.helpRequestsRepository.findOne(requestId);
    if (!request) {
      throw new NotFoundException('Help request not found');
    }

    if (request.assignedExpert?.id !== expertId) {
      throw new ForbiddenException('You are not assigned to this request');
    }

    if (request.status !== VcfHelpRequestStatus.CLAIMED) {
      throw new BadRequestException('Request must be claimed before starting work');
    }

    request.status = VcfHelpRequestStatus.IN_PROGRESS;
    request.startedAt = new Date();

    await this.helpRequestsRepository.update(request);

    return request;
  }

  async submitSolution(
    requestId: string,
    expertId: string,
    data: {
      solution: string;
      solutionCode?: string;
      solutionSteps?: string[];
      actualTimeHours?: number;
    },
  ): Promise<VcfHelpRequestEntity> {
    const request = await this.helpRequestsRepository.findOne(requestId);
    if (!request) {
      throw new NotFoundException('Help request not found');
    }

    if (request.assignedExpert?.id !== expertId) {
      throw new ForbiddenException('You are not assigned to this request');
    }

    if (request.status !== VcfHelpRequestStatus.IN_PROGRESS) {
      throw new BadRequestException('Request must be in progress to submit solution');
    }

    request.solution = data.solution;
    request.solutionCode = data.solutionCode;
    request.solutionSteps = data.solutionSteps || [];
    request.actualTimeHours = data.actualTimeHours;
    request.status = VcfHelpRequestStatus.COMPLETED;
    request.completedAt = new Date();

    await this.helpRequestsRepository.update(request);

    return request;
  }

  async acceptSolution(
    requestId: string,
    userId: string,
    rating?: number,
    feedback?: string,
  ): Promise<VcfHelpRequestEntity> {
    const request = await this.helpRequestsRepository.findOne(requestId);
    if (!request) {
      throw new NotFoundException('Help request not found');
    }

    if (request.user.id !== userId) {
      throw new ForbiddenException('Only the request owner can accept solutions');
    }

    if (request.status !== VcfHelpRequestStatus.COMPLETED) {
      throw new BadRequestException('No solution to accept');
    }

    request.solutionAccepted = true;
    request.solutionAcceptedAt = new Date();

    if (rating) {
      if (rating < 1 || rating > 5) {
        throw new BadRequestException('Rating must be between 1 and 5');
      }
      request.satisfactionRating = rating;
    }

    if (feedback) {
      request.feedback = feedback;
    }

    await this.helpRequestsRepository.update(request);

    return request;
  }

  async rejectSolution(
    requestId: string,
    userId: string,
    reason: string,
  ): Promise<VcfHelpRequestEntity> {
    const request = await this.helpRequestsRepository.findOne(requestId);
    if (!request) {
      throw new NotFoundException('Help request not found');
    }

    if (request.user.id !== userId) {
      throw new ForbiddenException('Only the request owner can reject solutions');
    }

    if (request.status !== VcfHelpRequestStatus.COMPLETED) {
      throw new BadRequestException('No solution to reject');
    }

    request.status = VcfHelpRequestStatus.IN_PROGRESS;
    request.metadata.previousAttempts++;
    request.feedback = reason;

    await this.helpRequestsRepository.update(request);

    return request;
  }

  async cancelRequest(requestId: string, userId: string): Promise<VcfHelpRequestEntity> {
    const request = await this.helpRequestsRepository.findOne(requestId);
    if (!request) {
      throw new NotFoundException('Help request not found');
    }

    if (request.user.id !== userId) {
      throw new ForbiddenException('Only the request owner can cancel it');
    }

    if (request.status === VcfHelpRequestStatus.COMPLETED) {
      throw new BadRequestException('Cannot cancel completed requests');
    }

    request.status = VcfHelpRequestStatus.CANCELLED;
    await this.helpRequestsRepository.update(request);

    return request;
  }

  async declineRequest(requestId: string, expertId: string): Promise<void> {
    const request = await this.helpRequestsRepository.findOne(requestId);
    if (!request) {
      throw new NotFoundException('Help request not found');
    }

    await this.helpRequestsRepository.addDeclinedExpert(requestId, expertId);
  }

  async expressInterest(requestId: string, expertId: string): Promise<void> {
    const request = await this.helpRequestsRepository.findOne(requestId);
    if (!request) {
      throw new NotFoundException('Help request not found');
    }

    await this.helpRequestsRepository.addInterestedExpert(requestId, expertId);
  }

  async searchHelpRequests(query: string): Promise<VcfHelpRequestEntity[]> {
    return this.helpRequestsRepository.searchRequests(query);
  }

  async getHelpRequestStats(startDate?: Date, endDate?: Date) {
    return this.helpRequestsRepository.getRequestStats(startDate, endDate);
  }

  async checkExpiredRequests(): Promise<void> {
    const expired = await this.helpRequestsRepository.findExpiredRequests();

    for (const request of expired) {
      request.status = VcfHelpRequestStatus.EXPIRED;
      await this.helpRequestsRepository.update(request);
    }
  }
}