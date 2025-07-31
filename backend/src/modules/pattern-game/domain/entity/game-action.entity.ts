import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/domain/entity/base.entity';
import { GameRoom } from './game-room.entity';

export type ActionType = 'play_card' | 'attack' | 'use_ability' | 'end_turn' | 'surrender' | 'join_game' | 'leave_game';

@Entity({ tableName: 'game_actions' })
export class GameAction extends BaseEntity {
  @PrimaryKey()
  declare id: string;

  @ManyToOne(() => GameRoom)
  gameRoom!: GameRoom;

  @Property()
  playerId!: string;

  @Property()
  actionType!: ActionType;

  @Property({ type: 'json' })
  actionData!: {
    cardId?: string;
    targetId?: string;
    fromPosition?: number;
    toPosition?: number;
    abilityIndex?: number;
    [key: string]: any;
  };

  @Property()
  turnNumber!: number;

  @Property()
  actionSequence!: number; // Order within the turn

  @Property()
  timestamp: Date = new Date();

  @Property({ type: 'json', nullable: true })
  result?: {
    success: boolean;
    error?: string;
    effects?: any[];
  };

  constructor(
    gameRoom: GameRoom,
    playerId: string,
    actionType: ActionType,
    actionData: any,
    turnNumber: number,
    actionSequence: number
  ) {
    super();
    this.gameRoom = gameRoom;
    this.playerId = playerId;
    this.actionType = actionType;
    this.actionData = actionData;
    this.turnNumber = turnNumber;
    this.actionSequence = actionSequence;
  }
}