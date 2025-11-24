import { Entity, Property, ManyToOne, Enum, Index, PrimaryKey } from '@mikro-orm/core';
import { BaseEntity } from '../../../../modules/shared/domain/entity/base.entity';
import { User } from '../../../user/domain/entity/user.entity';
import { MediaStatus } from '../enums/media-status.enum';
import { MediaType } from '../enums/media-type.enum';

@Entity({ tableName: 'media_backups' })
@Index({ name: 'idx_user_id', properties: ['user'] })
@Index({ name: 'idx_device_id', properties: ['deviceId'] })
@Index({ name: 'idx_status', properties: ['status'] })
@Index({ name: 'idx_media_type', properties: ['mediaType'] })
@Index({ name: 'idx_created_at', properties: ['createdAt'] })
export class MediaBackupEntity extends BaseEntity {
  @ManyToOne(() => User, { nullable: false })
  user!: User;

  @Property()
  deviceId!: string;

  @Property()
  originalName!: string;

  @Property()
  fileName!: string;

  @Property()
  mimeType!: string;

  @Enum(() => MediaType)
  mediaType!: MediaType;

  @Property()
  size!: number;

  // Image-specific properties
  @Property({ nullable: true })
  width?: number;

  @Property({ nullable: true })
  height?: number;

  // Video-specific properties
  @Property({ nullable: true })
  duration?: number;

  @Property({ nullable: true })
  fps?: number;

  @Property({ nullable: true })
  bitrate?: number;

  @Property({ nullable: true })
  codec?: string;

  // Audio-specific properties
  @Property({ nullable: true })
  audioCodec?: string;

  @Property({ nullable: true })
  sampleRate?: number;

  @Property({ nullable: true })
  channels?: number;

  // File timestamps
  @Property()
  originalCreatedAt!: Date;

  @Property()
  originalModifiedAt!: Date;

  // Storage information
  @Property()
  storageKey!: string;

  @Property({ default: 'local' })
  storageProvider!: string;

  @Property({ nullable: true })
  cdnUrl?: string;

  @Property({ nullable: true })
  thumbnailUrl?: string;

  @Property({ nullable: true })
  previewUrl?: string;

  // Checksums for integrity
  @Property()
  checksumMd5!: string;

  @Property()
  checksumSha256!: string;

  // EXIF data as JSON
  @Property({ type: 'json', nullable: true })
  exifData?: Record<string, any>;

  // GPS coordinates
  @Property({ nullable: true })
  gpsLatitude?: number;

  @Property({ nullable: true })
  gpsLongitude?: number;

  @Property({ nullable: true })
  altitude?: number;

  // Status tracking
  @Enum(() => MediaStatus)
  status: MediaStatus = MediaStatus.PENDING;

  @Property({ nullable: true })
  errorMessage?: string;

  @Property({ nullable: true })
  processingStartedAt?: Date;

  @Property({ nullable: true })
  processingCompletedAt?: Date;

  // Device deletion tracking
  @Property({ default: false })
  deletedFromDevice!: boolean;

  @Property({ nullable: true })
  deletedFromDeviceAt?: Date;

  // Privacy and access control
  @Property({ default: false })
  isPublic!: boolean;

  @Property({ nullable: true })
  sharedWith?: string[]; // Array of user IDs

  // Additional metadata
  @Property({ type: 'json', nullable: true })
  metadata?: Record<string, any>;

  // Organization
  @Property({ nullable: true })
  albumId?: string;

  @Property({ nullable: true })
  tags?: string[];
}