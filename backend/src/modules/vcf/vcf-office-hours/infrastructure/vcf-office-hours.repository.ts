import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { VcfOfficeHoursEntity, VcfOfficeHoursStatus } from '../domain/vcf-office-hours.entity';

@Injectable()
export class VcfOfficeHoursRepository {
  constructor(
    @InjectRepository(VcfOfficeHoursEntity)
    private readonly repository: EntityRepository<VcfOfficeHoursEntity>,
    private readonly em: EntityManager,
  ) {}

  async create(data: Partial<VcfOfficeHoursEntity>): Promise<VcfOfficeHoursEntity> {
    const session = this.repository.create(data);
    await this.em.persistAndFlush(session);
    return session;
  }

  async findOne(id: string): Promise<VcfOfficeHoursEntity | null> {
    return this.repository.findOne({ id }, { populate: ['host'] });
  }

  async findUpcoming(): Promise<VcfOfficeHoursEntity[]> {
    const now = new Date();
    return this.repository.find(
      {
        scheduledAt: { $gte: now },
        status: VcfOfficeHoursStatus.SCHEDULED,
      },
      {
        populate: ['host'],
        orderBy: { scheduledAt: 'ASC' },
      }
    );
  }

  async findByHost(hostId: string): Promise<VcfOfficeHoursEntity[]> {
    return this.repository.find(
      { host: { id: hostId } },
      { populate: ['host'], orderBy: { scheduledAt: 'DESC' } }
    );
  }

  async findByAttendee(attendeeId: string): Promise<VcfOfficeHoursEntity[]> {
    return this.repository.find(
      { attendeeIds: { $contains: attendeeId } },
      { populate: ['host'], orderBy: { scheduledAt: 'DESC' } }
    );
  }

  async update(session: VcfOfficeHoursEntity): Promise<void> {
    await this.em.persistAndFlush(session);
  }

  async addAttendee(sessionId: string, userId: string): Promise<boolean> {
    const session = await this.findOne(sessionId);
    if (!session) return false;

    if (!session.attendeeIds.includes(userId) &&
        session.attendeeIds.length < session.maxAttendees) {
      session.attendeeIds.push(userId);
      await this.update(session);
      return true;
    }
    return false;
  }

  async removeAttendee(sessionId: string, userId: string): Promise<boolean> {
    const session = await this.findOne(sessionId);
    if (!session) return false;

    const index = session.attendeeIds.indexOf(userId);
    if (index > -1) {
      session.attendeeIds.splice(index, 1);
      await this.update(session);
      return true;
    }
    return false;
  }

  async findAvailableSessions(userId: string, tiers: string[]): Promise<VcfOfficeHoursEntity[]> {
    const now = new Date();
    return this.repository.find(
      {
        scheduledAt: { $gte: now },
        status: VcfOfficeHoursStatus.SCHEDULED,
        attendeeIds: { $nin: [userId] },
        $or: [
          { requiresSubscription: false },
          { allowedTiers: { $in: tiers } },
        ],
      },
      {
        populate: ['host'],
        orderBy: { scheduledAt: 'ASC' },
      }
    );
  }
}