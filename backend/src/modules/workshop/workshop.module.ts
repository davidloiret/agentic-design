import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { WorkshopController } from './infrastructure/adapter/in/workshop.controller';
import { WorkshopService } from './application/usecase/workshop.service';
import { WorkshopRepository } from './infrastructure/persistence/workshop.repository';
import { WorkshopEnrollmentRepository } from './infrastructure/persistence/workshop-enrollment.repository';
import { WorkshopSessionRepository } from './infrastructure/persistence/workshop-session.repository';
import { WorkshopTeamRepository } from './infrastructure/persistence/workshop-team.repository';
import { SessionActivityRepository } from './infrastructure/persistence/session-activity.repository';
import { Workshop } from './domain/entity/workshop.entity';
import { WorkshopEnrollment } from './domain/entity/workshop-enrollment.entity';
import { WorkshopSession } from './domain/entity/workshop-session.entity';
import { WorkshopTeam } from './domain/entity/workshop-team.entity';
import { SessionActivity } from './domain/entity/session-activity.entity';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { LearningHubModule } from '../learning-hub/learning-hub.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      Workshop,
      WorkshopEnrollment,
      WorkshopSession,
      WorkshopTeam,
      SessionActivity
    ]),
    AuthModule,
    UserModule,
    LearningHubModule,
    NotificationModule
  ],
  controllers: [WorkshopController],
  providers: [
    WorkshopService,
    WorkshopRepository,
    WorkshopEnrollmentRepository,
    WorkshopSessionRepository,
    WorkshopTeamRepository,
    SessionActivityRepository
  ],
  exports: [WorkshopService],
})
export class WorkshopModule {}