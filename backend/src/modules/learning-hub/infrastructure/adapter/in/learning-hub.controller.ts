import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Query, 
  UseGuards,
  Req,
  HttpStatus,
  HttpCode
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../../../../auth/infrastructure/guard/auth.guard';
import { LearningHubService } from '../../../application/usecase/learning-hub.service';
import { AchievementService } from '../../../application/usecase/achievement.service';
import { UpdateProgressDto } from '../../../application/dto/update-progress.dto';
import {
  UserStatsResponseDto,
  UserProgressResponseDto,
  UserXpResponseDto,
  LeaderboardResponseDto
} from '../../../application/dto/user-stats.dto';

@Controller('learning-hub')
@UseGuards(AuthGuard)
export class LearningHubController {
  constructor(
    private readonly learningHubService: LearningHubService,
    private readonly achievementService: AchievementService,
  ) {}

  @Post('progress')
  @HttpCode(HttpStatus.OK)
  async updateProgress(
    @Body() dto: UpdateProgressDto,
    @Req() request: Request,
  ) {
    const user = request['user'];
    console.log('[LearningHub] Update progress request:', { 
      user: user ? { id: user.id, email: user.email } : 'undefined',
      dto 
    });
    
    if (!user || !user.id) {
      throw new Error('User not found in request');
    }

    try {
      const progress = await this.learningHubService.updateProgress(
        user.id,
        dto.courseId,
        dto.lessonId,
        dto.progressPercentage,
        dto.timeSpent,
        dto.xpEarned,
        dto.journeyId,
        dto.chapterId,
        dto.score,
        dto.isCompleted,
      );

      return {
        success: true,
        data: progress,
        message: 'Progress updated successfully',
      };
    } catch (error) {
      console.error('[LearningHub] Error updating progress:', error);
      throw error;
    }
  }

  @Get('progress')
  async getUserProgress(
    @Query('courseId') courseId: string,
    @Req() request: Request,
  ): Promise<UserProgressResponseDto> {
    const user = request['user'];
    return this.learningHubService.getUserProgress(user.id, courseId);
  }

  @Get('achievements')
  async getUserAchievements(@Req() request: Request) {
    const user = request['user'];
    const achievementData = await this.achievementService.getUserAchievements(user.id);
    
    return {
      success: true,
      data: achievementData,
    };
  }

  @Get('achievements/progress')
  async getUserAchievementProgress(@Req() request: Request) {
    const user = request['user'];
    const progress = await this.achievementService.getUserAchievementProgress(user.id);
    
    return {
      success: true,
      data: progress,
    };
  }

  @Get('xp')
  async getUserXp(@Req() request: Request): Promise<UserXpResponseDto> {
    const user = request['user'];
    return this.learningHubService.getUserXp(user.id);
  }

  @Get('streak')
  async getUserStreak(@Req() request: Request) {
    const user = request['user'];
    const streak = await this.learningHubService.getUserStreak(user.id);
    
    return {
      success: true,
      data: streak,
    };
  }

  @Get('stats')
  async getUserStats(@Req() request: Request): Promise<UserStatsResponseDto> {
    const user = request['user'];
    return this.learningHubService.getUserStats(user.id);
  }

  @Get('leaderboard')
  async getLeaderboard(): Promise<LeaderboardResponseDto> {
    return this.learningHubService.getLeaderboard();
  }

  @Get('progress/:courseId')
  async getCourseProgress(
    @Param('courseId') courseId: string,
    @Req() request: Request,
  ): Promise<UserProgressResponseDto> {
    const user = request['user'];
    return this.learningHubService.getUserProgress(user.id, courseId);
  }
}