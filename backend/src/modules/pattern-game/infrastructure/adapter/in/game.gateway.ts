import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import type { Socket } from 'socket.io';
import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { MultiplayerGameService } from '../../../application/usecase/multiplayer-game.service';
import { GameActionDto } from '../../../application/dto/game-action.dto.js';
import { CreateGameRoomDto } from '../../../application/dto/create-game-room.dto.js';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  gameRoomId?: string;
}

@Injectable()
@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3002',
    credentials: true,
  },
  namespace: '/game',
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  private readonly logger = new Logger(GameGateway.name);
  private connectedPlayers = new Map<string, AuthenticatedSocket>();
  private gameRoomPlayers = new Map<string, Set<string>>(); // gameRoomId -> Set of playerIds

  constructor(private readonly multiplayerGameService: MultiplayerGameService) {}

  async handleConnection(client: AuthenticatedSocket) {
    this.logger.log(`Client connected: ${client.id}`);
    
    // In a real app, you'd extract userId from JWT token
    const userId = client.handshake.query.userId as string;
    if (!userId) {
      client.disconnect();
      return;
    }

    client.userId = userId;
    this.connectedPlayers.set(userId, client);

    // Rejoin any active games
    try {
      const activeGames = await this.multiplayerGameService.getPlayerActiveGames(userId);
      for (const game of activeGames) {
        await this.joinRoom(client, game.id);
      }
    } catch (error) {
      this.logger.error(`Error rejoining games for user ${userId}:`, error);
    }

    client.emit('connected', { userId });
  }

  async handleDisconnect(client: AuthenticatedSocket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    
    if (client.userId) {
      this.connectedPlayers.delete(client.userId);
      
      // Remove from game room tracking
      if (client.gameRoomId) {
        const players = this.gameRoomPlayers.get(client.gameRoomId);
        if (players) {
          players.delete(client.userId);
          if (players.size === 0) {
            this.gameRoomPlayers.delete(client.gameRoomId);
          }
        }
      }
    }
  }

  @SubscribeMessage('create_game')
  async handleCreateGame(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() createGameDto: CreateGameRoomDto,
  ) {
    try {
      if (!client.userId) {
        return { error: 'Not authenticated' };
      }

      const gameRoom = await this.multiplayerGameService.createGameRoom(
        client.userId,
        createGameDto,
      );

      await this.joinRoom(client, gameRoom.id);

      // Broadcast to all clients that a new game is available
      this.server.emit('game_created', {
        id: gameRoom.id,
        hostPlayerId: gameRoom.hostPlayerId,
        mode: gameRoom.mode,
        status: gameRoom.status,
      });

      return { success: true, gameRoom };
    } catch (error) {
      this.logger.error('Error creating game:', error);
      return { error: error.message };
    }
  }

  @SubscribeMessage('join_game')
  async handleJoinGame(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { gameRoomId: string },
  ) {
    try {
      if (!client.userId) {
        return { error: 'Not authenticated' };
      }

      const gameRoom = await this.multiplayerGameService.joinGameRoom(
        data.gameRoomId,
        client.userId,
      );

      await this.joinRoom(client, gameRoom.id);

      // Notify both players that the game has started
      this.server.to(gameRoom.id).emit('game_started', {
        gameRoom,
        players: {
          host: gameRoom.hostPlayerId,
          guest: gameRoom.guestPlayerId,
        },
      });

      // Remove from available games list
      this.server.emit('game_no_longer_available', { gameRoomId: gameRoom.id });

      return { success: true, gameRoom };
    } catch (error) {
      this.logger.error('Error joining game:', error);
      return { error: error.message };
    }
  }

  @SubscribeMessage('game_action')
  async handleGameAction(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { gameRoomId: string; action: GameActionDto },
  ) {
    try {
      if (!client.userId) {
        return { error: 'Not authenticated' };
      }

      const result = await this.multiplayerGameService.executeGameAction(
        data.gameRoomId,
        client.userId,
        data.action,
      );

      if (result.success) {
        // Broadcast the action result to all players in the room
        this.server.to(data.gameRoomId).emit('game_action_result', {
          playerId: client.userId,
          action: data.action,
          gameState: result.gameState,
        });

        // Check if game ended
        const gameRoom = await this.multiplayerGameService.getPlayerActiveGames(client.userId);
        const currentGame = gameRoom.find(g => g.id === data.gameRoomId);
        
        if (currentGame?.status === 'completed') {
          this.server.to(data.gameRoomId).emit('game_ended', {
            winnerId: currentGame.winnerId,
            winCondition: currentGame.winCondition,
            battleResult: currentGame.battleResult,
          });
        }
      }

      return result;
    } catch (error) {
      this.logger.error('Error executing game action:', error);
      return { error: error.message };
    }
  }

  @SubscribeMessage('leave_game')
  async handleLeaveGame(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { gameRoomId: string },
  ) {
    try {
      if (!client.userId) {
        return { error: 'Not authenticated' };
      }

      await this.multiplayerGameService.leaveGame(data.gameRoomId, client.userId);

      // Notify other players in the room
      client.to(data.gameRoomId).emit('player_left', {
        playerId: client.userId,
      });

      // Remove client from room
      client.leave(data.gameRoomId);
      client.gameRoomId = undefined;

      // Update room tracking
      const players = this.gameRoomPlayers.get(data.gameRoomId);
      if (players) {
        players.delete(client.userId);
        if (players.size === 0) {
          this.gameRoomPlayers.delete(data.gameRoomId);
        }
      }

      return { success: true };
    } catch (error) {
      this.logger.error('Error leaving game:', error);
      return { error: error.message };
    }
  }

  @SubscribeMessage('get_available_games')
  async handleGetAvailableGames(@ConnectedSocket() client: AuthenticatedSocket) {
    try {
      const availableRooms = await this.multiplayerGameService.findAvailableRooms();
      return { success: true, games: availableRooms };
    } catch (error) {
      this.logger.error('Error getting available games:', error);
      return { error: error.message };
    }
  }

  @SubscribeMessage('get_player_stats')
  async handleGetPlayerStats(@ConnectedSocket() client: AuthenticatedSocket) {
    try {
      if (!client.userId) {
        return { error: 'Not authenticated' };
      }

      const stats = await this.multiplayerGameService.getPlayerStats(client.userId);
      return { success: true, stats };
    } catch (error) {
      this.logger.error('Error getting player stats:', error);
      return { error: error.message };
    }
  }

  private async joinRoom(client: AuthenticatedSocket, gameRoomId: string) {
    client.join(gameRoomId);
    client.gameRoomId = gameRoomId;

    // Track players in this room
    if (!this.gameRoomPlayers.has(gameRoomId)) {
      this.gameRoomPlayers.set(gameRoomId, new Set());
    }
    this.gameRoomPlayers.get(gameRoomId)!.add(client.userId!);

    this.logger.log(`Player ${client.userId} joined room ${gameRoomId}`);
  }

  // Admin/monitoring methods
  getConnectedPlayersCount(): number {
    return this.connectedPlayers.size;
  }

  getActiveGamesCount(): number {
    return this.gameRoomPlayers.size;
  }
}