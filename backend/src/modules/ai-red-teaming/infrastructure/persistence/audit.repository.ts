import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Audit, AuditStatus, AuditScope } from '../../domain/entity/audit.entity';
import { IAuditRepository, FindAuditsOptions } from '../../domain/repository/audit-repository.interface';

@Injectable()
export class AuditRepository implements IAuditRepository {
  constructor(
    @InjectRepository(Audit)
    private readonly repository: EntityRepository<Audit>,
  ) {}

  async findById(id: string): Promise<Audit | null> {
    return this.repository.findOne({ id });
  }

  async findByIdWithFindings(id: string): Promise<Audit | null> {
    return this.repository.findOne({ id }, { populate: ['findings'] });
  }

  async findAll(options: FindAuditsOptions = {}): Promise<Audit[]> {
    const { userId, status, scope, systemName, limit = 50, offset = 0 } = options;
    
    const filters: any = {};
    
    if (userId) filters.userId = userId;
    if (status) filters.status = status;
    if (scope) filters.scope = scope;
    if (systemName) filters.systemName = { $ilike: `%${systemName}%` };

    return this.repository.find(filters, {
      limit,
      offset,
      orderBy: { createdAt: 'DESC' }
    });
  }

  async findByUserId(userId: string): Promise<Audit[]> {
    return this.repository.find(
      { userId },
      { orderBy: { createdAt: 'DESC' } }
    );
  }

  async save(audit: Audit): Promise<Audit> {
    await this.repository.persistAndFlush(audit);
    return audit;
  }

  async update(audit: Audit): Promise<Audit> {
    await this.repository.flush();
    return audit;
  }

  async delete(id: string): Promise<void> {
    const audit = await this.repository.findOne({ id });
    if (audit) {
      await this.repository.removeAndFlush(audit);
    }
  }

  async count(options: FindAuditsOptions = {}): Promise<number> {
    const { userId, status, scope, systemName } = options;
    
    const filters: any = {};
    
    if (userId) filters.userId = userId;
    if (status) filters.status = status;
    if (scope) filters.scope = scope;
    if (systemName) filters.systemName = { $ilike: `%${systemName}%` };

    return this.repository.count(filters);
  }
}