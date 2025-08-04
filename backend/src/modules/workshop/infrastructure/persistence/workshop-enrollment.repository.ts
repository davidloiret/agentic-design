import { Injectable } from '@nestjs/common';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { WorkshopEnrollment } from '../../domain/entity/workshop-enrollment.entity';

export interface WorkshopEnrollmentRepositoryInterface {
  findById(id: string): Promise<WorkshopEnrollment | null>;
  findByUser(userId: string): Promise<WorkshopEnrollment[]>;
  findByWorkshop(workshopId: string): Promise<WorkshopEnrollment[]>;
  findByUserAndWorkshop(userId: string, workshopId: string): Promise<WorkshopEnrollment | null>;
  save(enrollment: WorkshopEnrollment): Promise<void>;
  update(enrollment: WorkshopEnrollment): Promise<void>;
  delete(id: string): Promise<void>;
}

@Injectable()
export class WorkshopEnrollmentRepository implements WorkshopEnrollmentRepositoryInterface {
  constructor(
    @InjectRepository(WorkshopEnrollment)
    private readonly repository: EntityRepository<WorkshopEnrollment>,
    private readonly em: EntityManager,
  ) {}

  async findById(id: string): Promise<WorkshopEnrollment | null> {
    return this.repository.findOne({ id }, { populate: ['user', 'workshop', 'team'] });
  }

  async findByUser(userId: string): Promise<WorkshopEnrollment[]> {
    return this.repository.find({ user: userId }, { populate: ['workshop', 'team'] });
  }

  async findByWorkshop(workshopId: string): Promise<WorkshopEnrollment[]> {
    return this.repository.find({ workshop: workshopId }, { populate: ['user', 'team'] });
  }

  async findByUserAndWorkshop(userId: string, workshopId: string): Promise<WorkshopEnrollment | null> {
    return this.repository.findOne(
      { user: userId, workshop: workshopId },
      { populate: ['user', 'workshop', 'team'] }
    );
  }

  async save(enrollment: WorkshopEnrollment): Promise<void> {
    this.em.persist(enrollment);
    await this.em.flush();
  }

  async update(enrollment: WorkshopEnrollment): Promise<void> {
    await this.em.flush();
  }

  async delete(id: string): Promise<void> {
    const enrollment = await this.repository.findOne({ id });
    if (enrollment) {
      this.em.remove(enrollment);
      await this.em.flush();
    }
  }
}