import { Controller, Get, Post, Put, Delete, Body, Param, Req, Query } from '@nestjs/common';
import { Request } from 'express';
import { FileData, FileType } from '../../domain/entity/saved-item.entity';

export class CreateSavedItemDto {
  url: string;
  title: string;
  excerpt: string;
  workspaceId: string;
  collectionIds?: string[];
  tags?: string[];
  color?: string;
  isNote?: boolean;
  fileType?: FileType;
  content?: string;
  fileData?: FileData;
}

export class UpdateSavedItemDto {
  title?: string;
  excerpt?: string;
  tags?: string[];
  favorite?: boolean;
  read?: boolean;
  color?: string;
  pinned?: boolean;
  workspaceId?: string;
  collectionIds?: string[];
  content?: string;
  relevanceScore?: number;
  hasMarkdown?: boolean;
}

export class SearchSavedItemsDto {
  query?: string;
  workspaceId?: string;
  collectionIds?: string[];
  tags?: string[];
  favorite?: boolean;
  read?: boolean;
  fileType?: FileType;
  limit?: number;
  offset?: number;
}

@Controller('saved-items')
export class SavedItemController {
  @Get()
  async getSavedItems(
    @Query() query: SearchSavedItemsDto,
    @Req() request: Request,
  ) {
    // TODO: Implement with service
    return [];
  }

  @Get('search')
  async searchSavedItems(
    @Query() query: SearchSavedItemsDto,
    @Req() request: Request,
  ) {
    // TODO: Implement with service using full-text search
    return [];
  }

  @Post()
  async createSavedItem(
    @Body() dto: CreateSavedItemDto,
    @Req() request: Request,
  ) {
    // TODO: Implement with service
    return {};
  }

  @Put(':id')
  async updateSavedItem(
    @Param('id') id: string,
    @Body() dto: UpdateSavedItemDto,
    @Req() request: Request,
  ) {
    // TODO: Implement with service
    return {};
  }

  @Delete(':id')
  async deleteSavedItem(
    @Param('id') id: string,
    @Req() request: Request,
  ) {
    // TODO: Implement with service
    return { success: true };
  }

  @Get(':id')
  async getSavedItem(
    @Param('id') id: string,
    @Req() request: Request,
  ) {
    // TODO: Implement with service
    return {};
  }

  @Get(':id/markdown')
  async getMarkdownContent(
    @Param('id') id: string,
    @Req() request: Request,
  ) {
    // TODO: Implement with service
    return {};
  }

  @Put(':id/markdown')
  async updateMarkdownContent(
    @Param('id') id: string,
    @Body() body: { title: string; url: string; markdown: string },
    @Req() request: Request,
  ) {
    // TODO: Implement with service
    return {};
  }

  @Post('bulk')
  async createBulkSavedItems(
    @Body() dto: CreateSavedItemDto[],
    @Req() request: Request,
  ) {
    // TODO: Implement with service for bulk operations
    return [];
  }
}