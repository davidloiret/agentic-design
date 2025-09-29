import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { VcfHotlineSessionEntity, VcfSessionStatus } from '../domain/vcf-hotline-session.entity';
import { VcfHotlineMessageEntity } from '../domain/vcf-hotline-message.entity';

@Injectable()
export class VcfHotlineRepository {
  constructor(
    @InjectRepository(VcfHotlineSessionEntity)
    private readonly sessionRepository: EntityRepository<VcfHotlineSessionEntity>,
    @InjectRepository(VcfHotlineMessageEntity)
    private readonly messageRepository: EntityRepository<VcfHotlineMessageEntity>,
    private readonly em: EntityManager,
  ) {}

  async createSession(data: Partial<VcfHotlineSessionEntity>): Promise<VcfHotlineSessionEntity> {
    const session = this.sessionRepository.create(data);
    await this.em.persistAndFlush(session);
    return session;
  }

  async findSessionById(id: string): Promise<VcfHotlineSessionEntity | null> {
    return this.sessionRepository.findOne(
      { id },
      { populate: ['user', 'expert', 'messages'] }
    );
  }

  async findUserSessions(userId: string): Promise<VcfHotlineSessionEntity[]> {
    return this.sessionRepository.find(
      { user: { id: userId } },
      { populate: ['expert'], orderBy: { createdAt: 'DESC' } }
    );
  }

  async findWaitingSessions(): Promise<VcfHotlineSessionEntity[]> {
    return this.sessionRepository.find(
      { status: VcfSessionStatus.WAITING },
      { populate: ['user'], orderBy: { priority: 'DESC', createdAt: 'ASC' } }
    );
  }

  async findExpertSessions(expertId: string): Promise<VcfHotlineSessionEntity[]> {
    return this.sessionRepository.find(
      { expert: { id: expertId } },
      { populate: ['user'], orderBy: { createdAt: 'DESC' } }
    );
  }

  async updateSession(session: VcfHotlineSessionEntity): Promise<void> {
    await this.em.persistAndFlush(session);
  }

  async createMessage(data: Partial<VcfHotlineMessageEntity>): Promise<VcfHotlineMessageEntity> {
    const message = this.messageRepository.create(data);
    await this.em.persistAndFlush(message);
    return message;
  }

  async findSessionMessages(sessionId: string): Promise<VcfHotlineMessageEntity[]> {
    return this.messageRepository.find(
      { session: { id: sessionId } },
      { populate: ['sender'], orderBy: { createdAt: 'ASC' } }
    );
  }

  async markMessageAsRead(messageId: string): Promise<void> {
    const message = await this.messageRepository.findOne({ id: messageId });
    if (message && !message.readAt) {
      message.readAt = new Date();
      await this.em.persistAndFlush(message);
    }
  }

  async getSessionStats(startDate?: Date, endDate?: Date): Promise<{
    totalSessions: number;
    resolvedSessions: number;
    averageResponseTime: number;
    averageResolutionTime: number;
    satisfactionAverage: number;
  }> {
    const query: any = {};
    if (startDate && endDate) {
      query.createdAt = { $gte: startDate, $lte: endDate };
    }

    const sessions = await this.sessionRepository.find(query);

    const resolved = sessions.filter(s => s.status === VcfSessionStatus.RESOLVED);
    const withRating = resolved.filter(s => s.satisfactionRating);

    return {
      totalSessions: sessions.length,
      resolvedSessions: resolved.length,
      averageResponseTime: resolved.length > 0
        ? resolved.reduce((sum, s) => sum + (s.responseTimeMinutes || 0), 0) / resolved.length
        : 0,
      averageResolutionTime: resolved.length > 0
        ? resolved.reduce((sum, s) => sum + (s.resolutionTimeMinutes || 0), 0) / resolved.length
        : 0,
      satisfactionAverage: withRating.length > 0
        ? withRating.reduce((sum, s) => sum + (s.satisfactionRating || 0), 0) / withRating.length
        : 0,
    };
  }
}