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
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuditService } from '../../application/service/audit.service';
import { CreateAuditDto } from '../../application/dto/create-audit.dto';
import { UpdateAuditDto } from '../../application/dto/update-audit.dto';
import { Audit } from '../../domain/entity/audit.entity';

@Controller('api/audits')
// @UseGuards(JwtAuthGuard) // Uncomment when auth is implemented
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createAudit(
    @Body() createAuditDto: CreateAuditDto,
    // @CurrentUser() user: any, // Uncomment when auth is implemented
  ): Promise<Audit> {
    // const userId = user?.id; // Uncomment when auth is implemented
    const userId = 'temp-user-id'; // Temporary for development
    return this.auditService.createAudit(createAuditDto, userId);
  }

  @Get(':id')
  async findAuditById(@Param('id') id: string): Promise<Audit> {
    return this.auditService.findAuditById(id);
  }

  @Get(':id/with-findings')
  async findAuditByIdWithFindings(@Param('id') id: string): Promise<Audit> {
    return this.auditService.findAuditByIdWithFindings(id);
  }

  @Get()
  async findUserAudits(
    // @CurrentUser() user: any, // Uncomment when auth is implemented
  ): Promise<Audit[]> {
    // const userId = user?.id; // Uncomment when auth is implemented
    const userId = 'temp-user-id'; // Temporary for development
    return this.auditService.findUserAudits(userId);
  }

  @Put(':id')
  async updateAudit(
    @Param('id') id: string,
    @Body() updateAuditDto: UpdateAuditDto,
  ): Promise<Audit> {
    return this.auditService.updateAudit(id, updateAuditDto);
  }

  @Put(':id/progress')
  async updateAuditProgress(@Param('id') id: string): Promise<Audit> {
    return this.auditService.updateAuditProgress(id);
  }

  @Get(':id/statistics')
  async getAuditStatistics(@Param('id') id: string): Promise<any> {
    return this.auditService.getAuditStatistics(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAudit(@Param('id') id: string): Promise<void> {
    return this.auditService.deleteAudit(id);
  }
}