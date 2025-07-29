import { Controller, Get, Post, Put, Delete, Body, Param, Req } from '@nestjs/common';
import { Request } from 'express';

export class CreateWorkspaceDto {
  name: string;
  color: string;
  icon?: string;
  description?: string;
}

export class UpdateWorkspaceDto {
  name?: string;
  color?: string;
  icon?: string;
  description?: string;
  isExpanded?: boolean;
}

@Controller('workspaces')
export class WorkspaceController {
  @Get()
  async getWorkspaces(@Req() request: Request) {
    // TODO: Implement with service
    return [];
  }

  @Post()
  async createWorkspace(
    @Body() dto: CreateWorkspaceDto,
    @Req() request: Request,
  ) {
    // TODO: Implement with service
    return {};
  }

  @Put(':id')
  async updateWorkspace(
    @Param('id') id: string,
    @Body() dto: UpdateWorkspaceDto,
    @Req() request: Request,
  ) {
    // TODO: Implement with service
    return {};
  }

  @Delete(':id')
  async deleteWorkspace(
    @Param('id') id: string,
    @Req() request: Request,
  ) {
    // TODO: Implement with service
    return { success: true };
  }

  @Get(':id')
  async getWorkspace(
    @Param('id') id: string,
    @Req() request: Request,
  ) {
    // TODO: Implement with service
    return {};
  }
}