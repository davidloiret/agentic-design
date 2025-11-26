import { IsNotEmpty, IsString, IsOptional, IsEnum, IsNumber, IsBoolean, IsObject } from 'class-validator';
import { Transform } from 'class-transformer';
import { MediaType } from '../../domain/enums/media-type.enum';
import { ExifData } from '../../domain/types/media.types';

// Helper function to transform string to number
const toNumber = (value: any): number | undefined => {
  if (value === undefined || value === null || value === '') return undefined;
  const num = Number(value);
  return isNaN(num) ? undefined : num;
};

// Helper function to transform string to boolean
const toBoolean = (value: any): boolean => {
  if (value === true || value === 'true' || value === '1') return true;
  return false;
};

// Helper function to parse JSON string
const parseJson = (value: any): any => {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
  return value;
};

export class CreateMediaBackupDto {
  @IsString()
  @IsOptional() // Made optional - will be set from req.user.id if not provided
  deviceId?: string;

  @IsString()
  @IsNotEmpty()
  originalName: string;

  @IsString()
  @IsOptional() // Made optional - server can generate this
  fileName?: string;

  @IsString()
  @IsNotEmpty()
  mimeType: string;

  @IsEnum(MediaType)
  @IsOptional() // Made optional - can be inferred from mimeType
  mediaType?: MediaType;

  @Transform(({ value }) => toNumber(value))
  @IsNumber()
  size: number;

  // Image-specific
  @Transform(({ value }) => toNumber(value))
  @IsOptional()
  @IsNumber()
  width?: number;

  @Transform(({ value }) => toNumber(value))
  @IsOptional()
  @IsNumber()
  height?: number;

  // Video-specific
  @Transform(({ value }) => toNumber(value))
  @IsOptional()
  @IsNumber()
  duration?: number;

  @Transform(({ value }) => toNumber(value))
  @IsOptional()
  @IsNumber()
  fps?: number;

  @Transform(({ value }) => toNumber(value))
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

  @Transform(({ value }) => toNumber(value))
  @IsOptional()
  @IsNumber()
  sampleRate?: number;

  @Transform(({ value }) => toNumber(value))
  @IsOptional()
  @IsNumber()
  channels?: number;

  // Timestamps
  @Transform(({ value }) => value ? new Date(value) : new Date())
  @IsOptional()
  originalCreatedAt?: Date;

  @Transform(({ value }) => value ? new Date(value) : new Date())
  @IsOptional()
  originalModifiedAt?: Date;

  // Checksums
  @IsString()
  @IsOptional() // Made optional - server can calculate if not provided
  checksumMd5?: string;

  @IsString()
  @IsOptional() // Made optional - server can calculate if not provided
  checksumSha256?: string;

  // EXIF data
  @Transform(({ value }) => parseJson(value))
  @IsOptional()
  @IsObject()
  exifData?: ExifData;

  // GPS data
  @Transform(({ value }) => toNumber(value))
  @IsOptional()
  @IsNumber()
  gpsLatitude?: number;

  @Transform(({ value }) => toNumber(value))
  @IsOptional()
  @IsNumber()
  gpsLongitude?: number;

  @Transform(({ value }) => toNumber(value))
  @IsOptional()
  @IsNumber()
  altitude?: number;

  // Device deletion
  @Transform(({ value }) => toBoolean(value))
  @IsBoolean()
  @IsOptional()
  shouldDeleteOriginal?: boolean = false;

  // Organization
  @IsOptional()
  @IsString()
  albumId?: string;

  @Transform(({ value }) => parseJson(value))
  @IsOptional()
  tags?: string[];

  // Additional metadata (can be sent as JSON string from client)
  @Transform(({ value }) => parseJson(value))
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}