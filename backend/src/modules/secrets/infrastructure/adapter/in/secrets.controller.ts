import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Body,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { SecretsService } from '../../../application/usecase/secrets.service';
import { Public } from '../../../../auth/infrastructure/guard/auth.guard';
import { SecretResponseDto } from '../../../application/dto/secret-response.dto';

@ApiTags('secrets')
@Public()  // Make entire controller public - bypass auth guard
@Controller('secrets')
export class SecretsController {
  constructor(private readonly secretsService: SecretsService) {}

  @Get('test')
  @ApiOperation({ summary: 'Test endpoint' })
  async test() {
    console.log('Secrets controller test endpoint hit');
    return { message: 'Secrets controller is working', timestamp: new Date().toISOString() };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new secret' })
  @ApiResponse({ status: 201, description: 'Secret created successfully' })
  @ApiResponse({ status: 413, description: 'Vault too large' })
  async createSecret(@Body() createSecretDto: any) {
    try {
      console.log('=== SECRETS CONTROLLER START ===');
      console.log('Received body:', JSON.stringify(createSecretDto, null, 2));
      console.log('Request data:', {
        id: createSecretDto.id,
        vaultSize: createSecretDto.vault?.length || 0,
        expiresAt: createSecretDto.expiresAt,
        maxViews: createSecretDto.maxViews
      });
      
      // Test if service is the issue
      console.log('About to call service...');
      const result = await this.secretsService.createSecret(createSecretDto);
      console.log('Service call successful:', result);
      console.log('=== SECRETS CONTROLLER END ===');
      
      return result;
    } catch (error) {
      console.error('=== ERROR IN SECRETS CONTROLLER ===');
      console.error('Error type:', error.constructor.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      console.error('=== END ERROR ===');
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve a secret' })
  @ApiQuery({ name: 'id', description: 'Secret ID' })
  @ApiResponse({ status: 200, description: 'Secret retrieved', type: SecretResponseDto })
  @ApiResponse({ status: 404, description: 'Secret not found or expired' })
  async getSecret(@Query('id') id: string): Promise<SecretResponseDto> {
    return this.secretsService.getSecret(id);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete a secret' })
  @ApiQuery({ name: 'id', description: 'Secret ID' })
  @ApiResponse({ status: 200, description: 'Secret deleted successfully' })
  @ApiResponse({ status: 404, description: 'Secret not found' })
  async deleteSecret(@Query('id') id: string) {
    return this.secretsService.deleteSecret(id);
  }

  @Patch()
  @ApiOperation({ summary: 'Cleanup expired secrets' })
  @ApiResponse({ status: 200, description: 'Cleanup completed' })
  async cleanupExpiredSecrets() {
    return this.secretsService.cleanupExpiredSecrets();
  }
}