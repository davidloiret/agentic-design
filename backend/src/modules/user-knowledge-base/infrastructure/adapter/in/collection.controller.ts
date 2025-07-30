import { Controller, Get, Post, Put, Delete, Body, Param, Request, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../../auth/infrastructure/guard/auth.guard';
import { CollectionService } from '../../../application/usecase/collection.service';
import { CreateCollectionDto } from '../../../application/dto/create-collection.dto';
import { UpdateCollectionDto } from '../../../application/dto/update-collection.dto';
import { MoveCollectionDto } from '../../../application/dto/move-collection.dto';

@Controller('user-knowledge-base/:workspaceId/collections')
@UseGuards(AuthGuard)
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  // Create new collection
  @Post()
  async create(
    @Request() req: any,
    @Param('workspaceId') workspaceId: string,
    @Body() createDto: CreateCollectionDto,
  ) {
    const fullCreateDto = { ...createDto, workspaceId };
    return this.collectionService.create(req.user, fullCreateDto);
  }

  // Get all collections in workspace (flat list)
  @Get()
  async findByWorkspace(
    @Request() req: any,
    @Param('workspaceId') workspaceId: string,
  ) {
    return this.collectionService.findByWorkspace(workspaceId, req.user.id);
  }

  // Get collection tree for workspace (hierarchical structure)
  @Get('tree')
  async getCollectionTree(
    @Request() req: any,
    @Param('workspaceId') workspaceId: string,
  ) {
    return this.collectionService.getCollectionTree(workspaceId, req.user.id);
  }

  // Get root collections in workspace
  @Get('root')
  async findRootCollections(
    @Request() req: any,
    @Param('workspaceId') workspaceId: string,
  ) {
    return this.collectionService.findRootCollections(workspaceId, req.user.id);
  }

  // Get collection by ID
  @Get(':id')
  async findOne(
    @Request() req: any,
    @Param('workspaceId') workspaceId: string,
    @Param('id') id: string,
  ) {
    return this.collectionService.findById(id, req.user.id);
  }

  // Update collection
  @Put(':id')
  async update(
    @Request() req: any,
    @Param('workspaceId') workspaceId: string,
    @Param('id') id: string,
    @Body() updateDto: UpdateCollectionDto,
  ) {
    return this.collectionService.update(id, req.user.id, updateDto);
  }

  // Move collection (change parent and/or order)
  @Put(':id/move')
  async move(
    @Request() req: any,
    @Param('workspaceId') workspaceId: string,
    @Param('id') id: string,
    @Body() moveDto: MoveCollectionDto,
  ) {
    return this.collectionService.move(id, req.user.id, moveDto);
  }

  // Delete collection
  @Delete(':id')
  async delete(
    @Request() req: any,
    @Param('workspaceId') workspaceId: string,
    @Param('id') id: string,
  ) {
    await this.collectionService.delete(id, req.user.id);
    return { message: 'Collection deleted successfully' };
  }

  // Get child collections of a parent collection
  @Get(':parentId/children')
  async findChildCollections(
    @Request() req: any,
    @Param('workspaceId') workspaceId: string,
    @Param('parentId') parentId: string,
  ) {
    return this.collectionService.findChildCollections(parentId, req.user.id);
  }
}