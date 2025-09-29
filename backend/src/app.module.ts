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
import { PatternGameModule } from './modules/pattern-game/pattern-game.module';
// import { AiRedTeamingModule } from './modules/ai-red-teaming/ai-red-teaming.module';
import { UserKnowledgeBaseModule } from './modules/user-knowledge-base/user-knowledge-base.module';
import { CodeExecutionModule } from './modules/code-execution/code-execution.module';
import { WorkshopModule } from './modules/workshop/workshop.module';
import { SecretsModule } from './modules/secrets/secrets.module';
import { VcfSubscriptionsModule } from './modules/vcf/vcf-subscriptions/vcf-subscriptions.module';
import { VcfHotlineModule } from './modules/vcf/vcf-hotline/vcf-hotline.module';
import { VcfExpertsModule } from './modules/vcf/vcf-experts/vcf-experts.module';
import { VcfHelpRequestsModule } from './modules/vcf/vcf-help-requests/vcf-help-requests.module';
import { VcfOfficeHoursModule } from './modules/vcf/vcf-office-hours/vcf-office-hours.module';
import { VcfPanicButtonModule } from './modules/vcf/vcf-panic-button/vcf-panic-button.module';
import { VcfNotificationsModule } from './modules/vcf/vcf-notifications/vcf-notifications.module';
import { VcfFilesModule } from './modules/vcf/vcf-files/vcf-files.module';
import { VcfPaymentsModule } from './modules/vcf/vcf-payments/vcf-payments.module';
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
    PatternGameModule,
    // AiRedTeamingModule,
    UserKnowledgeBaseModule,
    CodeExecutionModule,
    WorkshopModule,
    SecretsModule,
    // VCF (VibeCodeFix) Modules
    VcfSubscriptionsModule,
    VcfHotlineModule,
    VcfExpertsModule,
    VcfHelpRequestsModule,
    VcfOfficeHoursModule,
    VcfPanicButtonModule,
    VcfNotificationsModule,
    VcfFilesModule,
    VcfPaymentsModule,
  ],
  controllers: [AppController, HealthController],
})
export class AppModule {}