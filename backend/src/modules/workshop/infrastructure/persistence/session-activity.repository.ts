import { Injectable } from '@nestjs/common';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { SessionActivity, ActivityStatus } from '../../domain/entity/session-activity.entity';

export interface SessionActivityRepositoryInterface {
  findById(id: string): Promise<SessionActivity | null>;
  findBySession(sessionId: string): Promise<SessionActivity[]>;
  findActiveActivities(): Promise<SessionActivity[]>;
  save(activity: SessionActivity): Promise<void>;
  update(activity: SessionActivity): Promise<void>;
  delete(id: string): Promise<void>;
}

@Injectable()
export class SessionActivityRepository implements SessionActivityRepositoryInterface {
  constructor(
    @InjectRepository(SessionActivity)
    private readonly repository: EntityRepository<SessionActivity>,
    private readonly em: EntityManager,
  ) {}

  async findById(id: string): Promise<SessionActivity | null> {
    return this.repository.findOne({ id }, { populate: ['session', 'session.workshop'] });
  }

  async findBySession(sessionId: string): Promise<SessionActivity[]> {
    return this.repository.find(
      { session: sessionId },
      { populate: ['session'], orderBy: { scheduledStartTime: 'ASC' } }
    );
  }

  async findActiveActivities(): Promise<SessionActivity[]> {
    return this.repository.find(
      { status: ActivityStatus.ACTIVE },
      { populate: ['session', 'session.workshop'] }
    );
  }

  async save(activity: SessionActivity): Promise<void> {
    this.em.persist(activity);
    await this.em.flush();
  }

  async update(activity: SessionActivity): Promise<void> {
    await this.em.flush();
  }

  async delete(id: string): Promise<void> {
    const activity = await this.repository.findOne({ id });
    if (activity) {
      this.em.remove(activity);
      await this.em.flush();
    }
  }
}