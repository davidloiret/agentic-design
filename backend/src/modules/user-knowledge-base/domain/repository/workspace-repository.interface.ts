import { Workspace } from '../entity/workspace.entity';

export interface WorkspaceRepositoryInterface {
  findById(id: string): Promise<Workspace | null>;
  findByUserId(userId: string): Promise<Workspace[]>;
  create(workspace: Workspace): Promise<Workspace>;
  update(workspace: Workspace): Promise<Workspace>;
  delete(id: string): Promise<void>;
}