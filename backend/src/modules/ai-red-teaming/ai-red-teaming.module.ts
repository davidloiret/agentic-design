import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuditController } from './infrastructure/adapter/in/audit.controller';
import { AuditFindingController } from './infrastructure/adapter/in/audit-finding.controller';
import { Audit } from './domain/entity/audit.entity';
import { AuditFinding } from './domain/entity/audit-finding.entity';
import { AuditRepository } from './infrastructure/persistence/audit.repository';
import { AuditFindingRepository } from './infrastructure/persistence/audit-finding.repository';
import { AuditService } from './application/service/audit.service';
import { AuditFindingService } from './application/service/audit-finding.service';

@Module({
  imports: [MikroOrmModule.forFeature([Audit, AuditFinding])],
  controllers: [AuditController, AuditFindingController],
  providers: [
    AuditRepository,
    AuditFindingRepository,
    AuditService,
    AuditFindingService,
    {
      provide: 'IAuditRepository',
      useClass: AuditRepository,
    },
    {
      provide: 'IAuditFindingRepository',
      useClass: AuditFindingRepository,
    },
  ],
  exports: [AuditService, AuditFindingService],
})
export class AiRedTeamingModule {}