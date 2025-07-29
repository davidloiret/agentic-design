import { Entity, Property, ManyToOne, OneToMany, Collection as MikroCollection } from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/domain/entity/base.entity';
import { Workspace } from './workspace.entity';
import { SavedItem } from './saved-item.entity';

export interface CollectionRule {
  type: 'tag' | 'domain' | 'title' | 'content' | 'date';
  operator: 'contains' | 'equals' | 'startsWith' | 'endsWith' | 'before' | 'after';
  value: string;
}

@Entity({ tableName: 'collections' })
export class Collection extends BaseEntity {
  @Property()
  name: string;

  @Property()
  color: string;

  @Property({ nullable: true })
  icon?: string;

  @Property({ nullable: true })
  description?: string;

  @Property({ default: false })
  isSmartCollection: boolean;

  @Property({ type: 'json', nullable: true })
  smartRules?: CollectionRule[];

  @Property({ nullable: true })
  parentId?: string;

  @Property({ default: 0 })
  order: number;

  @Property({ default: true })
  isExpanded: boolean;

  @ManyToOne(() => Workspace)
  workspace: Workspace;

  @OneToMany(() => SavedItem, savedItem => savedItem.collections)
  savedItems = new MikroCollection<SavedItem>(this);

  constructor(
    name: string,
    color: string,
    workspace: Workspace,
    order: number = 0,
    icon?: string,
    description?: string,
  ) {
    super();
    this.name = name;
    this.color = color;
    this.workspace = workspace;
    this.order = order;
    this.icon = icon;
    this.description = description;
    this.isSmartCollection = false;
    this.isExpanded = true;
  }
}