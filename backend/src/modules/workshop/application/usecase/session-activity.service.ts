import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { SessionActivityRepository } from '../../infrastructure/persistence/session-activity.repository';
import { WorkshopEnrollmentRepository } from '../../infrastructure/persistence/workshop-enrollment.repository';
import { SessionActivity, ActivityStatus } from '../../domain/entity/session-activity.entity';

@Injectable()
export class SessionActivityService {
  constructor(
    private readonly activityRepository: SessionActivityRepository,
    private readonly enrollmentRepository: WorkshopEnrollmentRepository,
  ) {}

  async getActivityLeaderboard(activityId: string): Promise<Array<{
    userId: string;
    userName: string;
    score: number;
    rank: number;
    teamId?: string;
  }>> {
    const activity = await this.activityRepository.findById(activityId);
    if (!activity) {
      return [];
    }

    // Use the existing results structure from the entity
    const leaderboard = activity.results.participants
      .filter(p => p.score !== undefined)
      .map(p => ({
        userId: p.userId,
        userName: p.userId, // Would be replaced with actual user name lookup
        score: p.score || 0,
        rank: 0,
        teamId: p.teamId,
        submittedAt: p.submittedAt
      }))
      .sort((a, b) => {
        // Sort by score descending, then by submission time ascending
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        if (a.submittedAt && b.submittedAt) {
          return a.submittedAt.getTime() - b.submittedAt.getTime();
        }
        return 0;
      });

    // Assign ranks
    leaderboard.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    return leaderboard;
  }

  async getActivityById(id: string): Promise<SessionActivity | null> {
    return this.activityRepository.findById(id);
  }

  async getActivitiesBySession(sessionId: string): Promise<SessionActivity[]> {
    return this.activityRepository.findBySession(sessionId);
  }

  async getActiveActivitiesBySession(sessionId: string): Promise<SessionActivity[]> {
    const activities = await this.activityRepository.findBySession(sessionId);
    return activities.filter(activity => activity.status === ActivityStatus.ACTIVE);
  }

  async getActivityStats(activityId: string): Promise<{
    totalParticipants: number;
    totalSubmissions: number;
    averageScore: number;
    completionRate: number;
    timeRemaining?: number;
  }> {
    const activity = await this.activityRepository.findById(activityId);
    if (!activity) {
      throw new NotFoundException('Activity not found');
    }

    const totalParticipants = activity.results.participants.length;
    const submittedParticipants = activity.results.participants.filter(p => p.submittedAt);
    const totalSubmissions = submittedParticipants.length;
    const scores = submittedParticipants.map(p => p.score || 0);
    const averageScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    const completionRate = totalParticipants > 0 ? (totalSubmissions / totalParticipants) * 100 : 0;

    let timeRemaining: number | undefined;
    if (activity.status === ActivityStatus.ACTIVE && activity.actualStartTime) {
      const elapsed = Date.now() - activity.actualStartTime.getTime();
      timeRemaining = Math.max(0, activity.duration * 60 * 1000 - elapsed);
    }

    return {
      totalParticipants,
      totalSubmissions,
      averageScore,
      completionRate,
      timeRemaining
    };
  }

  async endActivity(activityId: string, instructorId: string): Promise<void> {
    const activity = await this.activityRepository.findById(activityId);
    if (!activity) {
      throw new NotFoundException('Activity not found');
    }

    // Verify instructor permissions
    const session = activity.session;
    if (session.workshop.instructor.id !== instructorId && session.leadInstructor?.id !== instructorId) {
      throw new ForbiddenException('Only instructors can end activities');
    }

    activity.complete();
    await this.activityRepository.update(activity);
  }
}