import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Request,
} from '@nestjs/common';
import { MultiplayerGameService } from '../../../application/usecase/multiplayer-game.service';
import { CreateGameRoomDto } from '../../../application/dto/create-game-room.dto';
import { GameActionDto } from '../../../application/dto/game-action.dto';
import { GameRoomResponseDto, PlayerStatsResponseDto } from '../../../application/dto/game-room-response.dto';

@Controller('pattern-game')
export class PatternGameController {
  constructor(
    private readonly multiplayerGameService: MultiplayerGameService,
  ) {}

  @Post('rooms')
  async createGameRoom(
    @Body() createGameRoomDto: CreateGameRoomDto,
    @Request() req: any,
  ): Promise<GameRoomResponseDto> {
    // In a real app, you'd get userId from JWT token in AuthGuard
    const userId = req.user?.id || req.headers['x-user-id'] || 'test-user';
    
    const gameRoom = await this.multiplayerGameService.createGameRoom(
      userId,
      createGameRoomDto,
    );

    return this.mapToGameRoomResponse(gameRoom);
  }

  @Get('rooms/available')
  async getAvailableRooms(): Promise<GameRoomResponseDto[]> {
    const rooms = await this.multiplayerGameService.findAvailableRooms();
    return rooms.map(room => this.mapToGameRoomResponse(room));
  }

  @Get('rooms/my-active')
  async getMyActiveGames(@Request() req: any): Promise<GameRoomResponseDto[]> {
    const userId = req.user?.id || req.headers['x-user-id'] || 'test-user';
    
    const games = await this.multiplayerGameService.getPlayerActiveGames(userId);
    return games.map(game => this.mapToGameRoomResponse(game));
  }

  @Put('rooms/:gameRoomId/join')
  async joinGameRoom(
    @Param('gameRoomId') gameRoomId: string,
    @Request() req: any,
  ): Promise<GameRoomResponseDto> {
    const userId = req.user?.id || req.headers['x-user-id'] || 'test-user';
    
    const gameRoom = await this.multiplayerGameService.joinGameRoom(
      gameRoomId,
      userId,
    );

    return this.mapToGameRoomResponse(gameRoom);
  }

  @Post('rooms/:gameRoomId/actions')
  async executeGameAction(
    @Param('gameRoomId') gameRoomId: string,
    @Body() gameActionDto: GameActionDto,
    @Request() req: any,
  ) {
    const userId = req.user?.id || req.headers['x-user-id'] || 'test-user';
    
    return await this.multiplayerGameService.executeGameAction(
      gameRoomId,
      userId,
      gameActionDto,
    );
  }

  @Delete('rooms/:gameRoomId/leave')
  async leaveGameRoom(
    @Param('gameRoomId') gameRoomId: string,
    @Request() req: any,
  ): Promise<{ success: boolean }> {
    const userId = req.user?.id || req.headers['x-user-id'] || 'test-user';
    
    await this.multiplayerGameService.leaveGame(gameRoomId, userId);
    return { success: true };
  }

  @Get('stats')
  async getPlayerStats(@Request() req: any): Promise<PlayerStatsResponseDto> {
    const userId = req.user?.id || req.headers['x-user-id'] || 'test-user';
    
    const stats = await this.multiplayerGameService.getPlayerStats(userId);
    return this.mapToPlayerStatsResponse(stats);
  }

  @Get('leaderboard')
  async getLeaderboard(
    @Query('limit') limit?: number,
  ): Promise<PlayerStatsResponseDto[]> {
    // This would be implemented in the service
    // For now, return empty array
    return [];
  }

  private mapToGameRoomResponse(gameRoom: any): GameRoomResponseDto {
    return {
      id: gameRoom.id,
      hostPlayerId: gameRoom.hostPlayerId,
      guestPlayerId: gameRoom.guestPlayerId,
      mode: gameRoom.mode,
      status: gameRoom.status,
      phase: gameRoom.phase,
      currentTurn: gameRoom.currentTurn,
      turnNumber: gameRoom.turnNumber,
      turnTimer: gameRoom.turnTimer,
      gameState: gameRoom.gameState,
      gameSettings: gameRoom.gameSettings,
      winnerId: gameRoom.winnerId,
      winCondition: gameRoom.winCondition,
      createdAt: gameRoom.createdAt,
      updatedAt: gameRoom.updatedAt,
      completedAt: gameRoom.completedAt,
    };
  }

  private mapToPlayerStatsResponse(stats: any): PlayerStatsResponseDto {
    return {
      id: stats.id,
      userId: stats.userId,
      level: stats.level,
      experience: stats.experience,
      experienceToNextLevel: stats.experienceToNextLevel,
      wins: stats.wins,
      losses: stats.losses,
      draws: stats.draws,
      totalGames: stats.totalGames,
      winRate: stats.winRate,
      currentRank: stats.currentRank,
      rankPoints: stats.rankPoints,
      currency: stats.currency,
      unlockedPatterns: stats.unlockedPatterns,
      achievements: stats.achievements,
      statistics: stats.statistics,
      lastActiveAt: stats.lastActiveAt,
    };
  }
}