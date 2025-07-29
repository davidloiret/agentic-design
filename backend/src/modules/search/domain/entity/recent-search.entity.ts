import { Entity, Property, ManyToOne } from "@mikro-orm/core";
import { BaseEntity } from "../../../shared/domain/entity/base.entity";
import { User } from "../../../user/domain/entity/user.entity";

@Entity()
export class RecentSearch extends BaseEntity {
  @Property({
    type: 'varchar',
    length: 255,
  })
  public query: string;

  @Property({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  public category?: string;

  @Property({
    type: 'jsonb',
    nullable: true,
  })
  public filters?: Record<string, any>;

  @Property({
    type: 'varchar',
    length: 50,
    default: 'manual',
  })
  public searchType: string; // 'manual', 'suggestion', 'quick'

  @Property({
    type: 'int',
    default: 1,
  })
  public frequency: number;

  @Property({
    onCreate: () => new Date(),
    nullable: true,
    type: 'timestamptz',
  })
  public lastSearchedAt: Date;

  @ManyToOne(() => User, { 
    eager: false,
    nullable: true,
  })
  public user?: User;

  constructor(
    query: string,
    user?: User,
    category?: string,
    filters?: Record<string, any>,
    searchType: string = 'manual'
  ) {
    super();
    this.query = query;
    this.user = user;
    this.category = category;
    this.filters = filters;
    this.searchType = searchType;
    this.frequency = 1;
    this.lastSearchedAt = new Date();
  }

  public getUserId(): string | undefined {
    return this.user?.id;
  }

  public incrementFrequency(): void {
    this.frequency += 1;
    this.lastSearchedAt = new Date();
  }

  public updateLastSearched(): void {
    this.lastSearchedAt = new Date();
  }

  public isRecentlySearched(hoursThreshold: number = 24): boolean {
    const threshold = new Date();
    threshold.setHours(threshold.getHours() - hoursThreshold);
    return this.lastSearchedAt > threshold;
  }
}