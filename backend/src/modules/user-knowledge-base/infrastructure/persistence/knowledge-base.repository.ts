import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { KnowledgeBaseItem, KnowledgeBaseItemType } from '../../domain/entity/knowledge-base-item.entity';
import { KnowledgeBaseRepositoryInterface, BulkCreateResult } from '../../domain/repository/knowledge-base-repository.interface';

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

  async bulkCreateOrUpdate(items: KnowledgeBaseItem[], externalIds?: string[]): Promise<BulkCreateResult> {
    const result: BulkCreateResult = {
      created: [],
      updated: [],
      errors: []
    };

    const em = this.repository.getEntityManager();

    await em.transactional(async (trx) => {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const externalId = externalIds?.[i];

        try {
          // Check if item exists by external ID (for import scenarios) or by title+workspace combination
          let existingItem: KnowledgeBaseItem | null = null;
          
          if (externalId) {
            // For imports, try to find by external ID first
            existingItem = await trx.findOne(KnowledgeBaseItem, { id: externalId });
          }
          
          if (!existingItem) {
            // Check for duplicates by title + workspace + URL combination
            const duplicateQuery: any = {
              user: item.user.id,
              workspace: item.workspace.id,
              title: item.title
            };

            // If URL exists, add it to duplicate check
            if (item.url) {
              duplicateQuery.url = item.url;
            }

            existingItem = await trx.findOne(KnowledgeBaseItem, duplicateQuery);
          }

          if (existingItem) {
            // Update existing item
            existingItem.title = item.title;
            existingItem.updateContent(item.content);
            existingItem.url = item.url || existingItem.url;
            existingItem.filePath = item.filePath || existingItem.filePath;
            existingItem.metadata = { ...existingItem.metadata, ...item.metadata };
            existingItem.tags = item.tags || existingItem.tags;
            
            if (item.isFavorite !== undefined) {
              item.isFavorite ? existingItem.markAsFavorite() : existingItem.unmarkAsFavorite();
            }
            if (item.isRead !== undefined) {
              item.isRead ? existingItem.markAsRead() : existingItem.markAsUnread();
            }

            // Update collections
            if (item.collections && item.collections.count() > 0) {
              existingItem.collections.set(item.collections.getItems());
            }

            await trx.persistAndFlush(existingItem);
            result.updated.push(existingItem);
          } else {
            // Create new item
            // If external ID provided, use it, otherwise let DB generate new ID
            if (externalId) {
              (item as any).id = externalId;
            }
            
            await trx.persistAndFlush(item);
            result.created.push(item);
          }
        } catch (error) {
          result.errors.push({
            externalId,
            title: item.title,
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }
    });

    return result;
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

  async findByUserIdPaginated(userId: string, skip: number, limit: number): Promise<KnowledgeBaseItem[]> {
    return this.repository.find(
      { user: userId },
      { 
        populate: ['user', 'workspace', 'collections'], 
        orderBy: { updatedAt: 'DESC' },
        offset: skip,
        limit: limit
      },
    );
  }

  async countByUserId(userId: string): Promise<number> {
    return this.repository.count({ user: userId });
  }

  async findByWorkspacePaginated(workspaceId: string, skip: number, limit: number): Promise<KnowledgeBaseItem[]> {
    return this.repository.find(
      { workspace: workspaceId },
      { 
        populate: ['user', 'workspace', 'collections'], 
        orderBy: { updatedAt: 'DESC' },
        offset: skip,
        limit: limit
      },
    );
  }

  async countByWorkspace(workspaceId: string): Promise<number> {
    return this.repository.count({ workspace: workspaceId });
  }

  async update(item: KnowledgeBaseItem): Promise<KnowledgeBaseItem> {
    await this.repository.getEntityManager().persistAndFlush(item);
    return item;
  }

  async delete(id: string): Promise<void> {
    const em = this.repository.getEntityManager();
    
    await em.transactional(async (trx) => {
      const item = await trx.findOne(KnowledgeBaseItem, { id });
      if (item) {
        await trx.removeAndFlush(item);
      }
    });
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