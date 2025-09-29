import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
  Body,
  UseGuards,
  Request,
  Response,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  StreamableFile,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../../../auth/infrastructure/guard/auth.guard';
import { VcfFilesService, FileUploadResult } from '../application/vcf-files.service';
import { VcfFileAccessLevel } from '../domain/vcf-file.entity';
import { Express } from 'express';

@Controller('api/v1/vcf/files')
@UseGuards(AuthGuard)
export class VcfFilesController {
  constructor(
    private readonly filesService: VcfFilesService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: {
      entityType: string;
      entityId: string;
      description?: string;
      tags?: string[];
      accessLevel?: VcfFileAccessLevel;
    },
  ): Promise<FileUploadResult> {
    return this.filesService.uploadFile(req.user, file, {
      entityType: body.entityType,
      entityId: body.entityId,
      description: body.description,
      tags: body.tags,
      accessLevel: body.accessLevel,
    });
  }

  @Post('upload-multiple')
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadMultipleFiles(
    @Request() req,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: {
      entityType: string;
      entityId: string;
      descriptions?: string[];
      tags?: string[];
      accessLevel?: VcfFileAccessLevel;
    },
  ) {
    const results = [];

    for (let i = 0; i < files.length; i++) {
      const result = await this.filesService.uploadFile(req.user, files[i], {
        entityType: body.entityType,
        entityId: body.entityId,
        description: body.descriptions?.[i],
        tags: body.tags,
        accessLevel: body.accessLevel,
      });
      results.push(result);
    }

    return results;
  }

  @Get(':id')
  async getFile(
    @Param('id') fileId: string,
    @Request() req,
  ) {
    return this.filesService.getFile(fileId, req.user.id);
  }

  @Get(':id/download')
  async downloadFile(
    @Param('id') fileId: string,
    @Request() req,
    @Response({ passthrough: true }) res,
  ): Promise<StreamableFile> {
    const file = await this.filesService.getFile(fileId, req.user.id);
    const stream = await this.filesService.getFileStream(fileId, req.user.id);

    res.set({
      'Content-Type': file.mimeType,
      'Content-Disposition': `attachment; filename="${file.originalFilename}"`,
      'Content-Length': file.size,
    });

    return new StreamableFile(stream as any);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFile(
    @Param('id') fileId: string,
    @Request() req,
  ) {
    await this.filesService.deleteFile(fileId, req.user.id);
  }

  @Get('entity/:entityType/:entityId')
  async getEntityFiles(
    @Param('entityType') entityType: string,
    @Param('entityId') entityId: string,
    @Request() req,
  ) {
    return this.filesService.getFilesByEntity(entityType, entityId, req.user.id);
  }

  @Get('my-files')
  async getMyFiles(@Request() req) {
    return this.filesService.getFilesByUploader(req.user.id);
  }

  @Get('stats')
  async getStats(@Request() req) {
    return this.filesService.getStorageStats(req.user.id);
  }
}

// Add this method to the service
declare module '../application/vcf-files.service' {
  interface VcfFilesService {
    getFilesByUploader(uploaderId: string): Promise<any>;
    getStorageStats(uploaderId?: string): Promise<any>;
  }
}

// Implementation in service file
Object.assign(VcfFilesService.prototype, {
  async getFilesByUploader(this: VcfFilesService, uploaderId: string) {
    return (this as any).filesRepository.findByUploader(uploaderId);
  },
  async getStorageStats(this: VcfFilesService, uploaderId?: string) {
    return (this as any).filesRepository.getStorageStats(uploaderId);
  },
});