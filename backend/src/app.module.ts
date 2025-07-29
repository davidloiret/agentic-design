import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AppController } from './app.controller';
import { HealthController } from './health/health.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { LearningHubModule } from './modules/learning-hub/learning-hub.module';
import { NotificationModule } from './modules/notification/notification.module';
import { SearchModule } from './modules/search/search.module';
import { AiRedTeamingModule } from './modules/ai-red-teaming/ai-red-teaming.module';
import mikroOrmConfig from './mikro-orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MikroOrmModule.forRoot(mikroOrmConfig),
    AuthModule,
    UserModule,
    LearningHubModule,
    NotificationModule,
    SearchModule,
    AiRedTeamingModule,
  ],
  controllers: [AppController, HealthController],
})
export class AppModule {}