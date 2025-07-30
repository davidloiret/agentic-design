import { Collection } from '../entity/collection.entity';

export interface CollectionRepositoryInterface {
  findById(id: string): Promise<Collection | null>;
  findByWorkspaceId(workspaceId: string): Promise<Collection[]>;
  findRootCollections(workspaceId: string): Promise<Collection[]>;
  findChildCollections(parentId: string): Promise<Collection[]>;
  create(collection: Collection): Promise<Collection>;
  update(collection: Collection): Promise<Collection>;
  delete(id: string): Promise<void>;
  findByIdWithValidation(id: string, userId: string): Promise<Collection | null>;
}