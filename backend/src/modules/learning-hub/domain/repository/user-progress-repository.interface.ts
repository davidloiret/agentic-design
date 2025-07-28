import { UserProgress } from '../entity/user-progress.entity';

export interface IUserProgressRepository {
  findByUserAndCourse(userId: string, courseId: string): Promise<UserProgress[]>;
  findByUserAndLesson(userId: string, lessonId: string): Promise<UserProgress | null>;
  findByUser(userId: string): Promise<UserProgress[]>;
  save(progress: UserProgress): Promise<UserProgress>;
  update(progress: UserProgress): Promise<UserProgress>;
  delete(id: string): Promise<void>;
  getUserCourseProgress(userId: string, courseId: string): Promise<{
    totalLessons: number;
    completedLessons: number;
    progressPercentage: number;
    totalTimeSpent: number;
  }>;
}