import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { Workspace } from '../../domain/entity/workspace.entity';
import { WorkspaceRepositoryInterface } from '../../domain/repository/workspace-repository.interface';

@Injectable()
export class WorkspaceRepository implements WorkspaceRepositoryInterface {
  constructor(
    @InjectRepository(Workspace)
    private readonly repository: EntityRepository<Workspace>,
  ) {}

  async findById(id: string): Promise<Workspace | null> {
    return this.repository.findOne({ id }, { populate: ['user'] });
  }

  async findByUserId(userId: string): Promise<Workspace[]> {
    return this.repository.find(
      { user: userId },
      { populate: ['user'], orderBy: { createdAt: 'ASC' } },
    );
  }

  async create(workspace: Workspace): Promise<Workspace> {
    await this.repository.getEntityManager().persistAndFlush(workspace);
    return workspace;
  }

  async update(workspace: Workspace): Promise<Workspace> {
    await this.repository.getEntityManager().persistAndFlush(workspace);
    return workspace;
  }

  async delete(id: string): Promise<void> {
    const workspace = await this.repository.findOne({ id });
    if (workspace) {
      await this.repository.getEntityManager().removeAndFlush(workspace);
    }
  }
}