import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { VcfPanicButtonEntity, VcfPanicButtonStatus, VcfPanicButtonSeverity } from '../domain/vcf-panic-button.entity';

@Injectable()
export class VcfPanicButtonRepository {
  constructor(
    @InjectRepository(VcfPanicButtonEntity)
    private readonly repository: EntityRepository<VcfPanicButtonEntity>,
    private readonly em: EntityManager,
  ) {}

  async create(data: Partial<VcfPanicButtonEntity>): Promise<VcfPanicButtonEntity> {
    const panic = this.repository.create(data);
    await this.em.persistAndFlush(panic);
    return panic;
  }

  async findOne(id: string): Promise<VcfPanicButtonEntity | null> {
    return this.repository.findOne({ id }, { populate: ['user', 'assignedExpert'] });
  }

  async findActiveAlerts(): Promise<VcfPanicButtonEntity[]> {
    return this.repository.find(
      {
        status: { $in: [
          VcfPanicButtonStatus.TRIGGERED,
          VcfPanicButtonStatus.ACKNOWLEDGED,
          VcfPanicButtonStatus.IN_PROGRESS,
        ]},
      },
      {
        populate: ['user', 'assignedExpert'],
        orderBy: { severity: 'DESC', triggeredAt: 'ASC' },
      }
    );
  }

  async findUserAlerts(userId: string): Promise<VcfPanicButtonEntity[]> {
    return this.repository.find(
      { user: { id: userId } },
      { populate: ['assignedExpert'], orderBy: { triggeredAt: 'DESC' } }
    );
  }

  async findExpertAlerts(expertId: string): Promise<VcfPanicButtonEntity[]> {
    return this.repository.find(
      { assignedExpert: { id: expertId } },
      { populate: ['user'], orderBy: { triggeredAt: 'DESC' } }
    );
  }

  async findBySeverity(severity: VcfPanicButtonSeverity): Promise<VcfPanicButtonEntity[]> {
    return this.repository.find(
      { severity, status: { $ne: VcfPanicButtonStatus.RESOLVED } },
      { populate: ['user', 'assignedExpert'], orderBy: { triggeredAt: 'DESC' } }
    );
  }

  async update(panic: VcfPanicButtonEntity): Promise<void> {
    await this.em.persistAndFlush(panic);
  }

  async addTimelineEntry(
    panicId: string,
    action: string,
    userId?: string,
    details?: string,
  ): Promise<void> {
    const panic = await this.findOne(panicId);
    if (panic) {
      panic.timeline.push({
        timestamp: new Date(),
        action,
        userId,
        details,
      });
      await this.update(panic);
    }
  }

  async getStats(startDate?: Date, endDate?: Date): Promise<{
    totalAlerts: number;
    resolvedAlerts: number;
    averageResponseTime: number;
    averageResolutionTime: number;
    bySeverity: Record<string, number>;
    byType: Record<string, number>;
    falseAlarms: number;
  }> {
    const query: any = {};
    if (startDate && endDate) {
      query.triggeredAt = { $gte: startDate, $lte: endDate };
    }

    const alerts = await this.repository.find(query);
    const resolved = alerts.filter(a => a.status === VcfPanicButtonStatus.RESOLVED);
    const falseAlarms = alerts.filter(a => a.status === VcfPanicButtonStatus.FALSE_ALARM);

    const bySeverity: Record<string, number> = {};
    const byType: Record<string, number> = {};

    alerts.forEach(alert => {
      bySeverity[alert.severity] = (bySeverity[alert.severity] || 0) + 1;
      byType[alert.type] = (byType[alert.type] || 0) + 1;
    });

    return {
      totalAlerts: alerts.length,
      resolvedAlerts: resolved.length,
      averageResponseTime: resolved.length > 0
        ? resolved.reduce((sum, a) => sum + (a.responseTimeMinutes || 0), 0) / resolved.length
        : 0,
      averageResolutionTime: resolved.length > 0
        ? resolved.reduce((sum, a) => sum + (a.resolutionTimeMinutes || 0), 0) / resolved.length
        : 0,
      bySeverity,
      byType,
      falseAlarms: falseAlarms.length,
    };
  }
}