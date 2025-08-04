import { Injectable } from '@nestjs/common';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Workshop, WorkshopType } from '../../domain/entity/workshop.entity';

export interface WorkshopRepositoryInterface {
  findById(id: string): Promise<Workshop | null>;
  findAll(): Promise<Workshop[]>;
  findByInstructor(instructorId: string): Promise<Workshop[]>;
  findByType(type: string): Promise<Workshop[]>;
  findByCode(workshopCode: string): Promise<Workshop | null>;
  save(workshop: Workshop): Promise<void>;
  update(workshop: Workshop): Promise<void>;
  delete(id: string): Promise<void>;
}

@Injectable()
export class WorkshopRepository implements WorkshopRepositoryInterface {
  constructor(
    @InjectRepository(Workshop)
    private readonly repository: EntityRepository<Workshop>,
    private readonly em: EntityManager,
  ) {}

  async findById(id: string): Promise<Workshop | null> {
    return this.repository.findOne({ id }, { populate: ['instructor', 'enrollments', 'sessions'] });
  }

  async findAll(): Promise<Workshop[]> {
    return this.repository.findAll({ populate: ['instructor'] });
  }

  async findByInstructor(instructorId: string): Promise<Workshop[]> {
    return this.repository.find({ instructor: instructorId }, { populate: ['instructor'] });
  }

  async findByType(type: string): Promise<Workshop[]> {
    return this.repository.find({ type: type as WorkshopType }, { populate: ['instructor'] });
  }

  async findByCode(workshopCode: string): Promise<Workshop | null> {
    return this.repository.findOne({ workshopCode: workshopCode.toUpperCase() }, { populate: ['instructor', 'enrollments', 'sessions'] });
  }

  async save(workshop: Workshop): Promise<void> {
    this.em.persist(workshop);
    await this.em.flush();
  }

  async update(workshop: Workshop): Promise<void> {
    await this.em.flush();
  }

  async delete(id: string): Promise<void> {
    const workshop = await this.repository.findOne({ id });
    if (workshop) {
      this.em.remove(workshop);
      await this.em.flush();
    }
  }
}