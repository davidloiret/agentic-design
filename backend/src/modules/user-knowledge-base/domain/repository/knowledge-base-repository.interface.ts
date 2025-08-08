import { KnowledgeBaseItem, KnowledgeBaseItemType } from '../entity/knowledge-base-item.entity';

export interface BulkCreateResult {
  created: KnowledgeBaseItem[];
  updated: KnowledgeBaseItem[];
  errors: { externalId?: string; title: string; error: string }[];
}

export interface KnowledgeBaseRepositoryInterface {
  create(item: KnowledgeBaseItem): Promise<KnowledgeBaseItem>;
  bulkCreateOrUpdate(items: KnowledgeBaseItem[], externalIds?: string[]): Promise<BulkCreateResult>;
  findById(id: string): Promise<KnowledgeBaseItem | null>;
  findByCollection(collectionId: string): Promise<KnowledgeBaseItem[]>;
  findByCollectionAndType(collectionId: string, type: KnowledgeBaseItemType): Promise<KnowledgeBaseItem[]>;
  findByCollectionAndTags(collectionId: string, tags: string[]): Promise<KnowledgeBaseItem[]>;
  findFavoritesByCollection(collectionId: string): Promise<KnowledgeBaseItem[]>;
  findUnreadByCollection(collectionId: string): Promise<KnowledgeBaseItem[]>;
  findReadByCollection(collectionId: string): Promise<KnowledgeBaseItem[]>;
  findByWorkspace(workspaceId: string): Promise<KnowledgeBaseItem[]>;
  findByWorkspaceAndType(workspaceId: string, type: KnowledgeBaseItemType): Promise<KnowledgeBaseItem[]>;
  findByWorkspaceAndTags(workspaceId: string, tags: string[]): Promise<KnowledgeBaseItem[]>;
  findFavoritesByWorkspace(workspaceId: string): Promise<KnowledgeBaseItem[]>;
  findUnreadByWorkspace(workspaceId: string): Promise<KnowledgeBaseItem[]>;
  findReadByWorkspace(workspaceId: string): Promise<KnowledgeBaseItem[]>;
  findWithUnreadChanges(userId: string): Promise<KnowledgeBaseItem[]>;
  findWithUnreadChangesByWorkspace(workspaceId: string): Promise<KnowledgeBaseItem[]>;
  findWithUnreadChangesByCollection(collectionId: string): Promise<KnowledgeBaseItem[]>;
  findFollowedItems(userId: string): Promise<KnowledgeBaseItem[]>;
  findFollowedItemsByWorkspace(workspaceId: string): Promise<KnowledgeBaseItem[]>;
  findItemsNeedingCheck(lastCheckThreshold: Date): Promise<KnowledgeBaseItem[]>;
  findByUserId(userId: string): Promise<KnowledgeBaseItem[]>;
  findByUserIdPaginated(userId: string, skip: number, limit: number): Promise<KnowledgeBaseItem[]>;
  countByUserId(userId: string): Promise<number>;
  findByWorkspacePaginated(workspaceId: string, skip: number, limit: number): Promise<KnowledgeBaseItem[]>;
  countByWorkspace(workspaceId: string): Promise<number>;
  update(item: KnowledgeBaseItem): Promise<KnowledgeBaseItem>;
  delete(id: string): Promise<void>;
  searchInCollection(collectionId: string, query: string, type?: KnowledgeBaseItemType): Promise<KnowledgeBaseItem[]>;
  searchInWorkspace(workspaceId: string, query: string, type?: KnowledgeBaseItemType): Promise<KnowledgeBaseItem[]>;
}