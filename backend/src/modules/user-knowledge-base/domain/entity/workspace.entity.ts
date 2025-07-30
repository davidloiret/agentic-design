import { Entity, Property, OneToMany, Collection as MikroCollection, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/domain/entity/base.entity';
import { User } from '../../../user/domain/entity/user.entity';
import { Collection } from './collection.entity';
import { KnowledgeBaseItem } from './knowledge-base-item.entity';

@Entity({ tableName: 'workspaces' })
export class Workspace extends BaseEntity {
  @Property()
  name: string;

  @Property()
  color: string;

  @Property({ nullable: true })
  icon?: string;

  @Property({ nullable: true })
  description?: string;

  @Property({ default: true })
  isExpanded: boolean;

  @ManyToOne(() => User)
  user: User;

  @OneToMany(() => Collection, collection => collection.workspace)
  collections = new MikroCollection<Collection>(this);

  @OneToMany(() => KnowledgeBaseItem, knowledgeBaseItem => knowledgeBaseItem.workspace)
  knowledgeBaseItems = new MikroCollection<KnowledgeBaseItem>(this);

  constructor(
    name: string,
    color: string,
    user: User,
    icon?: string,
    description?: string,
  ) {
    super();
    this.name = name;
    this.color = color;
    this.user = user;
    this.icon = icon;
    this.description = description;
    this.isExpanded = true;
  }
}