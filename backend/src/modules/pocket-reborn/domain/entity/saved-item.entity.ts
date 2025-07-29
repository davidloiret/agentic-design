import { Entity, Property, ManyToOne, ManyToMany, Collection as MikroCollection } from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/domain/entity/base.entity';
import { User } from '../../../user/domain/entity/user.entity';
import { Workspace } from './workspace.entity';
import { Collection } from './collection.entity';

export interface FileData {
  base64: string;
  size: number;
  mimeType: string;
  fileName: string;
}

export type FileType = 'webpage' | 'pdf' | 'image' | 'video' | 'audio' | 'note';

@Entity({ tableName: 'saved_items' })
export class SavedItem extends BaseEntity {
  @Property()
  url: string;

  @Property()
  title: string;

  @Property({ type: 'text' })
  excerpt: string;

  @Property({ type: 'json' })
  tags: string[];

  @Property({ default: false })
  favorite: boolean;

  @Property({ default: false })
  read: boolean;

  @Property({ nullable: true })
  color?: string;

  @Property({ default: false })
  pinned: boolean;

  @Property({ default: false })
  hasMarkdown: boolean;

  @Property({ default: false })
  isNote: boolean;

  @Property({ nullable: true })
  fileType?: FileType;

  @Property({ type: 'text', nullable: true })
  content?: string;

  @Property({ nullable: true })
  relevanceScore?: number;

  @Property({ type: 'json', nullable: true })
  fileData?: FileData;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Workspace)
  workspace: Workspace;

  @ManyToMany(() => Collection, collection => collection.savedItems)
  collections = new MikroCollection<Collection>(this);

  constructor(
    url: string,
    title: string,
    excerpt: string,
    user: User,
    workspace: Workspace,
    tags: string[] = [],
  ) {
    super();
    this.url = url;
    this.title = title;
    this.excerpt = excerpt;
    this.user = user;
    this.workspace = workspace;
    this.tags = tags;
    this.favorite = false;
    this.read = false;
    this.pinned = false;
    this.hasMarkdown = false;
    this.isNote = false;
    this.fileType = 'webpage';
  }
}