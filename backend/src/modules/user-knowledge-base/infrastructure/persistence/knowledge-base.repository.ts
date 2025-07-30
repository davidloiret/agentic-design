import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { KnowledgeBaseItem, KnowledgeBaseItemType } from '../../domain/entity/knowledge-base-item.entity';
import { KnowledgeBaseRepositoryInterface } from '../../domain/repository/knowledge-base-repository.interface';

@Injectable()
export class KnowledgeBaseRepository implements KnowledgeBaseRepositoryInterface {
  constructor(
    @InjectRepository(KnowledgeBaseItem)
    private readonly repository: EntityRepository<KnowledgeBaseItem>,
  ) {}

  async create(item: KnowledgeBaseItem): Promise<KnowledgeBaseItem> {
    await this.repository.getEntityManager().persistAndFlush(item);
    return item;
  }

  async findById(id: string): Promise<KnowledgeBaseItem | null> {
    return this.repository.findOne({ id }, { populate: ['user', 'workspace', 'collections'] });
  }

  async findByCollection(collectionId: string): Promise<KnowledgeBaseItem[]> {
    return this.repository.find(
      { collections: collectionId },
      { populate: ['user', 'workspace', 'collections'], orderBy: { updatedAt: 'DESC' } },
    );
  }

  async findByCollectionAndType(
    collectionId: string,
    type: KnowledgeBaseItemType,
  ): Promise<KnowledgeBaseItem[]> {
    return this.repository.find(
      { collections: collectionId, type },
      { populate: ['user', 'workspace', 'collections'], orderBy: { updatedAt: 'DESC' } },
    );
  }

  async findByCollectionAndTags(
    collectionId: string,
    tags: string[],
  ): Promise<KnowledgeBaseItem[]> {
    return this.repository.find(
      {
        collections: collectionId,
        tags: { $in: tags },
      },
      { populate: ['user', 'workspace', 'collections'], orderBy: { updatedAt: 'DESC' } },
    );
  }

  async findFavoritesByCollection(collectionId: string): Promise<KnowledgeBaseItem[]> {
    return this.repository.find(
      { collections: collectionId, isFavorite: true },
      { populate: ['user', 'workspace', 'collections'], orderBy: { updatedAt: 'DESC' } },
    );
  }

  async findUnreadByCollection(collectionId: string): Promise<KnowledgeBaseItem[]> {
    return this.repository.find(
      { collections: collectionId, isRead: false },
      { populate: ['user', 'workspace', 'collections'], orderBy: { updatedAt: 'DESC' } },
    );
  }

  async findReadByCollection(collectionId: string): Promise<KnowledgeBaseItem[]> {
    return this.repository.find(
      { collections: collectionId, isRead: true },
      { populate: ['user', 'workspace', 'collections'], orderBy: { readAt: 'DESC' } },
    );
  }

  async findByWorkspace(workspaceId: string): Promise<KnowledgeBaseItem[]> {
    return this.repository.find(
      { workspace: workspaceId },
      { populate: ['user', 'workspace', 'collections'], orderBy: { updatedAt: 'DESC' } },
    );
  }

  async findByWorkspaceAndType(
    workspaceId: string,
    type: KnowledgeBaseItemType,
  ): Promise<KnowledgeBaseItem[]> {
    return this.repository.find(
      { workspace: workspaceId, type },
      { populate: ['user', 'workspace', 'collections'], orderBy: { updatedAt: 'DESC' } },
    );
  }

  async findByWorkspaceAndTags(
    workspaceId: string,
    tags: string[],
  ): Promise<KnowledgeBaseItem[]> {
    return this.repository.find(
      {
        workspace: workspaceId,
        tags: { $in: tags },
      },
      { populate: ['user', 'workspace', 'collections'], orderBy: { updatedAt: 'DESC' } },
    );
  }

  async findFavoritesByWorkspace(workspaceId: string): Promise<KnowledgeBaseItem[]> {
    return this.repository.find(
      { workspace: workspaceId, isFavorite: true },
      { populate: ['user', 'workspace', 'collections'], orderBy: { updatedAt: 'DESC' } },
    );
  }

  async findUnreadByWorkspace(workspaceId: string): Promise<KnowledgeBaseItem[]> {
    return this.repository.find(
      { workspace: workspaceId, isRead: false },
      { populate: ['user', 'workspace', 'collections'], orderBy: { updatedAt: 'DESC' } },
    );
  }

  async findReadByWorkspace(workspaceId: string): Promise<KnowledgeBaseItem[]> {
    return this.repository.find(
      { workspace: workspaceId, isRead: true },
      { populate: ['user', 'workspace', 'collections'], orderBy: { readAt: 'DESC' } },
    );
  }

  async findWithUnreadChanges(userId: string): Promise<KnowledgeBaseItem[]> {
    return this.repository.find(
      { user: userId, hasUnreadChanges: true },
      { populate: ['user', 'workspace', 'collections'], orderBy: { lastChangedAt: 'DESC' } },
    );
  }

  async findWithUnreadChangesByWorkspace(workspaceId: string): Promise<KnowledgeBaseItem[]> {
    return this.repository.find(
      { workspace: workspaceId, hasUnreadChanges: true },
      { populate: ['user', 'workspace', 'collections'], orderBy: { lastChangedAt: 'DESC' } },
    );
  }

  async findWithUnreadChangesByCollection(collectionId: string): Promise<KnowledgeBaseItem[]> {
    return this.repository.find(
      { collections: collectionId, hasUnreadChanges: true },
      { populate: ['user', 'workspace', 'collections'], orderBy: { lastChangedAt: 'DESC' } },
    );
  }

  async findFollowedItems(userId: string): Promise<KnowledgeBaseItem[]> {
    return this.repository.find(
      { user: userId, shouldFollow: true },
      { populate: ['user', 'workspace', 'collections'], orderBy: { lastCheckedAt: 'ASC' } },
    );
  }

  async findFollowedItemsByWorkspace(workspaceId: string): Promise<KnowledgeBaseItem[]> {
    return this.repository.find(
      { workspace: workspaceId, shouldFollow: true },
      { populate: ['user', 'workspace', 'collections'], orderBy: { lastCheckedAt: 'ASC' } },
    );
  }

  async findItemsNeedingCheck(lastCheckThreshold: Date): Promise<KnowledgeBaseItem[]> {
    return this.repository.find(
      {
        shouldFollow: true,
        $or: [
          { lastCheckedAt: { $lt: lastCheckThreshold } },
          { lastCheckedAt: null },
        ],
      },
      { populate: ['user', 'workspace', 'collections'], orderBy: { lastCheckedAt: 'ASC' } },
    );
  }

  async findByUserId(userId: string): Promise<KnowledgeBaseItem[]> {
    return this.repository.find(
      { user: userId },
      { populate: ['user', 'workspace', 'collections'], orderBy: { updatedAt: 'DESC' } },
    );
  }

  async update(item: KnowledgeBaseItem): Promise<KnowledgeBaseItem> {
    await this.repository.getEntityManager().persistAndFlush(item);
    return item;
  }

  async delete(id: string): Promise<void> {
    const item = await this.repository.findOne({ id });
    if (item) {
      await this.repository.getEntityManager().removeAndFlush(item);
    }
  }

  async searchInCollection(
    collectionId: string,
    query: string,
    type?: KnowledgeBaseItemType,
  ): Promise<KnowledgeBaseItem[]> {
    const whereCondition: any = {
      collections: collectionId,
      $or: [
        { title: { $ilike: `%${query}%` } },
        { content: { $ilike: `%${query}%` } },
        { tags: { $in: [query] } },
      ],
    };

    if (type) {
      whereCondition.type = type;
    }

    return this.repository.find(whereCondition, {
      populate: ['user', 'workspace', 'collections'],
      orderBy: { updatedAt: 'DESC' },
    });
  }

  async searchInWorkspace(
    workspaceId: string,
    query: string,
    type?: KnowledgeBaseItemType,
  ): Promise<KnowledgeBaseItem[]> {
    const whereCondition: any = {
      workspace: workspaceId,
      $or: [
        { title: { $ilike: `%${query}%` } },
        { content: { $ilike: `%${query}%` } },
        { tags: { $in: [query] } },
      ],
    };

    if (type) {
      whereCondition.type = type;
    }

    return this.repository.find(whereCondition, {
      populate: ['user', 'workspace', 'collections'],
      orderBy: { updatedAt: 'DESC' },
    });
  }
}