import { Entity, Property, ManyToOne, ManyToMany, Collection as MikroCollection, Enum } from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/domain/entity/base.entity';
import { User } from '../../../user/domain/entity/user.entity';
import { Workspace } from './workspace.entity';
import { Collection } from './collection.entity';

export enum KnowledgeBaseItemType {
  NOTE = 'note',
  SOURCE = 'source',
  PDF = 'pdf',
}

export interface ContentChange {
  timestamp: Date; // UTC timestamp
  rawDiff?: string; // Diff of raw content
  markdownDiff?: string; // Diff of markdown content
  changeType: 'content_updated' | 'link_changed' | 'manual_edit';
  changeSize: number; // Number of characters changed
  checksum?: string; // Hash of the content for integrity
}

@Entity({ tableName: 'knowledge_base_items' })
export class KnowledgeBaseItem extends BaseEntity {
  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Workspace)
  workspace: Workspace;

  @ManyToMany(() => Collection)
  collections = new MikroCollection<Collection>(this);

  @Enum(() => KnowledgeBaseItemType)
  type: KnowledgeBaseItemType;

  @Property()
  title: string;

  @Property({ type: 'text', nullable: true })
  content?: string;

  @Property({ type: 'text', nullable: true })
  rawContent?: string;

  @Property({ type: 'text', nullable: true })
  markdownContent?: string;

  @Property({ nullable: true })
  url?: string;

  @Property({ nullable: true })
  filePath?: string;

  // Link monitoring properties
  @Property({ default: false })
  shouldFollow: boolean;

  @Property({ nullable: true })
  lastCheckedAt?: Date;

  @Property({ nullable: true })
  lastChangedAt?: Date;

  @Property({ default: false })
  hasUnreadChanges: boolean;

  @Property({ type: 'json', nullable: true })
  changeHistory?: ContentChange[];

  @Property({ type: 'json', nullable: true })
  metadata?: Record<string, any>;

  @Property({ type: 'simple-array', nullable: true })
  tags?: string[];

  @Property({ default: false })
  isFavorite: boolean;

  @Property({ default: false })
  isRead: boolean;

  @Property({ nullable: true })
  readAt?: Date;

  @Property({ nullable: true })
  lastAccessedAt?: Date;

  constructor(
    user: User,
    workspace: Workspace,
    collections: Collection[] = [],
    type: KnowledgeBaseItemType,
    title: string,
    content?: string,
    url?: string,
    filePath?: string,
    rawContent?: string,
    markdownContent?: string,
    metadata?: Record<string, any>,
    tags?: string[],
    shouldFollow?: boolean,
  ) {
    super();
    this.user = user;
    this.workspace = workspace;
    this.collections.set(collections);
    this.type = type;
    this.title = title;
    this.content = content;
    this.rawContent = rawContent;
    this.markdownContent = markdownContent;
    this.url = url;
    this.filePath = filePath;
    this.metadata = metadata;
    this.tags = tags;
    this.shouldFollow = shouldFollow || false;
    this.isFavorite = false;
    this.isRead = false;
    this.hasUnreadChanges = false;
    this.changeHistory = [];
    this.lastAccessedAt = new Date();
  }

  markAsFavorite(): void {
    this.isFavorite = true;
  }

  unmarkAsFavorite(): void {
    this.isFavorite = false;
  }

  markAsRead(): void {
    this.isRead = true;
    this.readAt = new Date();
    this.updateLastAccessed();
  }

  markAsUnread(): void {
    this.isRead = false;
    this.readAt = undefined;
  }

  updateLastAccessed(): void {
    this.lastAccessedAt = new Date();
  }

  addTag(tag: string): void {
    if (!this.tags) {
      this.tags = [];
    }
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
    }
  }

  removeTag(tag: string): void {
    if (this.tags) {
      this.tags = this.tags.filter(t => t !== tag);
    }
  }

  updateContent(content: string): void {
    this.content = content;
    this.updateLastAccessed();
  }

  // Link monitoring methods
  enableFollowing(): void {
    this.shouldFollow = true;
  }

  disableFollowing(): void {
    this.shouldFollow = false;
  }

  updateLastChecked(): void {
    this.lastCheckedAt = new Date();
  }

  // Content change tracking methods
  addContentChange(
    rawDiff?: string,
    markdownDiff?: string,
    changeType: 'content_updated' | 'link_changed' | 'manual_edit' = 'content_updated',
    checksum?: string,
  ): void {
    if (!this.changeHistory) {
      this.changeHistory = [];
    }

    const changeSize = (rawDiff?.length || 0) + (markdownDiff?.length || 0);
    
    const change: ContentChange = {
      timestamp: new Date(), // UTC timestamp
      rawDiff,
      markdownDiff,
      changeType,
      changeSize,
      checksum,
    };

    this.changeHistory.push(change);
    this.lastChangedAt = new Date();
    this.hasUnreadChanges = true;
  }

  updateRawContent(newRawContent: string, rawDiff?: string, checksum?: string): void {
    this.rawContent = newRawContent;
    this.addContentChange(rawDiff, undefined, 'content_updated', checksum);
  }

  updateMarkdownContent(newMarkdownContent: string, markdownDiff?: string, checksum?: string): void {
    this.markdownContent = newMarkdownContent;
    this.addContentChange(undefined, markdownDiff, 'content_updated', checksum);
  }

  updateBothContents(
    newRawContent: string,
    newMarkdownContent: string,
    rawDiff?: string,
    markdownDiff?: string,
    checksum?: string,
  ): void {
    this.rawContent = newRawContent;
    this.markdownContent = newMarkdownContent;
    this.addContentChange(rawDiff, markdownDiff, 'content_updated', checksum);
  }

  markChangesAsRead(): void {
    this.hasUnreadChanges = false;
  }

  getLatestChange(): ContentChange | undefined {
    if (!this.changeHistory || this.changeHistory.length === 0) {
      return undefined;
    }
    return this.changeHistory[this.changeHistory.length - 1];
  }

  getChangesSince(since: Date): ContentChange[] {
    if (!this.changeHistory) {
      return [];
    }
    return this.changeHistory.filter(change => change.timestamp > since);
  }

  hasChangedSince(since: Date): boolean {
    return this.getChangesSince(since).length > 0;
  }
}