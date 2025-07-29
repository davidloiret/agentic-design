import { Controller, Get, Post, Put, Delete, Body, Param, Req, Query } from '@nestjs/common';
import { Request } from 'express';
import { CollectionRule } from '../../domain/entity/collection.entity';

export class CreateCollectionDto {
  name: string;
  color: string;
  workspaceId: string;
  icon?: string;
  description?: string;
  parentId?: string;
  order?: number;
  isSmartCollection?: boolean;
  smartRules?: CollectionRule[];
}

export class UpdateCollectionDto {
  name?: string;
  color?: string;
  icon?: string;
  description?: string;
  parentId?: string;
  order?: number;
  isExpanded?: boolean;
  isSmartCollection?: boolean;
  smartRules?: CollectionRule[];
}

@Controller('collections')
export class CollectionController {
  @Get()
  async getCollections(
    @Query('workspaceId') workspaceId?: string,
    @Req() request: Request,
  ) {
    // TODO: Implement with service
    return [];
  }

  @Post()
  async createCollection(
    @Body() dto: CreateCollectionDto,
    @Req() request: Request,
  ) {
    // TODO: Implement with service
    return {};
  }

  @Put(':id')
  async updateCollection(
    @Param('id') id: string,
    @Body() dto: UpdateCollectionDto,
    @Req() request: Request,
  ) {
    // TODO: Implement with service
    return {};
  }

  @Delete(':id')
  async deleteCollection(
    @Param('id') id: string,
    @Req() request: Request,
  ) {
    // TODO: Implement with service
    return { success: true };
  }

  @Get(':id')
  async getCollection(
    @Param('id') id: string,
    @Req() request: Request,
  ) {
    // TODO: Implement with service
    return {};
  }

  @Get(':id/items')
  async getCollectionItems(
    @Param('id') id: string,
    @Req() request: Request,
  ) {
    // TODO: Implement with service
    return [];
  }
}