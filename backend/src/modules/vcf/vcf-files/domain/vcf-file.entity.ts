import { Entity, Property, Enum, ManyToOne, Index } from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/domain/entity/base.entity';
import { User } from '../../../user/domain/entity/user.entity';

export enum VcfFileType {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  DOCUMENT = 'document',
  CODE = 'code',
  LOG = 'log',
  ARCHIVE = 'archive',
  OTHER = 'other',
}

export enum VcfFileStatus {
  PENDING = 'pending',
  UPLOADED = 'uploaded',
  PROCESSING = 'processing',
  READY = 'ready',
  FAILED = 'failed',
  DELETED = 'deleted',
}

export enum VcfFileAccessLevel {
  PUBLIC = 'public',
  PRIVATE = 'private',
  RESTRICTED = 'restricted',
}

@Entity({ tableName: 'vcf_files' })
@Index({ properties: ['uploader', 'status'] })
@Index({ properties: ['entityType', 'entityId'] })
export class VcfFileEntity extends BaseEntity {
  @ManyToOne(() => User, { nullable: false })
  uploader!: User;

  @Property()
  filename!: string;

  @Property()
  originalFilename!: string;

  @Property()
  mimeType!: string;

  @Enum(() => VcfFileType)
  fileType!: VcfFileType;

  @Property()
  size!: number; // bytes

  @Property()
  storageKey!: string; // S3 key or local path

  @Property()
  storageProvider: string = 'local'; // local, s3, gcs, azure

  @Property({ nullable: true })
  cdnUrl?: string;

  @Property({ nullable: true })
  thumbnailUrl?: string;

  @Enum(() => VcfFileStatus)
  status: VcfFileStatus = VcfFileStatus.PENDING;

  @Enum(() => VcfFileAccessLevel)
  accessLevel: VcfFileAccessLevel = VcfFileAccessLevel.PRIVATE;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @Property({ type: 'array' })
  tags: string[] = [];

  @Property({ type: 'json' })
  metadata: {
    width?: number;
    height?: number;
    duration?: number;
    pageCount?: number;
    encoding?: string;
    language?: string;
    lineCount?: number;
    [key: string]: any;
  } = {};

  @Property()
  entityType!: string; // hotline_session, help_request, panic_alert, etc.

  @Property()
  entityId!: string; // ID of the related entity

  @Property({ nullable: true })
  checksumMd5?: string;

  @Property({ nullable: true })
  checksumSha256?: string;

  @Property()
  isVirusScanPending: boolean = true;

  @Property()
  isVirusScanClean?: boolean;

  @Property({ nullable: true })
  virusScanResult?: string;

  @Property({ nullable: true })
  virusScanDate?: Date;

  @Property({ nullable: true })
  uploadedAt?: Date;

  @Property({ nullable: true })
  processedAt?: Date;

  @Property({ nullable: true })
  deletedAt?: Date;

  @Property({ nullable: true })
  expiresAt?: Date;

  @Property()
  downloadCount: number = 0;

  @Property({ nullable: true })
  lastDownloadedAt?: Date;

  @Property({ type: 'array' })
  allowedUserIds: string[] = [];

  @Property({ type: 'array' })
  allowedRoles: string[] = [];

  @Property({ nullable: true })
  signedUrlExpiresAt?: Date;

  @Property({ type: 'json', nullable: true })
  processingErrors?: Record<string, any>;
}