import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { Collection } from '../../domain/entity/collection.entity';
import { CollectionRepository } from '../../infrastructure/persistence/collection.repository';
import { WorkspaceRepository } from '../../infrastructure/persistence/workspace.repository';
import { CreateCollectionDto } from '../dto/create-collection.dto';
import { UpdateCollectionDto } from '../dto/update-collection.dto';
import { MoveCollectionDto } from '../dto/move-collection.dto';
import { User } from '../../../user/domain/entity/user.entity';

@Injectable()
export class CollectionService {
  constructor(
    private readonly collectionRepository: CollectionRepository,
    private readonly workspaceRepository: WorkspaceRepository,
  ) {}

  async create(
    user: User,
    createDto: CreateCollectionDto,
  ): Promise<Collection> {
    // Validate workspace access
    const workspace = await this.workspaceRepository.findById(createDto.workspaceId);
    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }
    if (workspace.user.id !== user.id) {
      throw new ForbiddenException('Access denied to this workspace');
    }

    // Validate parent collection if specified
    if (createDto.parentId) {
      const parentCollection = await this.collectionRepository.findById(createDto.parentId);
      if (!parentCollection) {
        throw new NotFoundException('Parent collection not found');
      }
      if (parentCollection.workspace.id !== createDto.workspaceId) {
        throw new BadRequestException('Parent collection must be in the same workspace');
      }
    }

    // Determine order if not specified
    let order = createDto.order || 0;
    if (order === 0) {
      const siblings = createDto.parentId
        ? await this.collectionRepository.findChildCollections(createDto.parentId)
        : await this.collectionRepository.findRootCollections(createDto.workspaceId);
      order = siblings.length;
    }

    const collection = new Collection(
      createDto.name,
      createDto.color,
      workspace,
      order,
      createDto.icon,
      createDto.description,
    );

    if (createDto.parentId) {
      collection.parentId = createDto.parentId;
    }

    if (createDto.isSmartCollection) {
      collection.isSmartCollection = true;
      collection.smartRules = createDto.smartRules || [];
    }

    return this.collectionRepository.create(collection);
  }

  async findByWorkspace(
    workspaceId: string,
    userId: string,
  ): Promise<Collection[]> {
    await this.validateWorkspaceAccess(workspaceId, userId);
    return this.collectionRepository.findByWorkspaceId(workspaceId);
  }

  async findRootCollections(
    workspaceId: string,
    userId: string,
  ): Promise<Collection[]> {
    await this.validateWorkspaceAccess(workspaceId, userId);
    return this.collectionRepository.findRootCollections(workspaceId);
  }

  async findChildCollections(
    parentId: string,
    userId: string,
  ): Promise<Collection[]> {
    const parentCollection = await this.collectionRepository.findByIdWithValidation(parentId, userId);
    if (!parentCollection) {
      throw new NotFoundException('Parent collection not found or access denied');
    }
    return this.collectionRepository.findChildCollections(parentId);
  }

  async findById(id: string, userId: string): Promise<Collection> {
    const collection = await this.collectionRepository.findByIdWithValidation(id, userId);
    if (!collection) {
      throw new NotFoundException('Collection not found or access denied');
    }
    return collection;
  }

  async update(
    id: string,
    userId: string,
    updateDto: UpdateCollectionDto,
  ): Promise<Collection> {
    const collection = await this.collectionRepository.findByIdWithValidation(id, userId);
    if (!collection) {
      throw new NotFoundException('Collection not found or access denied');
    }

    // Validate parent collection if being changed
    if (updateDto.parentId !== undefined) {
      if (updateDto.parentId) {
        const parentCollection = await this.collectionRepository.findById(updateDto.parentId);
        if (!parentCollection) {
          throw new NotFoundException('Parent collection not found');
        }
        if (parentCollection.workspace.id !== collection.workspace.id) {
          throw new BadRequestException('Parent collection must be in the same workspace');
        }
        // Prevent circular reference
        if (await this.wouldCreateCircularReference(id, updateDto.parentId)) {
          throw new BadRequestException('Cannot create circular reference in collection hierarchy');
        }
      }
      collection.parentId = updateDto.parentId;
    }

    // Update other properties
    if (updateDto.name) collection.name = updateDto.name;
    if (updateDto.color) collection.color = updateDto.color;
    if (updateDto.icon !== undefined) collection.icon = updateDto.icon;
    if (updateDto.description !== undefined) collection.description = updateDto.description;
    if (updateDto.order !== undefined) collection.order = updateDto.order;
    if (updateDto.isExpanded !== undefined) collection.isExpanded = updateDto.isExpanded;
    if (updateDto.isSmartCollection !== undefined) {
      collection.isSmartCollection = updateDto.isSmartCollection;
      if (updateDto.smartRules) {
        collection.smartRules = updateDto.smartRules;
      }
    }

    return this.collectionRepository.update(collection);
  }

  async move(
    id: string,
    userId: string,
    moveDto: MoveCollectionDto,
  ): Promise<Collection> {
    const collection = await this.collectionRepository.findByIdWithValidation(id, userId);
    if (!collection) {
      throw new NotFoundException('Collection not found or access denied');
    }

    // Validate new parent if specified
    if (moveDto.newParentId) {
      const newParent = await this.collectionRepository.findById(moveDto.newParentId);
      if (!newParent) {
        throw new NotFoundException('New parent collection not found');
      }
      if (newParent.workspace.id !== collection.workspace.id) {
        throw new BadRequestException('Cannot move collection to different workspace');
      }
      // Prevent circular reference
      if (await this.wouldCreateCircularReference(id, moveDto.newParentId)) {
        throw new BadRequestException('Cannot create circular reference in collection hierarchy');
      }
    }

    // Update parent and order
    collection.parentId = moveDto.newParentId;
    if (moveDto.newOrder !== undefined) {
      collection.order = moveDto.newOrder;
    }

    return this.collectionRepository.update(collection);
  }

  async delete(id: string, userId: string): Promise<void> {
    const collection = await this.collectionRepository.findByIdWithValidation(id, userId);
    if (!collection) {
      throw new NotFoundException('Collection not found or access denied');
    }

    // Check if collection has children
    const children = await this.collectionRepository.findChildCollections(id);
    if (children.length > 0) {
      throw new BadRequestException('Cannot delete collection with child collections. Please move or delete children first.');
    }

    await this.collectionRepository.delete(id);
  }

  async getCollectionTree(
    workspaceId: string,
    userId: string,
  ): Promise<Collection[]> {
    await this.validateWorkspaceAccess(workspaceId, userId);
    const allCollections = await this.collectionRepository.findByWorkspaceId(workspaceId);
    return this.buildCollectionTree(allCollections);
  }

  private buildCollectionTree(collections: Collection[]): Collection[] {
    const collectionMap = new Map<string, Collection & { children?: Collection[] }>();
    const rootCollections: Collection[] = [];

    // Create map of all collections
    collections.forEach(collection => {
      const collectionWithChildren = collection as Collection & { children?: Collection[] };
      collectionWithChildren.children = [];
      collectionMap.set(collection.id, collectionWithChildren);
    });

    // Build tree structure
    collections.forEach(collection => {
      const collectionWithChildren = collectionMap.get(collection.id)!;
      
      if (collection.parentId) {
        const parent = collectionMap.get(collection.parentId);
        if (parent) {
          parent.children!.push(collectionWithChildren);
        }
      } else {
        rootCollections.push(collectionWithChildren);
      }
    });

    // Sort by order
    const sortByOrder = (a: Collection, b: Collection) => a.order - b.order;
    rootCollections.sort(sortByOrder);
    collectionMap.forEach(collection => {
      if (collection.children) {
        collection.children.sort(sortByOrder);
      }
    });

    return rootCollections;
  }

  private async wouldCreateCircularReference(
    collectionId: string,
    newParentId: string,
  ): Promise<boolean> {
    let currentParentId = newParentId;
    
    while (currentParentId) {
      if (currentParentId === collectionId) {
        return true;
      }
      
      const parent = await this.collectionRepository.findById(currentParentId);
      currentParentId = parent?.parentId || null;
    }
    
    return false;
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
}