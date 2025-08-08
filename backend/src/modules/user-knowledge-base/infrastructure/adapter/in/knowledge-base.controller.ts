import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '../../../../auth/infrastructure/guard/auth.guard';
import { KnowledgeBaseService } from '../../../application/usecase/knowledge-base.service';
import { CreateKnowledgeBaseItemDto } from '../../../application/dto/create-knowledge-base-item.dto';
import { BulkCreateRequestDto } from '../../../application/dto/bulk-create-knowledge-base-item.dto';
import { UpdateKnowledgeBaseItemDto } from '../../../application/dto/update-knowledge-base-item.dto';
import { KnowledgeBaseSearchDto } from '../../../application/dto/knowledge-base-search.dto';
import { UpdateContentWithDiffDto } from '../../../application/dto/update-content-with-diff.dto';
import { PaginationDto } from '../../../application/dto/pagination.dto';
import { KnowledgeBaseItemType } from '../../../domain/entity/knowledge-base-item.entity';

@Controller('user-knowledge-base')
@UseGuards(AuthGuard)
export class KnowledgeBaseController {
  constructor(private readonly knowledgeBaseService: KnowledgeBaseService) {}

  // General endpoints (across all workspaces)
  @Get()
  async findAll(@Request() req: any, @Query() paginationDto: PaginationDto) {
    return this.knowledgeBaseService.findByUserId(req.user.id, paginationDto);
  }

  // Bulk operations
  @Post('bulk')
  async bulkCreateOrUpdate(
    @Request() req: any,
    @Body() bulkCreateDto: BulkCreateRequestDto,
  ) {
    return this.knowledgeBaseService.bulkCreateOrUpdate(req.user, bulkCreateDto);
  }

  // Workspace-scoped endpoints
  @Post(':workspaceId')
  async create(
    @Request() req: any,
    @Param('workspaceId') workspaceId: string,
    @Body() createDto: Omit<CreateKnowledgeBaseItemDto, 'workspaceId'>,
  ) {
    const fullCreateDto = { ...createDto, workspaceId };
    return this.knowledgeBaseService.create(req.user, fullCreateDto);
  }

  @Get(':workspaceId')
  async findByWorkspace(
    @Request() req: any,
    @Param('workspaceId') workspaceId: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.knowledgeBaseService.findByWorkspace(workspaceId, req.user.id, paginationDto);
  }

  @Get(':workspaceId/search')
  async search(
    @Request() req: any,
    @Param('workspaceId') workspaceId: string,
    @Query() searchDto: KnowledgeBaseSearchDto,
  ) {
    return this.knowledgeBaseService.searchInWorkspace(workspaceId, req.user.id, searchDto);
  }

  @Get(':workspaceId/favorites')
  async findFavorites(
    @Request() req: any,
    @Param('workspaceId') workspaceId: string,
  ) {
    return this.knowledgeBaseService.findFavoritesByWorkspace(workspaceId, req.user.id);
  }

  @Get(':workspaceId/unread')
  async findUnreadInWorkspace(
    @Request() req: any,
    @Param('workspaceId') workspaceId: string,
  ) {
    return this.knowledgeBaseService.findUnreadByWorkspace(workspaceId, req.user.id);
  }

  @Get(':workspaceId/read')
  async findReadInWorkspace(
    @Request() req: any,
    @Param('workspaceId') workspaceId: string,
  ) {
    return this.knowledgeBaseService.findReadByWorkspace(workspaceId, req.user.id);
  }

  @Get(':id')
  async findOne(@Request() req: any, @Param('id') id: string) {
    return this.knowledgeBaseService.findById(id, req.user.id);
  }

  @Put(':id')
  async update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updateDto: UpdateKnowledgeBaseItemDto,
  ) {
    return this.knowledgeBaseService.update(id, req.user.id, updateDto);
  }

  @Delete(':id')
  async delete(@Request() req: any, @Param('id') id: string) {
    await this.knowledgeBaseService.delete(id, req.user.id);
    return { message: 'Knowledge base item deleted successfully' };
  }

  // Read status operations
  @Put(':id/read')
  async markAsRead(@Request() req: any, @Param('id') id: string) {
    return this.knowledgeBaseService.markAsRead(id, req.user.id);
  }

  @Put(':id/unread')
  async markAsUnread(@Request() req: any, @Param('id') id: string) {
    return this.knowledgeBaseService.markAsUnread(id, req.user.id);
  }

  // Favorite operations
  @Put(':id/favorite')
  async markAsFavorite(@Request() req: any, @Param('id') id: string) {
    return this.knowledgeBaseService.markAsFavorite(id, req.user.id);
  }

  @Delete(':id/favorite')
  async unmarkAsFavorite(@Request() req: any, @Param('id') id: string) {
    return this.knowledgeBaseService.unmarkAsFavorite(id, req.user.id);
  }

  @Put(':id/toggle-favorite')
  async toggleFavorite(@Request() req: any, @Param('id') id: string) {
    return this.knowledgeBaseService.toggleFavorite(id, req.user.id);
  }

  // Link monitoring operations
  @Put(':id/follow')
  async enableFollowing(@Request() req: any, @Param('id') id: string) {
    return this.knowledgeBaseService.enableFollowing(id, req.user.id);
  }

  @Delete(':id/follow')
  async disableFollowing(@Request() req: any, @Param('id') id: string) {
    return this.knowledgeBaseService.disableFollowing(id, req.user.id);
  }

  // Content management with diff tracking
  @Put(':id/content')
  async updateContentWithDiff(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updateDto: UpdateContentWithDiffDto,
  ) {
    return this.knowledgeBaseService.updateContentWithDiff(
      id,
      req.user.id,
      updateDto.rawContent,
      updateDto.markdownContent,
      updateDto.rawDiff,
      updateDto.markdownDiff,
      updateDto.checksum,
    );
  }

  @Put(':id/changes/read')
  async markChangesAsRead(@Request() req: any, @Param('id') id: string) {
    return this.knowledgeBaseService.markChangesAsRead(id, req.user.id);
  }

  // Find items with unread changes
  @Get('changes/unread')
  async findWithUnreadChanges(@Request() req: any) {
    return this.knowledgeBaseService.findWithUnreadChanges(req.user.id);
  }

  @Get('workspace/:workspaceId/changes/unread')
  async findWithUnreadChangesByWorkspace(
    @Request() req: any,
    @Param('workspaceId') workspaceId: string,
  ) {
    return this.knowledgeBaseService.findWithUnreadChangesByWorkspace(workspaceId, req.user.id);
  }

  @Get('workspace/:workspaceId/collection/:collectionId/changes/unread')
  async findWithUnreadChangesByCollection(
    @Request() req: any,
    @Param('collectionId') collectionId: string,
  ) {
    return this.knowledgeBaseService.findWithUnreadChangesByCollection(collectionId, req.user.id);
  }

  // Find followed items
  @Get('followed')
  async findFollowedItems(@Request() req: any) {
    return this.knowledgeBaseService.findFollowedItems(req.user.id);
  }

  @Get('workspace/:workspaceId/followed')
  async findFollowedItemsByWorkspace(
    @Request() req: any,
    @Param('workspaceId') workspaceId: string,
  ) {
    return this.knowledgeBaseService.findFollowedItemsByWorkspace(workspaceId, req.user.id);
  }

  // Type-specific endpoints for workspace
  @Get('workspace/:workspaceId/notes')
  async findNotes(
    @Request() req: any,
    @Param('workspaceId') workspaceId: string,
  ) {
    return this.knowledgeBaseService.findByWorkspaceAndType(
      workspaceId,
      req.user.id,
      KnowledgeBaseItemType.NOTE,
    );
  }

  @Post('workspace/:workspaceId/notes')
  async createNote(
    @Request() req: any,
    @Param('workspaceId') workspaceId: string,
    @Body() createDto: Omit<CreateKnowledgeBaseItemDto, 'type' | 'workspaceId'>,
  ) {
    const noteDto = { ...createDto, type: KnowledgeBaseItemType.NOTE, workspaceId };
    return this.knowledgeBaseService.create(req.user, noteDto);
  }

  @Get('workspace/:workspaceId/sources')
  async findSources(
    @Request() req: any,
    @Param('workspaceId') workspaceId: string,
  ) {
    return this.knowledgeBaseService.findByWorkspaceAndType(
      workspaceId,
      req.user.id,
      KnowledgeBaseItemType.SOURCE,
    );
  }

  @Post('workspace/:workspaceId/sources')
  async createSource(
    @Request() req: any,
    @Param('workspaceId') workspaceId: string,
    @Body() createDto: Omit<CreateKnowledgeBaseItemDto, 'type' | 'workspaceId'>,
  ) {
    const sourceDto = { ...createDto, type: KnowledgeBaseItemType.SOURCE, workspaceId };
    return this.knowledgeBaseService.create(req.user, sourceDto);
  }

  @Get('workspace/:workspaceId/pdfs')
  async findPdfs(
    @Request() req: any,
    @Param('workspaceId') workspaceId: string,
  ) {
    return this.knowledgeBaseService.findByWorkspaceAndType(
      workspaceId,
      req.user.id,
      KnowledgeBaseItemType.PDF,
    );
  }

  @Post('workspace/:workspaceId/pdfs')
  async createPdf(
    @Request() req: any,
    @Param('workspaceId') workspaceId: string,
    @Body() createDto: Omit<CreateKnowledgeBaseItemDto, 'type' | 'workspaceId'>,
  ) {
    const pdfDto = { ...createDto, type: KnowledgeBaseItemType.PDF, workspaceId };
    return this.knowledgeBaseService.create(req.user, pdfDto);
  }

  // Collection-specific endpoints for read status and favorites
  @Get('workspace/:workspaceId/collection/:collectionId/favorites')
  async findFavoritesInCollection(
    @Request() req: any,
    @Param('collectionId') collectionId: string,
  ) {
    return this.knowledgeBaseService.findFavoritesByCollection(collectionId, req.user.id);
  }

  @Get('workspace/:workspaceId/collection/:collectionId/unread')
  async findUnreadInCollection(
    @Request() req: any,
    @Param('collectionId') collectionId: string,
  ) {
    return this.knowledgeBaseService.findUnreadByCollection(collectionId, req.user.id);
  }

  @Get('workspace/:workspaceId/collection/:collectionId/read')
  async findReadInCollection(
    @Request() req: any,
    @Param('collectionId') collectionId: string,
  ) {
    return this.knowledgeBaseService.findReadByCollection(collectionId, req.user.id);
  }

  @Get('workspace/:workspaceId/collection/:collectionId/search')
  async searchInCollection(
    @Request() req: any,
    @Param('collectionId') collectionId: string,
    @Query() searchDto: KnowledgeBaseSearchDto,
  ) {
    return this.knowledgeBaseService.searchInCollection(collectionId, req.user.id, searchDto);
  }

  // Tag-based filtering for workspace
  @Get('workspace/:workspaceId/tags/:tag')
  async findByTagInWorkspace(
    @Request() req: any,
    @Param('workspaceId') workspaceId: string,
    @Param('tag') tag: string,
  ) {
    return this.knowledgeBaseService.findByTagsInWorkspace(workspaceId, req.user.id, [tag]);
  }

  @Get('workspace/:workspaceId/collection/:collectionId/tags/:tag')
  async findByTagInCollection(
    @Request() req: any,
    @Param('collectionId') collectionId: string,
    @Param('tag') tag: string,
  ) {
    return this.knowledgeBaseService.findByTagsInCollection(collectionId, req.user.id, [tag]);
  }
}