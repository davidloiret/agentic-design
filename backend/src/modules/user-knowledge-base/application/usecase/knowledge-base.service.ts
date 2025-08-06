import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { KnowledgeBaseItem, KnowledgeBaseItemType } from '../../domain/entity/knowledge-base-item.entity';
import { KnowledgeBaseRepository } from '../../infrastructure/persistence/knowledge-base.repository';
import { CreateKnowledgeBaseItemDto } from '../dto/create-knowledge-base-item.dto';
import { UpdateKnowledgeBaseItemDto } from '../dto/update-knowledge-base-item.dto';
import { KnowledgeBaseSearchDto } from '../dto/knowledge-base-search.dto';
import { PaginationDto, PaginatedResponse } from '../dto/pagination.dto';
import { User } from '../../../user/domain/entity/user.entity';
import { WorkspaceRepository } from '../../infrastructure/persistence/workspace.repository';
import { CollectionRepository } from '../../infrastructure/persistence/collection.repository';

@Injectable()
export class KnowledgeBaseService {
  constructor(
    private readonly knowledgeBaseRepository: KnowledgeBaseRepository,
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly collectionRepository: CollectionRepository,
  ) {}

  async create(
    user: User,
    createDto: CreateKnowledgeBaseItemDto,
  ): Promise<KnowledgeBaseItem> {
    // Validate workspace and collections
    const { workspace, collections } = await this.validateWorkspaceAndCollections(
      createDto.workspaceId,
      createDto.collectionIds,
      user.id,
    );

    const item = new KnowledgeBaseItem(
      user,
      workspace,
      collections,
      createDto.type,
      createDto.title,
      createDto.content,
      createDto.url,
      createDto.filePath,
      createDto.rawContent,
      createDto.markdownContent,
      createDto.metadata,
      createDto.tags,
      createDto.shouldFollow,
    );

    return this.knowledgeBaseRepository.create(item);
  }

  async findByUserId(userId: string, paginationDto?: PaginationDto): Promise<PaginatedResponse<KnowledgeBaseItem> | KnowledgeBaseItem[]> {
    if (paginationDto && (paginationDto.page || paginationDto.pageSize)) {
      const page = paginationDto.page || 1;
      const pageSize = Math.min(paginationDto.pageSize || 20, 100); // Cap at 100 items per page
      const skip = (page - 1) * pageSize;
      
      const [items, total] = await Promise.all([
        this.knowledgeBaseRepository.findByUserIdPaginated(userId, skip, pageSize),
        this.knowledgeBaseRepository.countByUserId(userId)
      ]);
      
      return {
        data: items,
        pagination: {
          page,
          pageSize,
          total,
          totalPages: Math.ceil(total / pageSize)
        }
      };
    }
    
    return this.knowledgeBaseRepository.findByUserId(userId);
  }

  async findByCollection(
    collectionId: string,
    userId: string,
  ): Promise<KnowledgeBaseItem[]> {
    await this.validateCollectionAccess(collectionId, userId);
    return this.knowledgeBaseRepository.findByCollection(collectionId);
  }

  async findByCollectionAndType(
    collectionId: string,
    userId: string,
    type: KnowledgeBaseItemType,
  ): Promise<KnowledgeBaseItem[]> {
    await this.validateCollectionAccess(collectionId, userId);
    return this.knowledgeBaseRepository.findByCollectionAndType(collectionId, type);
  }

  async findByWorkspace(
    workspaceId: string,
    userId: string,
    paginationDto?: PaginationDto,
  ): Promise<PaginatedResponse<KnowledgeBaseItem> | KnowledgeBaseItem[]> {
    await this.validateWorkspaceAccess(workspaceId, userId);
    
    if (paginationDto && (paginationDto.page || paginationDto.pageSize)) {
      const page = paginationDto.page || 1;
      const pageSize = Math.min(paginationDto.pageSize || 20, 100); // Cap at 100 items per page
      const skip = (page - 1) * pageSize;
      
      const [items, total] = await Promise.all([
        this.knowledgeBaseRepository.findByWorkspacePaginated(workspaceId, skip, pageSize),
        this.knowledgeBaseRepository.countByWorkspace(workspaceId)
      ]);
      
      return {
        data: items,
        pagination: {
          page,
          pageSize,
          total,
          totalPages: Math.ceil(total / pageSize)
        }
      };
    }
    
    return this.knowledgeBaseRepository.findByWorkspace(workspaceId);
  }

  async findByWorkspaceAndType(
    workspaceId: string,
    userId: string,
    type: KnowledgeBaseItemType,
  ): Promise<KnowledgeBaseItem[]> {
    await this.validateWorkspaceAccess(workspaceId, userId);
    return this.knowledgeBaseRepository.findByWorkspaceAndType(workspaceId, type);
  }

  async findById(id: string, userId: string): Promise<KnowledgeBaseItem> {
    const item = await this.knowledgeBaseRepository.findById(id);
    
    if (!item) {
      throw new NotFoundException('Knowledge base item not found');
    }

    if (item.user.id !== userId) {
      throw new ForbiddenException('Access denied to this knowledge base item');
    }

    item.updateLastAccessed();
    await this.knowledgeBaseRepository.update(item);

    return item;
  }

  async update(
    id: string,
    userId: string,
    updateDto: UpdateKnowledgeBaseItemDto,
  ): Promise<KnowledgeBaseItem> {
    const item = await this.knowledgeBaseRepository.findById(id);
    
    if (!item) {
      throw new NotFoundException('Knowledge base item not found');
    }

    if (item.user.id !== userId) {
      throw new ForbiddenException('Access denied to this knowledge base item');
    }

    if (updateDto.title) item.title = updateDto.title;
    if (updateDto.content) item.updateContent(updateDto.content);
    if (updateDto.url) item.url = updateDto.url;
    if (updateDto.filePath) item.filePath = updateDto.filePath;
    if (updateDto.metadata) item.metadata = updateDto.metadata;
    if (updateDto.tags) item.tags = updateDto.tags;
    if (updateDto.isFavorite !== undefined) {
      updateDto.isFavorite ? item.markAsFavorite() : item.unmarkAsFavorite();
    }
    if (updateDto.isRead !== undefined) {
      updateDto.isRead ? item.markAsRead() : item.markAsUnread();
    }

    // Handle collection updates
    if (updateDto.collectionIds !== undefined) {
      // Validate collections belong to the item's workspace and user has access
      const { collections } = await this.validateWorkspaceAndCollections(
        item.workspace.id,
        updateDto.collectionIds,
        userId,
      );
      item.collections.set(collections);
    }

    return this.knowledgeBaseRepository.update(item);
  }

  async delete(id: string, userId: string): Promise<void> {
    const item = await this.knowledgeBaseRepository.findById(id);
    
    if (!item) {
      throw new NotFoundException('Knowledge base item not found');
    }

    if (item.user.id !== userId) {
      throw new ForbiddenException('Access denied to this knowledge base item');
    }

    await this.knowledgeBaseRepository.delete(id);
    
    // Verify the item was actually deleted
    const deletedItem = await this.knowledgeBaseRepository.findById(id);
    if (deletedItem) {
      throw new Error('Failed to delete knowledge base item');
    }
  }

  async searchInCollection(
    collectionId: string,
    userId: string,
    searchDto: KnowledgeBaseSearchDto,
  ): Promise<KnowledgeBaseItem[]> {
    await this.validateCollectionAccess(collectionId, userId);
    return this.knowledgeBaseRepository.searchInCollection(
      collectionId,
      searchDto.query,
      searchDto.type,
    );
  }

  async searchInWorkspace(
    workspaceId: string,
    userId: string,
    searchDto: KnowledgeBaseSearchDto,
  ): Promise<KnowledgeBaseItem[]> {
    await this.validateWorkspaceAccess(workspaceId, userId);
    return this.knowledgeBaseRepository.searchInWorkspace(
      workspaceId,
      searchDto.query,
      searchDto.type,
    );
  }

  async findFavoritesByCollection(
    collectionId: string,
    userId: string,
  ): Promise<KnowledgeBaseItem[]> {
    await this.validateCollectionAccess(collectionId, userId);
    return this.knowledgeBaseRepository.findFavoritesByCollection(collectionId);
  }

  async findUnreadByCollection(
    collectionId: string,
    userId: string,
  ): Promise<KnowledgeBaseItem[]> {
    await this.validateCollectionAccess(collectionId, userId);
    return this.knowledgeBaseRepository.findUnreadByCollection(collectionId);
  }

  async findReadByCollection(
    collectionId: string,
    userId: string,
  ): Promise<KnowledgeBaseItem[]> {
    await this.validateCollectionAccess(collectionId, userId);
    return this.knowledgeBaseRepository.findReadByCollection(collectionId);
  }

  async findFavoritesByWorkspace(
    workspaceId: string,
    userId: string,
  ): Promise<KnowledgeBaseItem[]> {
    await this.validateWorkspaceAccess(workspaceId, userId);
    return this.knowledgeBaseRepository.findFavoritesByWorkspace(workspaceId);
  }

  async findUnreadByWorkspace(
    workspaceId: string,
    userId: string,
  ): Promise<KnowledgeBaseItem[]> {
    await this.validateWorkspaceAccess(workspaceId, userId);
    return this.knowledgeBaseRepository.findUnreadByWorkspace(workspaceId);
  }

  async findReadByWorkspace(
    workspaceId: string,
    userId: string,
  ): Promise<KnowledgeBaseItem[]> {
    await this.validateWorkspaceAccess(workspaceId, userId);
    return this.knowledgeBaseRepository.findReadByWorkspace(workspaceId);
  }

  async findByTagsInCollection(
    collectionId: string,
    userId: string,
    tags: string[],
  ): Promise<KnowledgeBaseItem[]> {
    await this.validateCollectionAccess(collectionId, userId);
    return this.knowledgeBaseRepository.findByCollectionAndTags(collectionId, tags);
  }

  async findByTagsInWorkspace(
    workspaceId: string,
    userId: string,
    tags: string[],
  ): Promise<KnowledgeBaseItem[]> {
    await this.validateWorkspaceAccess(workspaceId, userId);
    return this.knowledgeBaseRepository.findByWorkspaceAndTags(workspaceId, tags);
  }

  async markAsRead(id: string, userId: string): Promise<KnowledgeBaseItem> {
    const item = await this.knowledgeBaseRepository.findById(id);
    
    if (!item) {
      throw new NotFoundException('Knowledge base item not found');
    }

    if (item.user.id !== userId) {
      throw new ForbiddenException('Access denied to this knowledge base item');
    }

    item.markAsRead();
    return this.knowledgeBaseRepository.update(item);
  }

  async markAsUnread(id: string, userId: string): Promise<KnowledgeBaseItem> {
    const item = await this.knowledgeBaseRepository.findById(id);
    
    if (!item) {
      throw new NotFoundException('Knowledge base item not found');
    }

    if (item.user.id !== userId) {
      throw new ForbiddenException('Access denied to this knowledge base item');
    }

    item.markAsUnread();
    return this.knowledgeBaseRepository.update(item);
  }

  async toggleFavorite(id: string, userId: string): Promise<KnowledgeBaseItem> {
    const item = await this.knowledgeBaseRepository.findById(id);
    
    if (!item) {
      throw new NotFoundException('Knowledge base item not found');
    }

    if (item.user.id !== userId) {
      throw new ForbiddenException('Access denied to this knowledge base item');
    }

    item.isFavorite ? item.unmarkAsFavorite() : item.markAsFavorite();
    return this.knowledgeBaseRepository.update(item);
  }

  async markAsFavorite(id: string, userId: string): Promise<KnowledgeBaseItem> {
    const item = await this.knowledgeBaseRepository.findById(id);
    
    if (!item) {
      throw new NotFoundException('Knowledge base item not found');
    }

    if (item.user.id !== userId) {
      throw new ForbiddenException('Access denied to this knowledge base item');
    }

    item.markAsFavorite();
    return this.knowledgeBaseRepository.update(item);
  }

  async unmarkAsFavorite(id: string, userId: string): Promise<KnowledgeBaseItem> {
    const item = await this.knowledgeBaseRepository.findById(id);
    
    if (!item) {
      throw new NotFoundException('Knowledge base item not found');
    }

    if (item.user.id !== userId) {
      throw new ForbiddenException('Access denied to this knowledge base item');
    }

    item.unmarkAsFavorite();
    return this.knowledgeBaseRepository.update(item);
  }

  // Link monitoring methods
  async enableFollowing(id: string, userId: string): Promise<KnowledgeBaseItem> {
    const item = await this.knowledgeBaseRepository.findById(id);
    
    if (!item) {
      throw new NotFoundException('Knowledge base item not found');
    }

    if (item.user.id !== userId) {
      throw new ForbiddenException('Access denied to this knowledge base item');
    }

    item.enableFollowing();
    return this.knowledgeBaseRepository.update(item);
  }

  async disableFollowing(id: string, userId: string): Promise<KnowledgeBaseItem> {
    const item = await this.knowledgeBaseRepository.findById(id);
    
    if (!item) {
      throw new NotFoundException('Knowledge base item not found');
    }

    if (item.user.id !== userId) {
      throw new ForbiddenException('Access denied to this knowledge base item');
    }

    item.disableFollowing();
    return this.knowledgeBaseRepository.update(item);
  }

  async updateContentWithDiff(
    id: string,
    userId: string,
    rawContent?: string,
    markdownContent?: string,
    rawDiff?: string,
    markdownDiff?: string,
    checksum?: string,
  ): Promise<KnowledgeBaseItem> {
    const item = await this.knowledgeBaseRepository.findById(id);
    
    if (!item) {
      throw new NotFoundException('Knowledge base item not found');
    }

    if (item.user.id !== userId) {
      throw new ForbiddenException('Access denied to this knowledge base item');
    }

    if (rawContent !== undefined && markdownContent !== undefined) {
      item.updateBothContents(rawContent, markdownContent, rawDiff, markdownDiff, checksum);
    } else if (rawContent !== undefined) {
      item.updateRawContent(rawContent, rawDiff, checksum);
    } else if (markdownContent !== undefined) {
      item.updateMarkdownContent(markdownContent, markdownDiff, checksum);
    }

    return this.knowledgeBaseRepository.update(item);
  }

  async markChangesAsRead(id: string, userId: string): Promise<KnowledgeBaseItem> {
    const item = await this.knowledgeBaseRepository.findById(id);
    
    if (!item) {
      throw new NotFoundException('Knowledge base item not found');
    }

    if (item.user.id !== userId) {
      throw new ForbiddenException('Access denied to this knowledge base item');
    }

    item.markChangesAsRead();
    return this.knowledgeBaseRepository.update(item);
  }

  // Find items with unread changes
  async findWithUnreadChanges(userId: string): Promise<KnowledgeBaseItem[]> {
    return this.knowledgeBaseRepository.findWithUnreadChanges(userId);
  }

  async findWithUnreadChangesByWorkspace(
    workspaceId: string,
    userId: string,
  ): Promise<KnowledgeBaseItem[]> {
    await this.validateWorkspaceAccess(workspaceId, userId);
    return this.knowledgeBaseRepository.findWithUnreadChangesByWorkspace(workspaceId);
  }

  async findWithUnreadChangesByCollection(
    collectionId: string,
    userId: string,
  ): Promise<KnowledgeBaseItem[]> {
    await this.validateCollectionAccess(collectionId, userId);
    return this.knowledgeBaseRepository.findWithUnreadChangesByCollection(collectionId);
  }

  // Find followed items
  async findFollowedItems(userId: string): Promise<KnowledgeBaseItem[]> {
    return this.knowledgeBaseRepository.findFollowedItems(userId);
  }

  async findFollowedItemsByWorkspace(
    workspaceId: string,
    userId: string,
  ): Promise<KnowledgeBaseItem[]> {
    await this.validateWorkspaceAccess(workspaceId, userId);
    return this.knowledgeBaseRepository.findFollowedItemsByWorkspace(workspaceId);
  }

  // Background job method for checking links
  async findItemsNeedingCheck(hoursThreshold: number = 24): Promise<KnowledgeBaseItem[]> {
    const thresholdDate = new Date();
    thresholdDate.setHours(thresholdDate.getHours() - hoursThreshold);
    return this.knowledgeBaseRepository.findItemsNeedingCheck(thresholdDate);
  }

  async updateLastChecked(id: string): Promise<KnowledgeBaseItem> {
    const item = await this.knowledgeBaseRepository.findById(id);
    
    if (!item) {
      throw new NotFoundException('Knowledge base item not found');
    }

    item.updateLastChecked();
    return this.knowledgeBaseRepository.update(item);
  }

  private async validateWorkspaceAccess(
    workspaceId: string,
    userId: string,
  ): Promise<void> {
    const workspace = await this.workspaceRepository.findById(workspaceId);
    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }
    if (workspace.user.id !== userId) {
      throw new ForbiddenException('Access denied to this workspace');
    }
  }

  private async validateCollectionAccess(
    collectionId: string,
    userId: string,
  ): Promise<void> {
    const collection = await this.collectionRepository.findByIdWithValidation(collectionId, userId);
    if (!collection) {
      throw new NotFoundException('Collection not found or access denied');
    }
  }

  private async validateWorkspaceAndCollections(
    workspaceId: string,
    collectionIds: string[] = [],
    userId: string,
  ): Promise<{ workspace: any; collections: any[] }> {
    // Validate workspace
    const workspace = await this.workspaceRepository.findById(workspaceId);
    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }
    if (workspace.user.id !== userId) {
      throw new ForbiddenException('Access denied to this workspace');
    }

    // Validate collections if provided
    const collections = [];
    for (const collectionId of collectionIds) {
      const collection = await this.collectionRepository.findById(collectionId);
      if (!collection) {
        throw new NotFoundException(`Collection ${collectionId} not found`);
      }
      if (collection.workspace.id !== workspaceId) {
        throw new ForbiddenException(`Collection ${collectionId} does not belong to the specified workspace`);
      }
      collections.push(collection);
    }

    return { workspace, collections };
  }
}