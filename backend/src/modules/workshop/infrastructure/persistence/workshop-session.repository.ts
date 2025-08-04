import { Injectable } from '@nestjs/common';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { WorkshopSession, SessionStatus } from '../../domain/entity/workshop-session.entity';

export interface WorkshopSessionRepositoryInterface {
  findById(id: string): Promise<WorkshopSession | null>;
  findByCode(sessionCode: string): Promise<WorkshopSession | null>;
  findByWorkshop(workshopId: string): Promise<WorkshopSession[]>;
  findLiveSessions(): Promise<WorkshopSession[]>;
  save(session: WorkshopSession): Promise<void>;
  update(session: WorkshopSession): Promise<void>;
  delete(id: string): Promise<void>;
}

@Injectable()
export class WorkshopSessionRepository implements WorkshopSessionRepositoryInterface {
  constructor(
    @InjectRepository(WorkshopSession)
    private readonly repository: EntityRepository<WorkshopSession>,
    private readonly em: EntityManager,
  ) {}

  async findById(id: string): Promise<WorkshopSession | null> {
    return this.repository.findOne({ id }, { populate: ['workshop', 'leadInstructor'] });
  }

  async findByCode(sessionCode: string): Promise<WorkshopSession | null> {
    return this.repository.findOne(
      { sessionCode },
      { populate: ['workshop', 'workshop.instructor', 'leadInstructor'] }
    );
  }

  async findByWorkshop(workshopId: string): Promise<WorkshopSession[]> {
    return this.repository.find(
      { workshop: workshopId },
      { populate: ['workshop', 'leadInstructor'], orderBy: { sessionNumber: 'ASC' } }
    );
  }

  async findLiveSessions(): Promise<WorkshopSession[]> {
    return this.repository.find(
      { status: SessionStatus.LIVE },
      { populate: ['workshop', 'workshop.instructor', 'leadInstructor'] }
    );
  }

  async save(session: WorkshopSession): Promise<void> {
    this.em.persist(session);
    await this.em.flush();
  }

  async update(session: WorkshopSession): Promise<void> {
    await this.em.flush();
  }

  async delete(id: string): Promise<void> {
    const session = await this.repository.findOne({ id });
    if (session) {
      this.em.remove(session);
      await this.em.flush();
    }
  }
}