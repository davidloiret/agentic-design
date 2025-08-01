import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { LearningHubController } from './infrastructure/adapter/in/learning-hub.controller';
import { LearningHubService } from './application/usecase/learning-hub.service';
import { AchievementService } from './application/usecase/achievement.service';
import { UserProgressRepository } from './infrastructure/persistence/user-progress.repository';
import { UserAchievementRepository } from './infrastructure/persistence/user-achievement.repository';
import { UserXpRepository, UserXpTransactionRepository } from './infrastructure/persistence/user-xp.repository';
import { UserStreakRepository } from './infrastructure/persistence/user-streak.repository';
import { UserRepository } from '../user/infrastructure/persistence/user.repository';
import { UserProgress } from './domain/entity/user-progress.entity';
import { UserAchievement } from './domain/entity/user-achievement.entity';
import { UserXp, UserXpTransaction } from './domain/entity/user-xp.entity';
import { UserStreak } from './domain/entity/user-streak.entity';
import { User } from '../user/domain/entity/user.entity';
import { AuthModule } from '../auth/auth.module';
import { NotificationModule } from '../notification/notification.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      UserProgress,
      UserAchievement,
      UserXp,
      UserXpTransaction,
      UserStreak,
      User,
    ]),
    AuthModule,
    NotificationModule,
    UserModule,
  ],
  controllers: [LearningHubController],
  providers: [
    LearningHubService,
    AchievementService,
    UserProgressRepository,
    UserAchievementRepository,
    UserXpRepository,
    UserXpTransactionRepository,
    UserStreakRepository,
    UserRepository,
  ],
  exports: [LearningHubService, AchievementService],
})
export class LearningHubModule {}