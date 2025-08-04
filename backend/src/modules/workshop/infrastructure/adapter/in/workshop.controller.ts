import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  Query, 
  UseGuards, 
  Req,
  BadRequestException,
  NotFoundException,
  ForbiddenException
} from '@nestjs/common';
import { AuthGuard, Public } from '../../../../auth/infrastructure/guard/auth.guard';
import { WorkshopService } from '../../../application/usecase/workshop.service';
import { CreateWorkshopDto } from '../../../application/dto/create-workshop.dto';
import { EnrollWorkshopDto } from '../../../application/dto/enroll-workshop.dto';
import { WorkshopType, WorkshopTier, WorkshopStatus } from '../../../domain/entity/workshop.entity';

@Controller('workshops')
export class WorkshopController {
  constructor(private readonly workshopService: WorkshopService) {}

  @Get()
  async getWorkshops() {
    try {
      const workshops = await this.workshopService.getAllWorkshops();
      
      // Transform workshops to match frontend expectations
      return workshops.map(workshop => ({
        id: workshop.id,
        title: workshop.title,
        description: workshop.description,
        workshopCode: workshop.workshopCode,
        instructor: {
          id: workshop.instructor.id,
          name: workshop.instructor.firstName + ' ' + workshop.instructor.lastName,
          email: workshop.instructor.email,
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          rating: 4.8,
          totalWorkshops: 1
        },
        type: workshop.type,
        tier: workshop.tier,
        status: 'registration_open',
        startDate: workshop.startDate,
        endDate: workshop.endDate,
        maxParticipants: workshop.maxParticipants,
        currentParticipants: workshop.currentParticipants,
        price: workshop.price || 0,
        requirements: workshop.requirements || [],
        learningOutcomes: workshop.learningOutcomes || [],
        totalXpReward: workshop.totalXpReward || 1000,
        badges: workshop.badges || [],
        gamificationConfig: workshop.gamificationConfig || {
          enableTeams: true,
          enableLeaderboard: true,
          enableBattles: true
        },
        schedule: {
          sessions: workshop.schedule?.sessions || []
        },
        locationDetails: workshop.locationDetails,
        prerequisites: workshop.prerequisites
      }));
    } catch (error) {
      console.error('Failed to fetch workshops:', error);
      throw error;
    }
  }

  @Get('can-create')
  @UseGuards(AuthGuard)
  async canCreateWorkshop(@Req() req: any) {
    try {
      return await this.workshopService.canCreateWorkshop(req.user.id);
    } catch (error) {
      console.error('Failed to check workshop creation permission:', error);
      throw error;
    }
  }

  @Get(':id')
  async getWorkshopById(@Param('id') id: string) {
    try {
      const workshop = await this.workshopService.getWorkshopById(id);
      
      // Transform workshop to match frontend expectations
      return {
        id: workshop.id,
        title: workshop.title,
        description: workshop.description,
        workshopCode: workshop.workshopCode,
        instructor: {
          id: workshop.instructor.id,
          name: workshop.instructor.firstName + ' ' + workshop.instructor.lastName,
          email: workshop.instructor.email,
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          rating: 4.8,
          totalWorkshops: 1
        },
        type: workshop.type,
        tier: workshop.tier,
        status: 'registration_open',
        startDate: workshop.startDate,
        endDate: workshop.endDate,
        maxParticipants: workshop.maxParticipants,
        currentParticipants: workshop.currentParticipants,
        price: workshop.price || 0,
        requirements: workshop.requirements || [],
        learningOutcomes: workshop.learningOutcomes || [],
        totalXpReward: workshop.totalXpReward || 1000,
        badges: workshop.badges || [],
        gamificationConfig: workshop.gamificationConfig || {
          enableTeams: true,
          enableLeaderboard: true,
          enableBattles: true
        },
        schedule: {
          sessions: workshop.schedule?.sessions || []
        },
        locationDetails: workshop.locationDetails,
        prerequisites: workshop.prerequisites
      };
    } catch (error) {
      console.error('Failed to fetch workshop:', error);
      throw error;
    }
  }

  @Post()
  @UseGuards(AuthGuard)
  async createWorkshop(@Body() workshopData: any, @Req() req: any) {
    try {
      // Create CreateWorkshopDto
      const createDto: CreateWorkshopDto = {
        title: workshopData.title,
        description: workshopData.description,
        type: workshopData.type as WorkshopType || WorkshopType.ONLINE,
        tier: workshopData.tier as WorkshopTier || WorkshopTier.FREE,
        startDate: workshopData.startDate,
        endDate: workshopData.endDate,
        maxParticipants: workshopData.maxParticipants || 50,
        price: workshopData.price,
        requirements: workshopData.requirements,
        learningOutcomes: workshopData.learningOutcomes,
        totalXpReward: workshopData.totalXpReward || 1000,
        schedule: workshopData.schedule || {
          timezone: 'UTC',
          sessions: []
        },
        locationDetails: workshopData.locationDetails,
        gamificationConfig: workshopData.gamificationConfig || {
          enableTeams: true,
          enableLeaderboard: true,
          enableBattles: true,
          enableAchievements: true,
          pointsPerActivity: {},
          bonusPoints: {
            firstPlace: 500,
            secondPlace: 300,
            thirdPlace: 200,
            participation: 100
          }
        },
        prerequisites: workshopData.prerequisites
      };

      const workshop = await this.workshopService.createWorkshop(req.user.id, createDto);
      
      // Transform workshop to match frontend expectations
      return {
        id: workshop.id,
        title: workshop.title,
        description: workshop.description,
        workshopCode: workshop.workshopCode,
        instructor: {
          id: workshop.instructor.id,
          name: workshop.instructor.firstName + ' ' + workshop.instructor.lastName,
          email: workshop.instructor.email,
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          rating: 4.8,
          totalWorkshops: 1
        },
        type: workshop.type,
        tier: workshop.tier,
        status: 'registration_open',
        startDate: workshop.startDate,
        endDate: workshop.endDate,
        maxParticipants: workshop.maxParticipants,
        currentParticipants: workshop.currentParticipants,
        price: workshop.price || 0,
        requirements: workshop.requirements || [],
        learningOutcomes: workshop.learningOutcomes || [],
        totalXpReward: workshop.totalXpReward || 1000,
        badges: workshop.badges || [],
        gamificationConfig: workshop.gamificationConfig || {
          enableTeams: true,
          enableLeaderboard: true,
          enableBattles: true
        },
        schedule: {
          sessions: workshop.schedule?.sessions || []
        },
        locationDetails: workshop.locationDetails,
        prerequisites: workshop.prerequisites
      };
    } catch (error) {
      console.error('Failed to create workshop:', error);
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Post('join-by-code')
  async joinByCode(
    @Body('code') code: string,
    @Req() req: any
  ) {
    try {
      return await this.workshopService.joinByCode(req.user.id, code);
    } catch (error) {
      console.error('Failed to join by code:', error);
      throw error;
    }
  }

  @Get(':id/sessions')
  async getWorkshopSessions(@Param('id') workshopId: string) {
    try {
      const sessions = await this.workshopService.getWorkshopSessions(workshopId);
      
      // Transform sessions to match frontend expectations
      return sessions.map(session => ({
        id: session.id,
        workshopId: session.workshop.id,
        title: session.title,
        description: session.description,
        startTime: session.scheduledStartTime,
        endTime: session.scheduledEndTime,
        status: session.status.toLowerCase(),
        sessionCode: session.sessionCode,
        participants: []
      }));
    } catch (error) {
      console.error('Failed to fetch workshop sessions:', error);
      throw error;
    }
  }

  @Post(':workshopId/enroll')
  @UseGuards(AuthGuard)
  async enrollInWorkshop(
    @Param('workshopId') workshopId: string,
    @Body() enrollmentData: any,
    @Req() req: any
  ) {
    try {
      const enrollDto: EnrollWorkshopDto = {
        teamPreference: enrollmentData.teamPreference,
        paymentDetails: enrollmentData.paymentDetails
      };

      const enrollment = await this.workshopService.enrollInWorkshop(req.user.id, workshopId, enrollDto);
      
      return {
        id: enrollment.id,
        userId: enrollment.user.id,
        workshopId: enrollment.workshop.id,
        status: enrollment.status,
        enrolledAt: enrollment.enrolledAt,
        user: {
          id: enrollment.user.id,
          name: enrollment.user.firstName + ' ' + enrollment.user.lastName,
          email: enrollment.user.email
        },
        progress: enrollment.progress
      };
    } catch (error) {
      console.error('Failed to enroll in workshop:', error);
      throw error;
    }
  }

  @Get(':workshopId/leaderboard')
  async getWorkshopLeaderboard(@Param('workshopId') workshopId: string) {
    try {
      return await this.workshopService.getWorkshopLeaderboard(workshopId);
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
      // Return mock data on error
      return {
        individual: [
          { user: { name: 'Test User' }, points: 100, rank: 1 }
        ],
        teams: []
      };
    }
  }

  @Get(':workshopId/enrollment-status')
  @UseGuards(AuthGuard)
  async getEnrollmentStatus(
    @Param('workshopId') workshopId: string,
    @Req() req: any
  ) {
    try {
      return await this.workshopService.getEnrollmentStatus(req.user.id, workshopId);
    } catch (error) {
      console.error('Failed to check enrollment status:', error);
      return { isEnrolled: false, enrollment: null };
    }
  }

  @Post(':workshopId/sessions/:sessionId/join')
  @UseGuards(AuthGuard)
  async joinSession(
    @Param('workshopId') workshopId: string,
    @Param('sessionId') sessionId: string,
    @Req() req: any
  ) {
    try {
      await this.workshopService.joinSession(req.user.id, sessionId);
      
      return {
        message: 'Successfully joined session',
        joinUrl: `/workshops/${workshopId}/live`
      };
    } catch (error) {
      console.error('Failed to join session:', error);
      throw error;
    }
  }

  @Post(':workshopId/sessions/:sessionId/start')
  @UseGuards(AuthGuard)
  async startSession(
    @Param('workshopId') workshopId: string,
    @Param('sessionId') sessionId: string,
    @Req() req: any
  ) {
    try {
      const session = await this.workshopService.startSessionByWorkshopAndSessionId(req.user.id, workshopId, sessionId);
      
      return {
        message: 'Session started successfully',
        session: {
          id: session.id,
          title: session.title,
          status: session.status.toLowerCase(),
          sessionCode: session.sessionCode
        },
        sessionCode: session.sessionCode
      };
    } catch (error) {
      console.error('Failed to start session:', error);
      throw error;
    }
  }

  @Get('live-sessions')
  async getLiveSessions() {
    try {
      // This would normally get live sessions from the service
      // For now, return empty array
      return [];
    } catch (error) {
      console.error('Failed to fetch live sessions:', error);
      throw error;
    }
  }
}