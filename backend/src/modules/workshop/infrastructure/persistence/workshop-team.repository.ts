import { Injectable } from '@nestjs/common';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { WorkshopTeam } from '../../domain/entity/workshop-team.entity';

export interface WorkshopTeamRepositoryInterface {
  findById(id: string): Promise<WorkshopTeam | null>;
  findByWorkshop(workshopId: string): Promise<WorkshopTeam[]>;
  findByWorkshopAndName(workshopId: string, name: string): Promise<WorkshopTeam | null>;
  save(team: WorkshopTeam): Promise<void>;
  update(team: WorkshopTeam): Promise<void>;
  delete(id: string): Promise<void>;
}

@Injectable()
export class WorkshopTeamRepository implements WorkshopTeamRepositoryInterface {
  constructor(
    @InjectRepository(WorkshopTeam)
    private readonly repository: EntityRepository<WorkshopTeam>,
    private readonly em: EntityManager,
  ) {}

  async findById(id: string): Promise<WorkshopTeam | null> {
    return this.repository.findOne({ id }, { populate: ['workshop', 'members'] });
  }

  async findByWorkshop(workshopId: string): Promise<WorkshopTeam[]> {
    return this.repository.find(
      { workshop: workshopId },
      { populate: ['members'] }
    );
  }

  async findByWorkshopAndName(workshopId: string, name: string): Promise<WorkshopTeam | null> {
    return this.repository.findOne(
      { workshop: workshopId, name },
      { populate: ['members'] }
    );
  }

  async save(team: WorkshopTeam): Promise<void> {
    this.em.persist(team);
    await this.em.flush();
  }

  async update(team: WorkshopTeam): Promise<void> {
    await this.em.flush();
  }

  async delete(id: string): Promise<void> {
    const team = await this.repository.findOne({ id });
    if (team) {
      this.em.remove(team);
      await this.em.flush();
    }
  }
}