import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '../../../auth/infrastructure/guard/auth.guard';
import { VcfExpertsService } from '../application/vcf-experts.service';
import { VcfExpertEntity } from '../domain/vcf-expert.entity';

@Controller('api/v1/vcf/experts')
@UseGuards(AuthGuard)
export class VcfExpertsController {
  constructor(
    private readonly expertsService: VcfExpertsService,
  ) {}

  @Post('apply')
  @HttpCode(HttpStatus.CREATED)
  async applyAsExpert(
    @Request() req,
    @Body() body: {
      bio: string;
      expertise: string[];
      programmingLanguages: string[];
      frameworks: string[];
      yearsOfExperience: number;
      certifications?: string[];
      githubUrl?: string;
      linkedinUrl?: string;
      portfolioUrl?: string;
      hourlyRate?: number;
      availability?: VcfExpertEntity['availability'];
    },
  ) {
    return this.expertsService.applyAsExpert(req.user, body);
  }

  @Get('profile')
  async getMyExpertProfile(@Request() req) {
    return this.expertsService.getExpertByUserId(req.user.id);
  }

  @Put('profile')
  async updateMyProfile(
    @Request() req,
    @Body() body: Partial<{
      bio: string;
      expertise: string[];
      programmingLanguages: string[];
      frameworks: string[];
      certifications: string[];
      githubUrl: string;
      linkedinUrl: string;
      portfolioUrl: string;
      hourlyRate: number;
      availability: VcfExpertEntity['availability'];
      preferredSessionTypes: string[];
      maxConcurrentSessions: number;
    }>,
  ) {
    return this.expertsService.updateExpertProfile(req.user.id, body);
  }

  @Put('availability/toggle')
  async toggleAvailability(@Request() req) {
    return this.expertsService.toggleAvailability(req.user.id);
  }

  @Get('available')
  async getAvailableExperts(
    @Query('languages') languages?: string,
    @Query('frameworks') frameworks?: string,
  ) {
    const langArray = languages ? languages.split(',') : undefined;
    const frameworkArray = frameworks ? frameworks.split(',') : undefined;
    return this.expertsService.findAvailableExperts(langArray, frameworkArray);
  }

  @Get('search')
  async searchExperts(@Query('q') query: string) {
    return this.expertsService.searchExperts(query);
  }

  @Get('top')
  async getTopExperts() {
    return this.expertsService.getTopExperts();
  }

  @Get(':id')
  async getExpertProfile(@Param('id') expertId: string) {
    return this.expertsService.getExpertProfile(expertId);
  }

  @Post(':id/approve')
  @HttpCode(HttpStatus.NO_CONTENT)
  async approveExpert(@Param('id') expertId: string) {
    await this.expertsService.approveExpert(expertId);
  }

  @Post(':id/suspend')
  @HttpCode(HttpStatus.NO_CONTENT)
  async suspendExpert(
    @Param('id') expertId: string,
    @Body() body: { reason: string },
  ) {
    await this.expertsService.suspendExpert(expertId, body.reason);
  }

  @Post(':id/reactivate')
  @HttpCode(HttpStatus.NO_CONTENT)
  async reactivateExpert(@Param('id') expertId: string) {
    await this.expertsService.reactivateExpert(expertId);
  }

  @Get('check/availability')
  async checkCanAcceptSessions(@Request() req) {
    const canAccept = await this.expertsService.canAcceptMoreSessions(req.user.id);
    return { canAccept };
  }
}