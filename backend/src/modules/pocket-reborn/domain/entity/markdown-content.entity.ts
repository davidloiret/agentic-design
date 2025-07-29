import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/domain/entity/base.entity';
import { SavedItem } from './saved-item.entity';

@Entity({ tableName: 'markdown_contents' })
export class MarkdownContent extends BaseEntity {
  @Property()
  title: string;

  @Property()
  url: string;

  @Property({ type: 'text' })
  markdown: string;

  @ManyToOne(() => SavedItem)
  savedItem: SavedItem;

  constructor(
    title: string,
    url: string,
    markdown: string,
    savedItem: SavedItem,
  ) {
    super();
    this.title = title;
    this.url = url;
    this.markdown = markdown;
    this.savedItem = savedItem;
  }
}