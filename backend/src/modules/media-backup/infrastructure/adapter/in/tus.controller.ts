import {
  Controller,
  Post,
  Patch,
  Head,
  Delete,
  Options,
  Req,
  Res,
  UseGuards,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Server, Upload } from '@tus/server';
import { FileStore } from '@tus/file-store';
import { AuthGuard } from '../../../../../modules/auth/infrastructure/guard/auth.guard';
import { MediaBackupService } from '../../../application/usecase/media-backup.service';
import { MediaType } from '../../../domain/enums/media-type.enum';
import * as path from 'path';
import * as fs from 'fs';

@ApiTags('TUS Upload')
@Controller('media-backup/tus')
export class TusController {
  private tusServer: Server;
  private readonly TUS_UPLOAD_DIR = './uploads/tus';

  constructor(private readonly mediaBackupService: MediaBackupService) {
    this.initializeTusServer();
  }

  private initializeTusServer(): void {
    // Ensure upload directory exists
    if (!fs.existsSync(this.TUS_UPLOAD_DIR)) {
      fs.mkdirSync(this.TUS_UPLOAD_DIR, { recursive: true });
    }

    // Create TUS server with file store
    const fileStore = new FileStore({
      directory: this.TUS_UPLOAD_DIR,
    });

    this.tusServer = new Server({
      path: '/api/v1/media-backup/tus',
      datastore: fileStore,
      // Allow up to 100GB files
      maxSize: 100 * 1024 * 1024 * 1024,
      // Generate unique file IDs
      generateUrl: (req, { proto, host, path: urlPath, id }) => {
        return `${proto}://${host}${urlPath}/${id}`;
      },
      // Handle upload completion
      onUploadFinish: async (req, upload) => {
        console.log(`TUS: Upload finished - ${upload.id}, size: ${upload.size}`);

        // Parse metadata (upload.metadata is already a string)
        const metadataStr = typeof upload.metadata === 'string' ? upload.metadata : '';
        const metadata = this.parseMetadata(metadataStr);
        console.log('TUS: Upload metadata:', metadata);

        // Store upload info for finalization
        const infoPath = path.join(this.TUS_UPLOAD_DIR, `${upload.id}.complete`);
        fs.writeFileSync(infoPath, JSON.stringify({
          uploadId: upload.id,
          size: upload.size,
          offset: upload.offset,
          metadata,
          completedAt: new Date().toISOString(),
        }));

        return { status_code: 200 };
      },
      onUploadCreate: async (req, upload) => {
        console.log(`TUS: Upload created - ${upload.id}`);
        return {};
      },
      onIncomingRequest: async (req, uploadId) => {
        // Log incoming requests for debugging
        console.log(`TUS: Incoming ${req.method} request for ${uploadId || 'new upload'}`);
      },
    });

    console.log('TUS Server initialized with directory:', this.TUS_UPLOAD_DIR);
  }

  private parseMetadata(metadataString: string | undefined): Record<string, string> {
    if (!metadataString) return {};

    const metadata: Record<string, string> = {};
    const pairs = metadataString.split(',');

    for (const pair of pairs) {
      const [key, base64Value] = pair.trim().split(' ');
      if (key && base64Value) {
        try {
          metadata[key] = Buffer.from(base64Value, 'base64').toString('utf8');
        } catch {
          metadata[key] = base64Value;
        }
      } else if (key) {
        metadata[key] = '';
      }
    }

    return metadata;
  }

  // TUS Protocol Endpoints

  @Options()
  @ApiOperation({ summary: 'TUS OPTIONS - Get server capabilities' })
  async handleOptions(@Req() req: Request, @Res() res: Response): Promise<void> {
    return this.tusServer.handle(req, res);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'TUS POST - Create new upload' })
  async handlePost(@Req() req: Request, @Res() res: Response): Promise<void> {
    // Add user ID to request for tracking
    const userId = (req as any).user?.id;
    if (userId) {
      // Append user ID to metadata
      const existingMetadata = req.headers['upload-metadata'] as string || '';
      const userIdBase64 = Buffer.from(userId).toString('base64');
      req.headers['upload-metadata'] = existingMetadata
        ? `${existingMetadata},userId ${userIdBase64}`
        : `userId ${userIdBase64}`;
    }

    return this.tusServer.handle(req, res);
  }

  @Head(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'TUS HEAD - Get upload status' })
  async handleHead(@Req() req: Request, @Res() res: Response): Promise<void> {
    return this.tusServer.handle(req, res);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'TUS PATCH - Upload chunk' })
  async handlePatch(@Req() req: Request, @Res() res: Response): Promise<void> {
    return this.tusServer.handle(req, res);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'TUS DELETE - Cancel upload' })
  async handleDelete(@Req() req: Request, @Res() res: Response): Promise<void> {
    return this.tusServer.handle(req, res);
  }

  // Finalization endpoint - called after TUS upload completes
  @Post('finalize')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Finalize TUS upload and create media backup entry' })
  async finalizeTusUpload(
    @Req() req: Request,
    @Body() body: {
      tusFileId: string;
      mediaId?: string;
      userId?: string;
      deviceId?: string;
      originalName?: string;
      fileName?: string;
      mimeType?: string;
      mediaType?: string;
      size?: string;
      width?: string;
      height?: string;
      duration?: string;
      fps?: string;
      checksumMd5?: string;
      checksumSha256?: string;
    },
  ): Promise<any> {
    try {
      const { tusFileId } = body;
      const userId = (req as any).user?.id;

      if (!tusFileId) {
        return {
          success: false,
          error: 'tusFileId is required',
        };
      }

      // Get the uploaded file path
      const uploadedFilePath = path.join(this.TUS_UPLOAD_DIR, tusFileId);
      const completeInfoPath = path.join(this.TUS_UPLOAD_DIR, `${tusFileId}.complete`);

      // Check if file exists
      if (!fs.existsSync(uploadedFilePath)) {
        return {
          success: false,
          error: 'Upload file not found. Upload may not be complete.',
        };
      }

      // Read completion info if available
      let uploadInfo: any = {};
      if (fs.existsSync(completeInfoPath)) {
        uploadInfo = JSON.parse(fs.readFileSync(completeInfoPath, 'utf8'));
      }

      // Merge metadata from body and upload info
      const metadata = {
        ...uploadInfo.metadata,
        ...body,
      };

      // Read file into buffer
      const fileBuffer = fs.readFileSync(uploadedFilePath);
      const fileSize = fileBuffer.length;

      console.log(`TUS Finalize: Processing ${metadata.originalName || tusFileId} (${fileSize} bytes)`);

      // Determine media type from mime type
      let mediaType = MediaType.IMAGE;
      const mimeType = metadata.mimeType || 'application/octet-stream';
      if (mimeType.startsWith('video/')) {
        mediaType = MediaType.VIDEO;
      } else if (mimeType.startsWith('audio/')) {
        mediaType = MediaType.AUDIO;
      } else if (mimeType.startsWith('image/')) {
        mediaType = MediaType.IMAGE;
      }

      // Create media backup entry
      const result = await this.mediaBackupService.backupMedia(
        userId,
        fileBuffer,
        {
          deviceId: metadata.deviceId || userId,
          originalName: metadata.originalName || tusFileId,
          fileName: metadata.fileName || tusFileId,
          mimeType: mimeType,
          mediaType: mediaType,
          size: fileSize,
          width: metadata.width ? parseInt(metadata.width) : undefined,
          height: metadata.height ? parseInt(metadata.height) : undefined,
          duration: metadata.duration ? parseFloat(metadata.duration) : undefined,
          fps: metadata.fps ? parseInt(metadata.fps) : undefined,
          originalCreatedAt: new Date(),
          originalModifiedAt: new Date(),
          checksumMd5: metadata.checksumMd5 || '',
          checksumSha256: metadata.checksumSha256 || '',
        }
      );

      // Clean up TUS upload files after successful processing
      try {
        fs.unlinkSync(uploadedFilePath);
        if (fs.existsSync(completeInfoPath)) {
          fs.unlinkSync(completeInfoPath);
        }
        // Also remove the .json info file created by TUS
        const tusInfoPath = `${uploadedFilePath}.json`;
        if (fs.existsSync(tusInfoPath)) {
          fs.unlinkSync(tusInfoPath);
        }
      } catch (cleanupError) {
        console.warn('Failed to clean up TUS files:', cleanupError);
      }

      return {
        success: true,
        message: 'TUS upload finalized successfully',
        data: {
          mediaId: result.mediaId,
          storageKey: result.storageKey,
          cdnUrl: result.cdnUrl,
          thumbnailUrl: result.thumbnailUrl,
          previewUrl: result.previewUrl,
        },
      };
    } catch (error) {
      console.error('TUS finalization error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Get pending TUS uploads for a user
  @Post('pending')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get pending TUS uploads' })
  async getPendingUploads(@Req() req: Request): Promise<any> {
    try {
      const userId = (req as any).user?.id;
      const pendingUploads: any[] = [];

      // Read all .json files in the TUS directory
      const files = fs.readdirSync(this.TUS_UPLOAD_DIR);

      for (const file of files) {
        if (file.endsWith('.json') && !file.endsWith('.complete.json')) {
          try {
            const infoPath = path.join(this.TUS_UPLOAD_DIR, file);
            const info = JSON.parse(fs.readFileSync(infoPath, 'utf8'));
            const metadata = this.parseMetadata(info.metadata);

            // Only return uploads for this user
            if (metadata.userId === userId) {
              pendingUploads.push({
                id: info.id,
                size: info.size,
                offset: info.offset,
                metadata,
                createdAt: info.creation_date,
              });
            }
          } catch {
            // Skip invalid files
          }
        }
      }

      return {
        success: true,
        uploads: pendingUploads,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
