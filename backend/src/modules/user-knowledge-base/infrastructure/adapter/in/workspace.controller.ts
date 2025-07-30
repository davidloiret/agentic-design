import { Controller, Get, Post, Put, Delete, Body, Param, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../../auth/infrastructure/guard/auth.guard';
import { WorkspaceRepository } from '../../persistence/workspace.repository';
import { Workspace } from '../../../domain/entity/workspace.entity';
import { User } from '../../../../user/domain/entity/user.entity';

interface CreateWorkspaceDto {
  name: string;
  color: string;
  icon?: string;
  description?: string;
}

interface UpdateWorkspaceDto {
  name?: string;
  color?: string;
  icon?: string;
  description?: string;
  isExpanded?: boolean;
}

@Controller('workspaces')
@UseGuards(AuthGuard)
export class WorkspaceController {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  // Get all workspaces for the user
  @Get()
  async findAll(@Request() req: any) {
    return this.workspaceRepository.findByUserId(req.user.id);
  }

  // Create new workspace
  @Post()
  async create(
    @Request() req: any,
    @Body() createDto: CreateWorkspaceDto,
  ) {
    const workspace = new Workspace(
      createDto.name,
      createDto.color,
      req.user,
      createDto.icon,
      createDto.description,
    );

    return this.workspaceRepository.create(workspace);
  }

  // Get workspace by ID
  @Get(':id')
  async findOne(@Request() req: any, @Param('id') id: string) {
    const workspace = await this.workspaceRepository.findById(id);
    
    if (!workspace) {
      throw new Error('Workspace not found');
    }

    if (workspace.user.id !== req.user.id) {
      throw new Error('Access denied to this workspace');
    }

    return workspace;
  }

  // Update workspace
  @Put(':id')
  async update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updateDto: UpdateWorkspaceDto,
  ) {
    const workspace = await this.workspaceRepository.findById(id);
    
    if (!workspace) {
      throw new Error('Workspace not found');
    }

    if (workspace.user.id !== req.user.id) {
      throw new Error('Access denied to this workspace');
    }

    if (updateDto.name !== undefined) workspace.name = updateDto.name;
    if (updateDto.color !== undefined) workspace.color = updateDto.color;
    if (updateDto.icon !== undefined) workspace.icon = updateDto.icon;
    if (updateDto.description !== undefined) workspace.description = updateDto.description;
    if (updateDto.isExpanded !== undefined) workspace.isExpanded = updateDto.isExpanded;

    return this.workspaceRepository.update(workspace);
  }

  // Delete workspace
  @Delete(':id')
  async delete(@Request() req: any, @Param('id') id: string) {
    const workspace = await this.workspaceRepository.findById(id);
    
    if (!workspace) {
      throw new Error('Workspace not found');
    }

    if (workspace.user.id !== req.user.id) {
      throw new Error('Access denied to this workspace');
    }

    await this.workspaceRepository.delete(id);
    return { message: 'Workspace deleted successfully' };
  }
}