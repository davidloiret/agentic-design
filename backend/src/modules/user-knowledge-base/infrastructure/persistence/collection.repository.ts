import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { Collection } from '../../domain/entity/collection.entity';
import { CollectionRepositoryInterface } from '../../domain/repository/collection-repository.interface';

@Injectable()
export class CollectionRepository implements CollectionRepositoryInterface {
  constructor(
    @InjectRepository(Collection)
    private readonly repository: EntityRepository<Collection>,
  ) {}

  async findById(id: string): Promise<Collection | null> {
    return this.repository.findOne({ id }, { populate: ['workspace'] });
  }

  async findByWorkspaceId(workspaceId: string): Promise<Collection[]> {
    return this.repository.find(
      { workspace: workspaceId },
      { populate: ['workspace'], orderBy: { order: 'ASC' } },
    );
  }

  async findRootCollections(workspaceId: string): Promise<Collection[]> {
    return this.repository.find(
      { workspace: workspaceId, parentId: null },
      { populate: ['workspace'], orderBy: { order: 'ASC' } },
    );
  }

  async findChildCollections(parentId: string): Promise<Collection[]> {
    return this.repository.find(
      { parentId },
      { populate: ['workspace'], orderBy: { order: 'ASC' } },
    );
  }

  async create(collection: Collection): Promise<Collection> {
    await this.repository.getEntityManager().persistAndFlush(collection);
    return collection;
  }

  async update(collection: Collection): Promise<Collection> {
    await this.repository.getEntityManager().persistAndFlush(collection);
    return collection;
  }

  async delete(id: string): Promise<void> {
    const collection = await this.repository.findOne({ id });
    if (collection) {
      await this.repository.getEntityManager().removeAndFlush(collection);
    }
  }

  async findByIdWithValidation(id: string, userId: string): Promise<Collection | null> {
    return this.repository.findOne(
      { id, workspace: { user: userId } },
      { populate: ['workspace'] },
    );
  }
}