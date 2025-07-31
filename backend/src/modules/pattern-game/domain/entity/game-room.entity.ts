import { Entity, PrimaryKey, Property, ManyToOne, OneToMany, Collection } from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/domain/entity/base.entity';

export type GameMode = 'pvp' | 'pve';
export type GameStatus = 'waiting' | 'playing' | 'completed' | 'abandoned';
export type GamePhase = 'mulligan' | 'main' | 'combat' | 'end' | 'gameOver';

@Entity({ tableName: 'game_rooms' })
export class GameRoom extends BaseEntity {
  @PrimaryKey()
  declare id: string;

  @Property()
  hostPlayerId!: string;

  @Property({ nullable: true })
  guestPlayerId?: string;

  @Property()
  mode!: GameMode;

  @Property()
  status!: GameStatus;

  @Property()
  phase!: GamePhase;

  @Property()
  currentTurn!: string; // playerId

  @Property()
  turnNumber!: number;

  @Property({ nullable: true })
  turnTimer?: number;

  @Property({ type: 'json' })
  gameState!: any; // Serialized game state

  @Property({ type: 'json', nullable: true })
  gameSettings?: {
    maxTurnTime: number;
    deckSize: number;
    maxHandSize: number;
  };

  @Property({ nullable: true })
  winnerId?: string;

  @Property({ nullable: true })
  winCondition?: string;

  @Property({ type: 'json', nullable: true })
  battleResult?: any;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ nullable: true })
  completedAt?: Date;

  constructor(hostPlayerId: string, mode: GameMode = 'pvp') {
    super();
    this.hostPlayerId = hostPlayerId;
    this.mode = mode;
    this.status = 'waiting';
    this.phase = 'mulligan';
    this.currentTurn = hostPlayerId;
    this.turnNumber = 1;
    this.gameState = {};
  }
}