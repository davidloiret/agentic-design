import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/domain/entity/base.entity';

@Entity({ tableName: 'player_stats' })
export class PlayerStats extends BaseEntity {
  @PrimaryKey()
  declare id: string;

  @Property()
  userId!: string;

  @Property()
  level: number = 1;

  @Property()
  experience: number = 0;

  @Property()
  experienceToNextLevel: number = 100;

  @Property()
  wins: number = 0;

  @Property()
  losses: number = 0;

  @Property()
  draws: number = 0;

  @Property()
  totalGames: number = 0;

  @Property()
  winRate: number = 0;

  @Property()
  currentRank: string = 'Bronze';

  @Property()
  rankPoints: number = 0;

  @Property({ type: 'json' })
  currency: {
    coins: number;
    gems: number;
  } = { coins: 100, gems: 0 };

  @Property({ type: 'json' })
  unlockedPatterns: string[] = [];

  @Property({ type: 'json' })
  achievements: string[] = [];

  @Property({ type: 'json', nullable: true })
  statistics?: {
    totalDamageDealt: number;
    totalHealingDone: number;
    cardsPlayed: number;
    abilitiesUsed: number;
    longestWinStreak: number;
    currentWinStreak: number;
    favoritePattern?: string;
  };

  @Property()
  lastActiveAt: Date = new Date();

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(userId: string) {
    super();
    this.userId = userId;
    this.unlockedPatterns = ['working-memory', 'scratch-pad', 'attention-mechanism'];
    this.statistics = {
      totalDamageDealt: 0,
      totalHealingDone: 0,
      cardsPlayed: 0,
      abilitiesUsed: 0,
      longestWinStreak: 0,
      currentWinStreak: 0
    };
  }

  addExperience(amount: number): { leveledUp: boolean; newLevel: number } {
    this.experience += amount;
    let leveledUp = false;
    let newLevel = this.level;

    while (this.experience >= this.experienceToNextLevel) {
      this.experience -= this.experienceToNextLevel;
      newLevel++;
      leveledUp = true;
      this.experienceToNextLevel = Math.floor(this.experienceToNextLevel * 1.2);
    }

    if (leveledUp) {
      this.level = newLevel;
    }

    return { leveledUp, newLevel };
  }

  recordWin(): void {
    this.wins++;
    this.totalGames++;
    this.statistics!.currentWinStreak++;
    if (this.statistics!.currentWinStreak > this.statistics!.longestWinStreak) {
      this.statistics!.longestWinStreak = this.statistics!.currentWinStreak;
    }
    this.updateWinRate();
  }

  recordLoss(): void {
    this.losses++;
    this.totalGames++;
    this.statistics!.currentWinStreak = 0;
    this.updateWinRate();
  }

  recordDraw(): void {
    this.draws++;
    this.totalGames++;
    this.updateWinRate();
  }

  private updateWinRate(): void {
    this.winRate = this.totalGames > 0 ? (this.wins / this.totalGames) * 100 : 0;
  }
}