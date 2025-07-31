import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

// Entities
import { GameRoom } from './domain/entity/game-room.entity';
import { GameAction } from './domain/entity/game-action.entity';
import { PlayerStats } from './domain/entity/player-stats.entity';

// Repositories
import { GameRoomRepository } from './infrastructure/persistence/game-room.repository';
import { PlayerStatsRepository } from './infrastructure/persistence/player-stats.repository';
import { GameRoomRepositoryInterface } from './domain/repository/game-room-repository.interface';
import { PlayerStatsRepositoryInterface } from './domain/repository/player-stats-repository.interface';

// Services
import { MultiplayerGameService } from './application/usecase/multiplayer-game.service';

// Controllers & Gateways
import { PatternGameController } from './infrastructure/adapter/in/pattern-game.controller';
import { GameGateway } from './infrastructure/adapter/in/game.gateway';

@Module({
  imports: [
    MikroOrmModule.forFeature([GameRoom, GameAction, PlayerStats]),
  ],
  controllers: [PatternGameController],
  providers: [
    // Gateways
    GameGateway,
    
    // Services
    MultiplayerGameService,
    
    // Repository implementations
    {
      provide: 'GameRoomRepositoryInterface',
      useClass: GameRoomRepository,
    },
    {
      provide: 'PlayerStatsRepositoryInterface',
      useClass: PlayerStatsRepository,
    },
    
    // Direct repository access for injection
    GameRoomRepository,
    PlayerStatsRepository,
  ],
  exports: [MultiplayerGameService, GameGateway],
})
export class PatternGameModule {}