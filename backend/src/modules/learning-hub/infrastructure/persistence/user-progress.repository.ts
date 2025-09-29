import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UserProgress } from '../../domain/entity/user-progress.entity';
import { IUserProgressRepository } from '../../domain/repository/user-progress-repository.interface';

@Injectable()
export class UserProgressRepository implements IUserProgressRepository {
  constructor(
    @InjectRepository(UserProgress)
    private readonly repository: EntityRepository<UserProgress>,
  ) {}

  async findByUserAndCourse(userId: string, courseId: string): Promise<UserProgress[]> {
    return this.repository.find({ 
      user: userId, 
      courseId 
    }, { populate: ['user'] });
  }

  async findByUserAndLesson(userId: string, lessonId: string): Promise<UserProgress | null> {
    return this.repository.findOne({ 
      user: userId, 
      lessonId 
    }, { populate: ['user'] });
  }

  async findByUser(userId: string): Promise<UserProgress[]> {
    return this.repository.find({ 
      user: userId 
    }, { populate: ['user'] });
  }

  async save(progress: UserProgress): Promise<UserProgress> {
    await this.repository.getEntityManager().persistAndFlush(progress);
    return progress;
  }

  async update(progress: UserProgress): Promise<UserProgress> {
    // Merge the entity to ensure it's managed by the current entity manager
    const em = this.repository.getEntityManager();
    em.persist(progress);
    await em.flush();
    return progress;
  }

  async delete(id: string): Promise<void> {
    const progress = await this.repository.findOne({ id });
    if (progress) {
      await this.repository.getEntityManager().removeAndFlush(progress);
    }
  }

  async getUserCourseProgress(userId: string, courseId: string): Promise<{
    totalLessons: number;
    completedLessons: number;
    progressPercentage: number;
    totalTimeSpent: number;
  }> {
    const progressRecords = await this.findByUserAndCourse(userId, courseId);
    
    const totalLessons = progressRecords.length;
    const completedLessons = progressRecords.filter(p => p.isCompleted).length;
    const totalTimeSpent = progressRecords.reduce((sum, p) => sum + (p.timeSpent || 0), 0);
    const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

    return {
      totalLessons,
      completedLessons,
      progressPercentage: Math.round(progressPercentage * 100) / 100,
      totalTimeSpent,
    };
  }
}