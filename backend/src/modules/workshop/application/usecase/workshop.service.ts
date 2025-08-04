import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { WorkshopRepository } from '../../infrastructure/persistence/workshop.repository';
import { WorkshopEnrollmentRepository } from '../../infrastructure/persistence/workshop-enrollment.repository';
import { WorkshopSessionRepository } from '../../infrastructure/persistence/workshop-session.repository';
import { WorkshopTeamRepository } from '../../infrastructure/persistence/workshop-team.repository';
import { SessionActivityRepository } from '../../infrastructure/persistence/session-activity.repository';
import { UserRepository } from '../../../user/infrastructure/persistence/user.repository';
import { LearningHubService } from '../../../learning-hub/application/usecase/learning-hub.service';
import { NotificationService } from '../../../notification/application/usecase/notification.service';
import { Workshop, WorkshopType, WorkshopTier, WorkshopStatus } from '../../domain/entity/workshop.entity';
import { WorkshopEnrollment, EnrollmentStatus, EnrollmentRole } from '../../domain/entity/workshop-enrollment.entity';
import { WorkshopSession, SessionStatus, SessionType } from '../../domain/entity/workshop-session.entity';
import { WorkshopTeam } from '../../domain/entity/workshop-team.entity';
import { SessionActivity, ActivityStatus } from '../../domain/entity/session-activity.entity';
import { CreateWorkshopDto } from '../dto/create-workshop.dto';
import { UpdateWorkshopDto } from '../dto/update-workshop.dto';
import { EnrollWorkshopDto } from '../dto/enroll-workshop.dto';
import { CreateSessionDto } from '../dto/create-session.dto';
import { CreateActivityDto } from '../dto/create-activity.dto';
import { SubmitActivityDto } from '../dto/submit-activity.dto';
import { User } from '../../../user/domain/entity/user.entity';
import { XpSource } from '../../../learning-hub/domain/entity/user-xp.entity';

@Injectable()
export class WorkshopService {
  constructor(
    private readonly workshopRepository: WorkshopRepository,
    private readonly enrollmentRepository: WorkshopEnrollmentRepository,
    private readonly sessionRepository: WorkshopSessionRepository,
    private readonly teamRepository: WorkshopTeamRepository,
    private readonly activityRepository: SessionActivityRepository,
    private readonly userRepository: UserRepository,
    private readonly learningHubService: LearningHubService,
    private readonly notificationService: NotificationService,
  ) {}

  async createWorkshop(userId: string, dto: CreateWorkshopDto): Promise<Workshop> {
    const instructor = await this.userRepository.findById(userId);
    if (!instructor) {
      throw new NotFoundException('User not found');
    }

    // Verify instructor permissions (could check for instructor role, certifications, etc.)
    // For now, we'll assume any authenticated user can create workshops

    const workshop = new Workshop(
      dto.title,
      dto.description,
      instructor,
      dto.type,
      dto.tier,
      new Date(dto.startDate),
      new Date(dto.endDate),
      dto.maxParticipants
    );

    // Set additional properties
    workshop.requirements = dto.requirements || [];
    workshop.learningOutcomes = dto.learningOutcomes || [];
    workshop.price = dto.price;
    workshop.schedule = dto.schedule;
    workshop.locationDetails = dto.locationDetails;
    workshop.gamificationConfig = dto.gamificationConfig || workshop.gamificationConfig;
    workshop.prerequisites = dto.prerequisites;
    workshop.totalXpReward = dto.totalXpReward || 1000;

    // Set up default badges for the workshop
    workshop.badges = [
      {
        id: 'workshop-completion',
        name: 'Workshop Graduate',
        description: `Complete the ${workshop.title} workshop`,
        icon: 'GraduationCap',
        criteria: 'Attend all sessions and complete all activities',
        points: 500
      },
      {
        id: 'perfect-attendance',
        name: 'Perfect Attendance',
        description: 'Attend all workshop sessions',
        icon: 'Calendar',
        criteria: '100% attendance rate',
        points: 200
      },
      {
        id: 'top-performer',
        name: 'Top Performer',
        description: 'Finish in the top 3 of the workshop',
        icon: 'Trophy',
        criteria: 'Achieve one of the top 3 overall scores',
        points: 300
      }
    ];

    if (dto.gamificationConfig?.enableTeams) {
      workshop.badges.push({
        id: 'team-champion',
        name: 'Team Champion',
        description: 'Be part of the winning team',
        icon: 'Users',
        criteria: 'Your team finishes first in overall points',
        points: 400
      });
    }

    await this.workshopRepository.save(workshop);

    // Create default sessions for the workshop
    const sessions = [
      new WorkshopSession(
        workshop,
        'Opening Session',
        'Welcome and introduction to the workshop',
        1,
        SessionType.LECTURE,
        new Date(workshop.startDate),
        new Date(new Date(workshop.startDate).getTime() + 2 * 60 * 60 * 1000) // 2 hours
      ),
      new WorkshopSession(
        workshop,
        'Main Workshop Content',
        'Core workshop activities and learning',
        2,
        SessionType.INTERACTIVE,
        new Date(new Date(workshop.startDate).getTime() + 24 * 60 * 60 * 1000), // Next day
        new Date(new Date(workshop.startDate).getTime() + 26 * 60 * 60 * 1000) // 2 hours later
      ),
      new WorkshopSession(
        workshop,
        'Closing Session',
        'Wrap up and Q&A',
        3,
        SessionType.Q_AND_A,
        new Date(workshop.endDate),
        new Date(new Date(workshop.endDate).getTime() + 1 * 60 * 60 * 1000) // 1 hour
      )
    ];

    // Save all sessions
    for (const session of sessions) {
      await this.sessionRepository.save(session);
    }

    // Create notification for followers
    await this.notificationService.createWorkshopAnnouncementNotification(
      instructor,
      workshop
    );

    return workshop;
  }

  async updateWorkshop(userId: string, workshopId: string, dto: UpdateWorkshopDto): Promise<Workshop> {
    const workshop = await this.workshopRepository.findById(workshopId);
    if (!workshop) {
      throw new NotFoundException('Workshop not found');
    }

    // Check if user is the instructor
    if (workshop.instructor.id !== userId) {
      throw new ForbiddenException('Only the instructor can update the workshop');
    }

    // Update allowed fields
    if (dto.title) workshop.title = dto.title;
    if (dto.description) workshop.description = dto.description;
    if (dto.requirements) workshop.requirements = dto.requirements;
    if (dto.learningOutcomes) workshop.learningOutcomes = dto.learningOutcomes;
    if (dto.price !== undefined) workshop.price = dto.price;
    if (dto.schedule) workshop.schedule = dto.schedule;
    if (dto.locationDetails) workshop.locationDetails = dto.locationDetails;
    if (dto.gamificationConfig) {
      workshop.gamificationConfig = {
        ...workshop.gamificationConfig,
        ...dto.gamificationConfig,
        bonusPoints: {
          ...workshop.gamificationConfig.bonusPoints,
          ...dto.gamificationConfig.bonusPoints
        }
      };
    }

    await this.workshopRepository.update(workshop);

    // Notify enrolled participants of changes
    const enrollments = await this.enrollmentRepository.findByWorkshop(workshopId);
    for (const enrollment of enrollments) {
      await this.notificationService.createWorkshopUpdateNotification(
        enrollment.user,
        workshop,
        'Workshop details have been updated'
      );
    }

    return workshop;
  }

  async enrollInWorkshop(userId: string, workshopId: string, dto: EnrollWorkshopDto): Promise<WorkshopEnrollment> {
    const [user, workshop] = await Promise.all([
      this.userRepository.findById(userId),
      this.workshopRepository.findById(workshopId)
    ]);

    if (!user || !workshop) {
      throw new NotFoundException('User or workshop not found');
    }

    // Check if registration is open
    if (!workshop.isRegistrationOpen) {
      throw new BadRequestException('Registration is not open for this workshop');
    }

    // Check if workshop is full
    if (workshop.availableSlots <= 0) {
      // Add to waitlist
      const enrollment = new WorkshopEnrollment(workshop, user);
      enrollment.status = EnrollmentStatus.WAITLISTED;
      await this.enrollmentRepository.save(enrollment);
      
      await this.notificationService.createEnrollmentNotification(
        user,
        workshop,
        'You have been added to the waitlist'
      );
      
      return enrollment;
    }

    // Check prerequisites
    if (workshop.prerequisites) {
      // Check user level
      if (workshop.prerequisites.minLevel) {
        const userXp = await this.learningHubService.getUserXp(userId);
        if (!userXp.userXp || userXp.userXp.level < workshop.prerequisites.minLevel) {
          throw new BadRequestException(`You need to be at least level ${workshop.prerequisites.minLevel} to enroll`);
        }
      }

      // Check required journeys
      if (workshop.prerequisites.requiredJourneys?.length) {
        // This would check if user has completed required journeys
        // Implementation depends on your journey tracking system
      }
    }

    // Check for existing enrollment
    const existingEnrollment = await this.enrollmentRepository.findByUserAndWorkshop(userId, workshopId);
    if (existingEnrollment) {
      throw new BadRequestException('You are already enrolled in this workshop');
    }

    // Create enrollment
    const enrollment = new WorkshopEnrollment(workshop, user);
    
    // Handle payment if required
    if (workshop.tier !== WorkshopTier.FREE && workshop.price) {
      enrollment.paymentDetails = dto.paymentDetails;
      // In a real system, you would verify payment here
      enrollment.confirm();
    } else {
      enrollment.confirm();
    }

    // Assign to team if team-based workshop
    if (workshop.gamificationConfig.enableTeams && dto.teamPreference) {
      await this.assignToTeam(enrollment, dto.teamPreference);
    }

    await this.enrollmentRepository.save(enrollment);

    // Send confirmation notification
    await this.notificationService.createEnrollmentNotification(
      user,
      workshop,
      'You have successfully enrolled in the workshop'
    );

    // Award XP for enrollment
    await this.learningHubService.awardXp(
      userId,
      50,
      XpSource.WORKSHOP_ENROLLMENT,
      workshopId,
      `Enrolled in ${workshop.title}`
    );

    return enrollment;
  }

  async startSession(userId: string, sessionId: string): Promise<WorkshopSession> {
    const session = await this.sessionRepository.findById(sessionId);
    if (!session) {
      throw new NotFoundException('Session not found');
    }

    // Verify user is instructor
    if (session.workshop.instructor.id !== userId && session.leadInstructor?.id !== userId) {
      throw new ForbiddenException('Only instructors can start sessions');
    }

    session.startSession();
    await this.sessionRepository.update(session);

    // Notify all enrolled participants
    const enrollments = await this.enrollmentRepository.findByWorkshop(session.workshop.id);
    for (const enrollment of enrollments) {
      if (enrollment.status === EnrollmentStatus.CONFIRMED) {
        await this.notificationService.createSessionStartNotification(
          enrollment.user,
          session
        );
      }
    }

    return session;
  }

  async joinByCode(userId: string, code: string): Promise<any> {
    if (!code) {
      throw new BadRequestException('Code is required');
    }

    try {
      // Try workshop code first (simpler, more common)
      try {
        const workshop = await this.workshopRepository.findByCode(code);
        if (workshop) {
          // Auto-enroll user in workshop if not already enrolled
          let enrollment = await this.enrollmentRepository.findByUserAndWorkshop(userId, workshop.id);
          if (!enrollment) {
            const user = await this.userRepository.findById(userId);
            if (!user) {
              throw new NotFoundException('User not found');
            }

            enrollment = new WorkshopEnrollment(workshop, user);
            enrollment.confirm(); // Auto-confirm for workshop code enrollments
            await this.enrollmentRepository.save(enrollment);

            // Award XP for enrollment
            await this.learningHubService.awardXp(
              userId,
              25,
              XpSource.WORKSHOP_ENROLLMENT,
              workshop.id,
              `Quick enrolled in ${workshop.title}`
            );
          }

          // Check for live sessions and auto-join the user
          const liveSessions = await this.sessionRepository.findLiveSessions();
          const workshopLiveSessions = liveSessions.filter(s => s.workshop.id === workshop.id);
          
          if (workshopLiveSessions.length > 0) {
            const liveSession = workshopLiveSessions[0];
            
            // Record attendance
            enrollment.addAttendance(liveSession.id, new Date());
            if (!enrollment.progress.sessionsAttended.includes(liveSession.id)) {
              enrollment.progress.sessionsAttended.push(liveSession.id);
            }
            await this.enrollmentRepository.update(enrollment);
            
            return {
              type: 'live_workshop',
              workshopId: workshop.id,
              workshopTitle: workshop.title,
              workshopCode: workshop.workshopCode,
              sessionId: liveSession.id,
              sessionTitle: liveSession.title,
              sessionCode: liveSession.sessionCode,
              sessionStatus: liveSession.status,
              message: 'Successfully joined live workshop session!',
              redirectUrl: `/workshops/${workshop.id}/live`
            };
          } else {
            return {
              type: 'workshop',
              workshopId: workshop.id,
              workshopTitle: workshop.title,
              workshopCode: workshop.workshopCode,
              message: 'Successfully joined workshop! No live sessions at the moment.',
              redirectUrl: `/workshops/${workshop.id}`
            };
          }
        }
      } catch (err) {
        // Continue to try session code if workshop code fails
      }

      // If workshop code fails, try session code
      const session = await this.sessionRepository.findByCode(code.toUpperCase());
      if (!session) {
        throw new NotFoundException('Code not found. Please check the code and try again.');
      }

      if (!session.isSessionCodeValid()) {
        throw new BadRequestException('Session code has expired');
      }

      // Auto-enroll user in workshop if not already enrolled
      let enrollment = await this.enrollmentRepository.findByUserAndWorkshop(userId, session.workshop.id);
      if (!enrollment) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
          throw new NotFoundException('User not found');
        }

        enrollment = new WorkshopEnrollment(session.workshop, user);
        enrollment.confirm(); // Auto-confirm for session code enrollments
        await this.enrollmentRepository.save(enrollment);

        // Award XP for enrollment
        await this.learningHubService.awardXp(
          userId,
          25,
          XpSource.WORKSHOP_ENROLLMENT,
          session.workshop.id,
          `Quick enrolled in ${session.workshop.title}`
        );
      }

      // Record attendance
      enrollment.addAttendance(session.id, new Date());
      if (!enrollment.progress.sessionsAttended.includes(session.id)) {
        enrollment.progress.sessionsAttended.push(session.id);
      }
      await this.enrollmentRepository.update(enrollment);

      return {
        type: 'session',
        sessionId: session.id,
        workshopId: session.workshop.id,
        sessionTitle: session.title,
        sessionStatus: session.status,
        message: 'Successfully joined session!',
        redirectUrl: `/workshops/${session.workshop.id}/live`
      };
    } catch (error) {
      console.error('Failed to join by code:', error);
      throw error;
    }
  }

  async joinSessionByCode(userId: string, sessionCode: string): Promise<{ sessionId: string; workshopId: string }> {
    const session = await this.sessionRepository.findByCode(sessionCode);
    if (!session) {
      throw new NotFoundException('Invalid session code');
    }

    if (!session.isSessionCodeValid()) {
      throw new BadRequestException('Session code has expired');
    }

    if (session.status !== SessionStatus.LIVE && session.status !== SessionStatus.SCHEDULED) {
      throw new BadRequestException('Session is not available');
    }

    // Auto-enroll user if not already enrolled
    let enrollment = await this.enrollmentRepository.findByUserAndWorkshop(userId, session.workshop.id);
    if (!enrollment) {
      // Quick enrollment via session code
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      enrollment = new WorkshopEnrollment(session.workshop, user);
      enrollment.confirm(); // Auto-confirm for session code enrollments
      await this.enrollmentRepository.save(enrollment);

      // Award XP for enrollment
      await this.learningHubService.awardXp(
        userId,
        25,
        XpSource.WORKSHOP_ENROLLMENT,
        session.workshop.id,
        `Quick enrolled in ${session.workshop.title}`
      );
    }

    // Record attendance
    enrollment.addAttendance(session.id, new Date());
    if (!enrollment.progress.sessionsAttended.includes(session.id)) {
      enrollment.progress.sessionsAttended.push(session.id);
    }
    await this.enrollmentRepository.update(enrollment);

    return {
      sessionId: session.id,
      workshopId: session.workshop.id
    };
  }

  async joinSession(userId: string, sessionId: string): Promise<void> {
    const session = await this.sessionRepository.findById(sessionId);
    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (session.status !== SessionStatus.LIVE) {
      throw new BadRequestException('Session is not live');
    }

    const enrollment = await this.enrollmentRepository.findByUserAndWorkshop(userId, session.workshop.id);
    if (!enrollment || enrollment.status !== EnrollmentStatus.CONFIRMED) {
      throw new ForbiddenException('You are not enrolled in this workshop');
    }

    // Record attendance
    enrollment.addAttendance(sessionId, new Date());
    if (!enrollment.progress.sessionsAttended.includes(sessionId)) {
      enrollment.progress.sessionsAttended.push(sessionId);
    }
    await this.enrollmentRepository.update(enrollment);

    // Award XP for attendance
    await this.learningHubService.awardXp(
      userId,
      25,
      XpSource.WORKSHOP_ATTENDANCE,
      sessionId,
      `Attended ${session.title}`
    );
  }

  async startActivity(userId: string, activityId: string): Promise<SessionActivity> {
    const activity = await this.activityRepository.findById(activityId);
    if (!activity) {
      throw new NotFoundException('Activity not found');
    }

    // Verify user is instructor
    const session = activity.session;
    if (session.workshop.instructor.id !== userId && session.leadInstructor?.id !== userId) {
      throw new ForbiddenException('Only instructors can start activities');
    }

    activity.start();
    await this.activityRepository.update(activity);

    // Notify participants in the session
    const enrollments = await this.enrollmentRepository.findByWorkshop(session.workshop.id);
    for (const enrollment of enrollments) {
      if (enrollment.progress.sessionsAttended.includes(session.id)) {
        await this.notificationService.createActivityStartNotification(
          enrollment.user,
          activity
        );
      }
    }

    return activity;
  }

  async submitActivityResponse(userId: string, activityId: string, dto: SubmitActivityDto): Promise<void> {
    const activity = await this.activityRepository.findById(activityId);
    if (!activity) {
      throw new NotFoundException('Activity not found');
    }

    if (activity.status !== ActivityStatus.ACTIVE) {
      throw new BadRequestException('Activity is not active');
    }

    const enrollment = await this.enrollmentRepository.findByUserAndWorkshop(
      userId,
      activity.session.workshop.id
    );
    if (!enrollment) {
      throw new ForbiddenException('You are not enrolled in this workshop');
    }

    // Add participant if not already added
    activity.addParticipant(userId, enrollment.team?.id);

    // Calculate score based on activity type
    const score = this.calculateActivityScore(activity, dto.response);
    
    // Submit response
    activity.submitResponse(userId, dto.response, score);
    await this.activityRepository.update(activity);

    // Update enrollment progress
    if (!enrollment.progress.activitiesCompleted.includes(activityId)) {
      enrollment.progress.activitiesCompleted.push(activityId);
      enrollment.addPoints(activity.points, activity.xpReward);
      
      // Update performance scores
      if (activity.type === 'QUIZ') {
        enrollment.performance.quizScores[activityId] = score;
      } else if (activity.type === 'CODE_CHALLENGE') {
        enrollment.performance.challengeScores[activityId] = score;
      }
      
      await this.enrollmentRepository.update(enrollment);

      // Award XP
      await this.learningHubService.awardXp(
        userId,
        activity.xpReward,
        XpSource.WORKSHOP_ACTIVITY,
        activityId,
        `Completed ${activity.title}`
      );

      // Update team points if applicable
      if (enrollment.team) {
        enrollment.team.addPoints(activity.points, activity.xpReward);
        enrollment.team.stats.activitiesCompleted++;
        await this.teamRepository.update(enrollment.team);
      }
    }
  }

  async getWorkshopLeaderboard(workshopId: string): Promise<{
    individual: Array<{ user: User; points: number; rank: number }>;
    teams?: Array<{ team: WorkshopTeam; points: number; rank: number }>;
  }> {
    const workshop = await this.workshopRepository.findById(workshopId);
    if (!workshop) {
      throw new NotFoundException('Workshop not found');
    }

    const enrollments = await this.enrollmentRepository.findByWorkshop(workshopId);
    
    // Individual leaderboard
    const individual = enrollments
      .filter(e => e.status === EnrollmentStatus.CONFIRMED)
      .map(e => ({
        user: e.user,
        points: e.progress.totalPoints,
        rank: 0
      }))
      .sort((a, b) => b.points - a.points);

    // Assign ranks
    individual.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    // Update enrollment ranks
    for (const entry of individual) {
      const enrollment = enrollments.find(e => e.user.id === entry.user.id);
      if (enrollment) {
        enrollment.progress.rank = entry.rank;
        await this.enrollmentRepository.update(enrollment);
      }
    }

    // Team leaderboard if applicable
    let teams;
    if (workshop.gamificationConfig.enableTeams) {
      const workshopTeams = await this.teamRepository.findByWorkshop(workshopId);
      teams = workshopTeams
        .map(t => ({
          team: t,
          points: t.stats.totalPoints,
          rank: 0
        }))
        .sort((a, b) => b.points - a.points);

      // Assign team ranks
      teams.forEach((entry, index) => {
        entry.rank = index + 1;
        entry.team.stats.rank = index + 1;
      });

      // Update team ranks
      for (const entry of teams) {
        await this.teamRepository.update(entry.team);
      }
    }

    return { individual, teams };
  }

  async getAllWorkshops(): Promise<Workshop[]> {
    return this.workshopRepository.findAll();
  }

  async getWorkshopById(workshopId: string): Promise<Workshop> {
    const workshop = await this.workshopRepository.findById(workshopId);
    if (!workshop) {
      throw new NotFoundException('Workshop not found');
    }
    return workshop;
  }

  async getWorkshopSessions(workshopId: string): Promise<WorkshopSession[]> {
    const workshop = await this.workshopRepository.findById(workshopId);
    if (!workshop) {
      throw new NotFoundException('Workshop not found');
    }
    return this.sessionRepository.findByWorkshop(workshopId);
  }

  async getEnrollmentStatus(userId: string, workshopId: string): Promise<{ isEnrolled: boolean; enrollment: WorkshopEnrollment | null }> {
    const enrollment = await this.enrollmentRepository.findByUserAndWorkshop(userId, workshopId);
    return {
      isEnrolled: !!enrollment,
      enrollment: enrollment || null
    };
  }

  async canCreateWorkshop(userId: string): Promise<{ canCreate: boolean; userEmail?: string; isInstructor: boolean }> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Anyone can create workshops now
    return {
      canCreate: true,
      userEmail: user.email,
      isInstructor: true
    };
  }

  async startSessionByWorkshopAndSessionId(userId: string, workshopId: string, sessionId: string): Promise<WorkshopSession> {
    const workshop = await this.workshopRepository.findById(workshopId);
    if (!workshop) {
      throw new NotFoundException('Workshop not found');
    }

    // Check if user is the instructor
    if (workshop.instructor.id !== userId) {
      throw new ForbiddenException('Only the workshop instructor can start sessions');
    }

    const session = await this.sessionRepository.findById(sessionId);
    if (!session || session.workshop.id !== workshopId) {
      throw new NotFoundException('Session not found');
    }

    // Start the session
    session.startSession();
    await this.sessionRepository.update(session);

    // Notify all enrolled participants
    const enrollments = await this.enrollmentRepository.findByWorkshop(workshopId);
    for (const enrollment of enrollments) {
      if (enrollment.status === EnrollmentStatus.CONFIRMED) {
        await this.notificationService.createSessionStartNotification(
          enrollment.user,
          session
        );
      }
    }

    return session;
  }

  async completeWorkshop(userId: string, workshopId: string): Promise<void> {
    const workshop = await this.workshopRepository.findById(workshopId);
    if (!workshop) {
      throw new NotFoundException('Workshop not found');
    }

    // Verify user is instructor
    if (workshop.instructor.id !== userId) {
      throw new ForbiddenException('Only the instructor can complete the workshop');
    }

    workshop.complete();
    await this.workshopRepository.update(workshop);

    // Process completions and award badges
    const enrollments = await this.enrollmentRepository.findByWorkshop(workshopId);
    const leaderboard = await this.getWorkshopLeaderboard(workshopId);

    for (const enrollment of enrollments) {
      if (enrollment.status === EnrollmentStatus.CONFIRMED) {
        enrollment.complete();
        
        // Award completion badge
        enrollment.unlockAchievement('workshop-completion', 500);
        
        // Check for perfect attendance
        if (enrollment.attendanceRate === 100) {
          enrollment.unlockAchievement('perfect-attendance', 200);
        }
        
        // Check for top performer
        if (enrollment.progress.rank && enrollment.progress.rank <= 3) {
          enrollment.unlockAchievement('top-performer', 300);
        }
        
        // Award team champion badge if applicable
        if (workshop.gamificationConfig.enableTeams && enrollment.team?.stats.rank === 1) {
          enrollment.unlockAchievement('team-champion', 400);
        }
        
        // Generate certificate
        enrollment.certificateIssuedAt = new Date();
        enrollment.certificateUrl = await this.generateCertificate(enrollment);
        
        await this.enrollmentRepository.update(enrollment);
        
        // Send completion notification
        await this.notificationService.createWorkshopCompletionNotification(
          enrollment.user,
          workshop,
          enrollment
        );
        
        // Award completion XP
        await this.learningHubService.awardXp(
          enrollment.user.id,
          workshop.totalXpReward,
          XpSource.WORKSHOP_COMPLETION,
          workshopId,
          `Completed ${workshop.title}`
        );
      }
    }
  }

  private async assignToTeam(enrollment: WorkshopEnrollment, teamPreference?: string): Promise<void> {
    let team: WorkshopTeam | null = null;
    
    if (teamPreference) {
      // Try to find existing team by name
      team = await this.teamRepository.findByWorkshopAndName(
        enrollment.workshop.id,
        teamPreference
      );
    }
    
    if (!team) {
      // Find team with space or create new one
      const teams = await this.teamRepository.findByWorkshop(enrollment.workshop.id);
      const maxTeamSize = enrollment.workshop.gamificationConfig.teamSize || 5;
      
      team = teams.find(t => t.memberCount < maxTeamSize) || null;
      
      if (!team) {
        // Create new team
        const teamColors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
        const color = teamColors[teams.length % teamColors.length];
        const name = teamPreference || `Team ${teams.length + 1}`;
        
        team = new WorkshopTeam(enrollment.workshop, name, color);
        await this.teamRepository.save(team);
      }
    }
    
    enrollment.team = team;
  }

  private calculateActivityScore(activity: SessionActivity, response: any): number {
    // This is a simplified scoring system
    // In reality, you'd have more complex logic based on activity type
    
    switch (activity.type) {
      case 'QUIZ':
        // Assume response contains answers array and config contains correct answers
        const correctAnswers = activity.config.correctAnswers || [];
        let correct = 0;
        response.answers?.forEach((answer: any, index: number) => {
          if (answer === correctAnswers[index]) correct++;
        });
        return (correct / correctAnswers.length) * 100;
        
      case 'CODE_CHALLENGE':
        // In a real system, this would run tests against the submitted code
        // For now, return a mock score
        return Math.floor(Math.random() * 30) + 70; // Random score between 70-100
        
      case 'POLL':
      case 'DISCUSSION':
        // Participation-based activities get full points for submission
        return 100;
        
      default:
        return 0;
    }
  }

  private async generateCertificate(enrollment: WorkshopEnrollment): Promise<string> {
    // In a real system, this would generate a PDF certificate
    // For now, return a mock URL
    return `https://certificates.learninghub.com/${enrollment.workshop.id}/${enrollment.user.id}`;
  }
}