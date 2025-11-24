import { MediaStatus } from '../enums/media-status.enum';
import { MediaType } from '../enums/media-type.enum';

export interface MediaMetadata {
  fileName: string;
  originalName: string;
  mimeType: string;
  size: number;
  mediaType: MediaType;

  // Image-specific metadata
  width?: number;
  height?: number;

  // Video-specific metadata
  duration?: number;
  fps?: number;
  bitrate?: number;
  codec?: string;

  // Audio-specific metadata
  audioCodec?: string;
  sampleRate?: number;
  channels?: number;

  // Common metadata
  createdAt: Date;
  modifiedAt: Date;
  originalCreatedAt: Date;
  originalModifiedAt: Date;
  exifData?: ExifData;
  checksum: {
    md5: string;
    sha256: string;
  };
}

export interface ExifData {
  dateTimeOriginal?: Date;
  dateTimeDigitized?: Date;
  gpsLatitude?: number;
  gpsLongitude?: number;
  altitude?: number;
  cameraMake?: string;
  cameraModel?: string;
  lensModel?: string;
  focalLength?: number;
  iso?: number;
  aperture?: number;
  shutterSpeed?: string;
  flash?: boolean;
  orientation?: number;
  software?: string;

  // Video-specific EXIF/metadata
  videoDuration?: number;
  videoFrameRate?: number;
  videoBitrate?: number;
}

export interface MediaBackupRequest {
  mediaMetadata: MediaMetadata;
  mediaData: Buffer;
  userId: string;
  deviceId: string;
  shouldDeleteOriginal: boolean;
}

export interface MediaBackupResult {
  success: boolean;
  mediaId?: string;
  storageKey?: string;
  cdnUrl?: string;
  thumbnailUrl?: string;
  previewUrl?: string; // For videos
  error?: string;
  deletedFromDevice?: boolean;
}

export interface MediaProcessingOptions {
  generateThumbnails: boolean;
  generatePreviews: boolean; // For videos
  preserveOriginal: boolean;
  compressionLevel?: number;
  maxResolution?: {
    width: number;
    height: number;
  };
}