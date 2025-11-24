import { IsNotEmpty, IsString, IsOptional, IsEnum, IsNumber, IsBoolean, IsObject } from 'class-validator';
import { MediaType } from '../../domain/enums/media-type.enum';
import { ExifData } from '../../domain/types/media.types';

export class CreateMediaBackupDto {
  @IsString()
  @IsNotEmpty()
  deviceId: string;

  @IsString()
  @IsNotEmpty()
  originalName: string;

  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsString()
  @IsNotEmpty()
  mimeType: string;

  @IsEnum(MediaType)
  mediaType: MediaType;

  @IsNumber()
  size: number;

  // Image-specific
  @IsOptional()
  @IsNumber()
  width?: number;

  @IsOptional()
  @IsNumber()
  height?: number;

  // Video-specific
  @IsOptional()
  @IsNumber()
  duration?: number;

  @IsOptional()
  @IsNumber()
  fps?: number;

  @IsOptional()
  @IsNumber()
  bitrate?: number;

  @IsOptional()
  @IsString()
  codec?: string;

  // Audio-specific
  @IsOptional()
  @IsString()
  audioCodec?: string;

  @IsOptional()
  @IsNumber()
  sampleRate?: number;

  @IsOptional()
  @IsNumber()
  channels?: number;

  // Timestamps
  @IsNotEmpty()
  originalCreatedAt: Date;

  @IsNotEmpty()
  originalModifiedAt: Date;

  // Checksums
  @IsString()
  @IsNotEmpty()
  checksumMd5: string;

  @IsString()
  @IsNotEmpty()
  checksumSha256: string;

  // EXIF data
  @IsOptional()
  @IsObject()
  exifData?: ExifData;

  // GPS data
  @IsOptional()
  @IsNumber()
  gpsLatitude?: number;

  @IsOptional()
  @IsNumber()
  gpsLongitude?: number;

  @IsOptional()
  @IsNumber()
  altitude?: number;

  // Device deletion
  @IsBoolean()
  @IsOptional()
  shouldDeleteOriginal?: boolean = false;

  // Organization
  @IsOptional()
  @IsString()
  albumId?: string;

  @IsOptional()
  tags?: string[];

  // Additional metadata
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}