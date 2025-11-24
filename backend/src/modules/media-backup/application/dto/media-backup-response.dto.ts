import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MediaStatus } from '../../domain/enums/media-status.enum';
import { MediaType } from '../../domain/enums/media-type.enum';

export class MediaBackupResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  deviceId: string;

  @ApiProperty()
  originalName: string;

  @ApiProperty()
  fileName: string;

  @ApiProperty()
  mimeType: string;

  @ApiProperty({ enum: MediaType })
  mediaType: MediaType;

  @ApiProperty()
  size: number;

  @ApiPropertyOptional()
  width?: number;

  @ApiPropertyOptional()
  height?: number;

  @ApiPropertyOptional()
  duration?: number;

  @ApiPropertyOptional()
  fps?: number;

  @ApiPropertyOptional()
  bitrate?: number;

  @ApiPropertyOptional()
  codec?: string;

  @ApiPropertyOptional()
  audioCodec?: number;

  @ApiPropertyOptional()
  sampleRate?: number;

  @ApiPropertyOptional()
  channels?: number;

  @ApiProperty()
  originalCreatedAt: Date;

  @ApiProperty()
  originalModifiedAt: Date;

  @ApiProperty()
  storageKey: string;

  @ApiProperty()
  storageProvider: string;

  @ApiPropertyOptional()
  cdnUrl?: string;

  @ApiPropertyOptional()
  thumbnailUrl?: string;

  @ApiPropertyOptional()
  previewUrl?: string;

  @ApiProperty()
  checksumMd5: string;

  @ApiProperty()
  checksumSha256: string;

  @ApiPropertyOptional()
  exifData?: Record<string, any>;

  @ApiPropertyOptional()
  gpsLatitude?: number;

  @ApiPropertyOptional()
  gpsLongitude?: number;

  @ApiPropertyOptional()
  altitude?: number;

  @ApiProperty({ enum: MediaStatus })
  status: MediaStatus;

  @ApiPropertyOptional()
  errorMessage?: string;

  @ApiPropertyOptional()
  processingStartedAt?: Date;

  @ApiPropertyOptional()
  processingCompletedAt?: Date;

  @ApiProperty()
  deletedFromDevice: boolean;

  @ApiPropertyOptional()
  deletedFromDeviceAt?: Date;

  @ApiProperty()
  isPublic: boolean;

  @ApiPropertyOptional()
  sharedWith?: string[];

  @ApiPropertyOptional()
  albumId?: string;

  @ApiPropertyOptional()
  tags?: string[];

  @ApiPropertyOptional()
  metadata?: Record<string, any>;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}