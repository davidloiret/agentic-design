import { Entity, Property, ManyToOne, OneToMany, Collection } from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/domain/entity/base.entity';
import { Workshop } from './workshop.entity';
import { WorkshopEnrollment } from './workshop-enrollment.entity';

@Entity()
export class WorkshopTeam extends BaseEntity {
  @ManyToOne(() => Workshop)
  workshop: Workshop;

  @Property()
  name: string;

  @Property({ nullable: true })
  motto?: string;

  @Property()
  color: string;

  @Property({ nullable: true })
  avatarUrl?: string;

  @OneToMany(() => WorkshopEnrollment, enrollment => enrollment.team)
  members = new Collection<WorkshopEnrollment>(this);

  @Property({ type: 'json' })
  stats: {
    totalPoints: number;
    totalXp: number;
    challengesWon: number;
    activitiesCompleted: number;
    averageScore: number;
    rank?: number;
  };

  @Property({ type: 'json' })
  achievements: Array<{
    achievementId: string;
    unlockedAt: Date;
    description: string;
  }>;

  @Property({ type: 'json' })
  battleHistory: Array<{
    opponentTeamId: string;
    opponentTeamName: string;
    battleType: string;
    ourScore: number;
    theirScore: number;
    winner: string;
    date: Date;
    bonusPoints: number;
  }>;

  @Property()
  createdAt: Date;

  constructor(workshop: Workshop, name: string, color: string) {
    super();
    this.workshop = workshop;
    this.name = name;
    this.color = color;
    this.createdAt = new Date();
    this.stats = {
      totalPoints: 0,
      totalXp: 0,
      challengesWon: 0,
      activitiesCompleted: 0,
      averageScore: 0
    };
    this.achievements = [];
    this.battleHistory = [];
  }

  addPoints(points: number, xp: number): void {
    this.stats.totalPoints += points;
    this.stats.totalXp += xp;
    this.updateAverageScore();
  }

  recordBattle(
    opponentTeamId: string,
    opponentTeamName: string,
    battleType: string,
    ourScore: number,
    theirScore: number,
    bonusPoints: number
  ): void {
    const winner = ourScore > theirScore ? this.id : opponentTeamId;
    this.battleHistory.push({
      opponentTeamId,
      opponentTeamName,
      battleType,
      ourScore,
      theirScore,
      winner,
      date: new Date(),
      bonusPoints
    });

    if (winner === this.id) {
      this.stats.challengesWon++;
      this.addPoints(bonusPoints, bonusPoints * 2);
    }
  }

  unlockAchievement(achievementId: string, description: string): void {
    if (!this.achievements.find(a => a.achievementId === achievementId)) {
      this.achievements.push({
        achievementId,
        unlockedAt: new Date(),
        description
      });
    }
  }

  private updateAverageScore(): void {
    if (this.members.count() > 0) {
      const totalScore = this.members
        .getItems()
        .reduce((sum, member) => sum + member.progress.totalPoints, 0);
      this.stats.averageScore = totalScore / this.members.count();
    }
  }

  get memberCount(): number {
    return this.members.count();
  }

  get winRate(): number {
    if (this.battleHistory.length === 0) return 0;
    const wins = this.battleHistory.filter(b => b.winner === this.id).length;
    return (wins / this.battleHistory.length) * 100;
  }
}