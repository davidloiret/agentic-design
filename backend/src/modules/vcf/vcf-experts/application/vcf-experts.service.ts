import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { VcfExpertsRepository } from '../infrastructure/vcf-experts.repository';
import { VcfExpertEntity, VcfExpertStatus, VcfExpertLevel } from '../domain/vcf-expert.entity';
import { User } from '../../../user/domain/entity/user.entity';

@Injectable()
export class VcfExpertsService {
  constructor(
    private readonly expertsRepository: VcfExpertsRepository,
  ) {}

  async applyAsExpert(
    user: User,
    data: {
      bio: string;
      expertise: string[];
      programmingLanguages: string[];
      frameworks: string[];
      yearsOfExperience: number;
      certifications?: string[];
      githubUrl?: string;
      linkedinUrl?: string;
      portfolioUrl?: string;
      hourlyRate?: number;
      availability?: VcfExpertEntity['availability'];
    },
  ): Promise<VcfExpertEntity> {
    const existingExpert = await this.expertsRepository.findByUserId(user.id);
    if (existingExpert) {
      throw new BadRequestException('You have already applied as an expert');
    }

    let level = VcfExpertLevel.JUNIOR;
    if (data.yearsOfExperience >= 10) {
      level = VcfExpertLevel.ARCHITECT;
    } else if (data.yearsOfExperience >= 7) {
      level = VcfExpertLevel.PRINCIPAL;
    } else if (data.yearsOfExperience >= 4) {
      level = VcfExpertLevel.SENIOR;
    }

    const expert = await this.expertsRepository.create({
      user,
      status: VcfExpertStatus.PENDING,
      level,
      ...data,
    });

    return expert;
  }

  async getExpertProfile(expertId: string): Promise<VcfExpertEntity> {
    const expert = await this.expertsRepository.findOne(expertId);
    if (!expert) {
      throw new NotFoundException('Expert not found');
    }
    return expert;
  }

  async getExpertByUserId(userId: string): Promise<VcfExpertEntity> {
    const expert = await this.expertsRepository.findByUserId(userId);
    if (!expert) {
      throw new NotFoundException('Expert profile not found');
    }
    return expert;
  }

  async updateExpertProfile(
    userId: string,
    updates: Partial<{
      bio: string;
      expertise: string[];
      programmingLanguages: string[];
      frameworks: string[];
      certifications: string[];
      githubUrl: string;
      linkedinUrl: string;
      portfolioUrl: string;
      hourlyRate: number;
      availability: VcfExpertEntity['availability'];
      preferredSessionTypes: string[];
      maxConcurrentSessions: number;
    }>,
  ): Promise<VcfExpertEntity> {
    const expert = await this.expertsRepository.findByUserId(userId);
    if (!expert) {
      throw new NotFoundException('Expert profile not found');
    }

    Object.assign(expert, updates);
    await this.expertsRepository.update(expert);

    return expert;
  }

  async toggleAvailability(userId: string): Promise<VcfExpertEntity> {
    const expert = await this.getExpertByUserId(userId);
    expert.isAvailable = !expert.isAvailable;
    await this.expertsRepository.update(expert);
    return expert;
  }

  async approveExpert(expertId: string): Promise<VcfExpertEntity> {
    const expert = await this.expertsRepository.findOne(expertId);
    if (!expert) {
      throw new NotFoundException('Expert not found');
    }

    if (expert.status !== VcfExpertStatus.PENDING) {
      throw new BadRequestException('Expert is not in pending status');
    }

    expert.status = VcfExpertStatus.ACTIVE;
    expert.verifiedAt = new Date();
    await this.expertsRepository.update(expert);

    return expert;
  }

  async suspendExpert(expertId: string, reason: string): Promise<VcfExpertEntity> {
    const expert = await this.expertsRepository.findOne(expertId);
    if (!expert) {
      throw new NotFoundException('Expert not found');
    }

    expert.status = VcfExpertStatus.SUSPENDED;
    expert.suspendedAt = new Date();
    expert.suspensionReason = reason;
    expert.isAvailable = false;
    await this.expertsRepository.update(expert);

    return expert;
  }

  async reactivateExpert(expertId: string): Promise<VcfExpertEntity> {
    const expert = await this.expertsRepository.findOne(expertId);
    if (!expert) {
      throw new NotFoundException('Expert not found');
    }

    if (expert.status !== VcfExpertStatus.SUSPENDED) {
      throw new BadRequestException('Expert is not suspended');
    }

    expert.status = VcfExpertStatus.ACTIVE;
    expert.suspendedAt = undefined;
    expert.suspensionReason = undefined;
    await this.expertsRepository.update(expert);

    return expert;
  }

  async findAvailableExperts(
    languages?: string[],
    frameworks?: string[],
  ): Promise<VcfExpertEntity[]> {
    return this.expertsRepository.findAvailableExperts(languages, frameworks);
  }

  async searchExperts(query: string): Promise<VcfExpertEntity[]> {
    return this.expertsRepository.searchExperts(query);
  }

  async getTopExperts(): Promise<VcfExpertEntity[]> {
    return this.expertsRepository.getTopExperts();
  }

  async updateExpertStats(
    expertId: string,
    sessionCompleted: boolean,
    responseTimeHours?: number,
    resolutionTimeHours?: number,
  ): Promise<void> {
    const expert = await this.expertsRepository.findOne(expertId);
    if (!expert) {
      return;
    }

    const stats = expert.stats;
    stats.totalSessions++;
    stats.lastActiveAt = new Date();

    if (sessionCompleted) {
      stats.resolvedSessions++;

      if (responseTimeHours) {
        const avgResponse = stats.averageResponseTimeHours;
        const totalResponses = stats.resolvedSessions - 1;
        stats.averageResponseTimeHours =
          (avgResponse * totalResponses + responseTimeHours) / stats.resolvedSessions;
      }

      if (resolutionTimeHours) {
        const avgResolution = stats.averageResolutionTimeHours;
        const totalResolutions = stats.resolvedSessions - 1;
        stats.averageResolutionTimeHours =
          (avgResolution * totalResolutions + resolutionTimeHours) / stats.resolvedSessions;
      }
    }

    await this.expertsRepository.updateStats(expertId, stats);
  }

  async addRating(expertId: string, rating: number): Promise<void> {
    await this.expertsRepository.updateRating(expertId, rating);
  }

  async canAcceptMoreSessions(userId: string): Promise<boolean> {
    const expert = await this.getExpertByUserId(userId);
    return expert.isAvailable &&
           expert.currentActiveSessions < expert.maxConcurrentSessions &&
           expert.status === VcfExpertStatus.ACTIVE;
  }

  async incrementActiveSessionCount(userId: string): Promise<void> {
    const expert = await this.getExpertByUserId(userId);
    await this.expertsRepository.incrementSessionCount(expert.id);
  }

  async decrementActiveSessionCount(userId: string): Promise<void> {
    const expert = await this.getExpertByUserId(userId);
    await this.expertsRepository.decrementActiveSessionCount(expert.id);
  }
}