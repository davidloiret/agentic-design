import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { GameRoom, GameStatus } from '../../domain/entity/game-room.entity';
import { GameAction, ActionType } from '../../domain/entity/game-action.entity';
import { PlayerStats } from '../../domain/entity/player-stats.entity';
import { GameRoomRepositoryInterface } from '../../domain/repository/game-room-repository.interface';
import { PlayerStatsRepositoryInterface } from '../../domain/repository/player-stats-repository.interface';
import { CreateGameRoomDto } from '../dto/create-game-room.dto';
import { GameActionDto } from '../dto/game-action.dto';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class MultiplayerGameService {
  constructor(
    @Inject('GameRoomRepositoryInterface')
    private readonly gameRoomRepository: GameRoomRepositoryInterface,
    @Inject('PlayerStatsRepositoryInterface')
    private readonly playerStatsRepository: PlayerStatsRepositoryInterface,
  ) {}

  async createGameRoom(hostPlayerId: string, createGameRoomDto: CreateGameRoomDto): Promise<GameRoom> {
    // Check if player already has an active game
    const activeGames = await this.gameRoomRepository.findActiveGamesByPlayerId(hostPlayerId);
    if (activeGames.length > 0) {
      throw new BadRequestException('Player already has an active game');
    }

    const gameRoom = new GameRoom(hostPlayerId, createGameRoomDto.mode);
    gameRoom.id = uuidv7();
    
    if (createGameRoomDto.gameSettings) {
      gameRoom.gameSettings = createGameRoomDto.gameSettings;
    } else {
      gameRoom.gameSettings = {
        maxTurnTime: 120, // 2 minutes
        deckSize: 30,
        maxHandSize: 7
      };
    }

    // Initialize empty game state
    gameRoom.gameState = this.initializeGameState(hostPlayerId);

    return await this.gameRoomRepository.create(gameRoom);
  }

  async joinGameRoom(gameRoomId: string, guestPlayerId: string): Promise<GameRoom> {
    const gameRoom = await this.gameRoomRepository.findById(gameRoomId);
    if (!gameRoom) {
      throw new NotFoundException('Game room not found');
    }

    if (gameRoom.status !== 'waiting') {
      throw new BadRequestException('Game room is not available for joining');
    }

    if (gameRoom.hostPlayerId === guestPlayerId) {
      throw new BadRequestException('Cannot join your own game');
    }

    if (gameRoom.guestPlayerId) {
      throw new BadRequestException('Game room is already full');
    }

    // Check if guest player already has an active game
    const activeGames = await this.gameRoomRepository.findActiveGamesByPlayerId(guestPlayerId);
    if (activeGames.length > 0) {
      throw new BadRequestException('Player already has an active game');
    }

    gameRoom.guestPlayerId = guestPlayerId;
    gameRoom.status = 'playing';
    
    // Update game state to include both players
    gameRoom.gameState = this.initializeMultiplayerGameState(
      gameRoom.hostPlayerId,
      guestPlayerId
    );

    return await this.gameRoomRepository.save(gameRoom);
  }

  async executeGameAction(
    gameRoomId: string,
    playerId: string,
    gameActionDto: GameActionDto
  ): Promise<{ success: boolean; gameState?: any; error?: string }> {
    const gameRoom = await this.gameRoomRepository.findById(gameRoomId);
    if (!gameRoom) {
      throw new NotFoundException('Game room not found');
    }

    if (gameRoom.status !== 'playing') {
      throw new BadRequestException('Game is not in playing state');
    }

    if (gameRoom.currentTurn !== playerId) {
      throw new BadRequestException('Not your turn');
    }

    // Validate and execute action
    const actionResult = this.processGameAction(gameRoom, playerId, gameActionDto);
    
    if (actionResult.success) {
      gameRoom.gameState = actionResult.gameState;
      
      // Check for game end conditions
      const gameResult = this.checkGameEndConditions(gameRoom);
      if (gameResult.gameEnded) {
        gameRoom.status = 'completed';
        gameRoom.winnerId = gameResult.winnerId;
        gameRoom.winCondition = gameResult.winCondition;
        gameRoom.completedAt = new Date();
        
        // Update player stats
        await this.updatePlayerStats(gameRoom, gameResult);
      }

      await this.gameRoomRepository.save(gameRoom);
    }

    return actionResult;
  }

  async findAvailableRooms(): Promise<GameRoom[]> {
    return await this.gameRoomRepository.findWaitingRooms();
  }

  async getPlayerActiveGames(playerId: string): Promise<GameRoom[]> {
    return await this.gameRoomRepository.findActiveGamesByPlayerId(playerId);
  }

  async getPlayerStats(userId: string): Promise<PlayerStats> {
    return await this.playerStatsRepository.findOrCreateByUserId(userId);
  }

  async leaveGame(gameRoomId: string, playerId: string): Promise<void> {
    const gameRoom = await this.gameRoomRepository.findById(gameRoomId);
    if (!gameRoom) {
      throw new NotFoundException('Game room not found');
    }

    if (gameRoom.hostPlayerId !== playerId && gameRoom.guestPlayerId !== playerId) {
      throw new BadRequestException('Player is not in this game');
    }

    if (gameRoom.status === 'playing') {
      // Player forfeits the game
      const winnerId = gameRoom.hostPlayerId === playerId ? gameRoom.guestPlayerId : gameRoom.hostPlayerId;
      gameRoom.status = 'completed';
      gameRoom.winnerId = winnerId;
      gameRoom.winCondition = 'forfeit';
      gameRoom.completedAt = new Date();
      
      await this.updatePlayerStats(gameRoom, {
        gameEnded: true,
        winnerId,
        winCondition: 'forfeit'
      });
    } else {
      gameRoom.status = 'abandoned';
    }

    await this.gameRoomRepository.save(gameRoom);
  }

  private initializeGameState(hostPlayerId: string): any {
    return {
      players: {
        [hostPlayerId]: {
          id: hostPlayerId,
          health: 30,
          resources: {
            memory: 1,
            maxMemory: 1,
            computation: 3,
            maxComputation: 3
          },
          hand: [],
          deck: [],
          field: Array(5).fill(null),
          graveyard: []
        }
      },
      currentPhase: 'waiting',
      actionHistory: []
    };
  }

  private initializeMultiplayerGameState(hostPlayerId: string, guestPlayerId: string): any {
    return {
      players: {
        [hostPlayerId]: {
          id: hostPlayerId,
          health: 30,
          resources: {
            memory: 1,
            maxMemory: 1,
            computation: 3,
            maxComputation: 3
          },
          hand: [],
          deck: this.generatePlayerDeck(hostPlayerId),
          field: Array(5).fill(null),
          graveyard: []
        },
        [guestPlayerId]: {
          id: guestPlayerId,
          health: 30,
          resources: {
            memory: 1,
            maxMemory: 1,
            computation: 3,
            maxComputation: 3
          },
          hand: [],
          deck: this.generatePlayerDeck(guestPlayerId),
          field: Array(5).fill(null),
          graveyard: []
        }
      },
      currentPhase: 'mulligan',
      actionHistory: []
    };
  }

  private generatePlayerDeck(playerId: string): any[] {
    // This would normally fetch the player's deck from the database
    // For now, return a default deck
    return [
      { id: 'card-1', name: 'Working Memory', cost: 1, attack: 2, health: 3 },
      { id: 'card-2', name: 'Attention Mechanism', cost: 2, attack: 3, health: 2 },
      // ... more cards
    ];
  }

  private processGameAction(
    gameRoom: GameRoom,
    playerId: string,
    action: GameActionDto
  ): { success: boolean; gameState?: any; error?: string } {
    try {
      const gameState = { ...gameRoom.gameState };
      
      switch (action.actionType) {
        case 'play_card':
          return this.processPlayCard(gameState, playerId, action.actionData);
        case 'attack':
          return this.processAttack(gameState, playerId, action.actionData);
        case 'use_ability':
          return this.processUseAbility(gameState, playerId, action.actionData);
        case 'end_turn':
          return this.processEndTurn(gameState, playerId, gameRoom);
        case 'surrender':
          return this.processSurrender(gameState, playerId, gameRoom);
        default:
          return { success: false, error: 'Invalid action type' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  private processPlayCard(gameState: any, playerId: string, actionData: any): any {
    // Implement card playing logic
    return { success: true, gameState };
  }

  private processAttack(gameState: any, playerId: string, actionData: any): any {
    // Implement attack logic
    return { success: true, gameState };
  }

  private processUseAbility(gameState: any, playerId: string, actionData: any): any {
    // Implement ability usage logic
    return { success: true, gameState };
  }

  private processEndTurn(gameState: any, playerId: string, gameRoom: GameRoom): any {
    // Switch to next player's turn
    const otherPlayerId = gameRoom.hostPlayerId === playerId ? gameRoom.guestPlayerId : gameRoom.hostPlayerId;
    gameRoom.currentTurn = otherPlayerId!;
    gameRoom.turnNumber++;
    
    // Refresh resources for the new player
    if (gameState.players[otherPlayerId!]) {
      gameState.players[otherPlayerId!].resources.memory = gameState.players[otherPlayerId!].resources.maxMemory;
      gameState.players[otherPlayerId!].resources.computation = gameState.players[otherPlayerId!].resources.maxComputation;
    }
    
    return { success: true, gameState };
  }

  private processSurrender(gameState: any, playerId: string, gameRoom: GameRoom): any {
    const winnerId = gameRoom.hostPlayerId === playerId ? gameRoom.guestPlayerId : gameRoom.hostPlayerId;
    gameRoom.winnerId = winnerId;
    gameRoom.status = 'completed';
    gameRoom.winCondition = 'surrender';
    
    return { success: true, gameState };
  }

  private checkGameEndConditions(gameRoom: GameRoom): { gameEnded: boolean; winnerId?: string; winCondition?: string } {
    const gameState = gameRoom.gameState;
    
    // Check if any player's health is 0 or below
    for (const [playerId, playerState] of Object.entries(gameState.players)) {
      if ((playerState as any).health <= 0) {
        const winnerId = playerId === gameRoom.hostPlayerId ? gameRoom.guestPlayerId : gameRoom.hostPlayerId;
        return { gameEnded: true, winnerId, winCondition: 'health_depleted' };
      }
    }

    // Check if any player has no cards left
    for (const [playerId, playerState] of Object.entries(gameState.players)) {
      if ((playerState as any).deck.length === 0 && (playerState as any).hand.length === 0) {
        const winnerId = playerId === gameRoom.hostPlayerId ? gameRoom.guestPlayerId : gameRoom.hostPlayerId;
        return { gameEnded: true, winnerId, winCondition: 'cards_exhausted' };
      }
    }

    return { gameEnded: false };
  }

  private async updatePlayerStats(gameRoom: GameRoom, gameResult: any): Promise<void> {
    if (!gameRoom.hostPlayerId || !gameRoom.guestPlayerId) return;

    const hostStats = await this.playerStatsRepository.findOrCreateByUserId(gameRoom.hostPlayerId);
    const guestStats = await this.playerStatsRepository.findOrCreateByUserId(gameRoom.guestPlayerId);

    const hostWon = gameResult.winnerId === gameRoom.hostPlayerId;
    const experienceBase = 50;
    const coinsBase = 25;

    if (hostWon) {
      hostStats.recordWin();
      guestStats.recordLoss();
      
      hostStats.addExperience(experienceBase * 2);
      hostStats.currency.coins += coinsBase * 2;
      
      guestStats.addExperience(experienceBase);
      guestStats.currency.coins += coinsBase;
    } else {
      guestStats.recordWin();
      hostStats.recordLoss();
      
      guestStats.addExperience(experienceBase * 2);
      guestStats.currency.coins += coinsBase * 2;
      
      hostStats.addExperience(experienceBase);
      hostStats.currency.coins += coinsBase;
    }

    await this.playerStatsRepository.save(hostStats);
    await this.playerStatsRepository.save(guestStats);
  }
}