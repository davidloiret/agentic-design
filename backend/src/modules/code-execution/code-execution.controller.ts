import { Controller, Post, Body, HttpCode, HttpStatus, Inject, BadRequestException } from '@nestjs/common';
import { CodeExecutionService } from './code-execution.service';

export interface ExecuteCodeDto {
  code: string;
  language: string;
}

@Controller('code')
export class CodeExecutionController {
  constructor(
    @Inject('CodeExecutionService') private readonly codeExecutionService: CodeExecutionService,
  ) {}

  @Post('execute')
  @HttpCode(HttpStatus.OK)
  async executeCode(@Body() dto: ExecuteCodeDto) {
    if (!dto.code || !dto.language) {
      throw new BadRequestException('Code and language are required');
    }

    const supportedLanguages = ['python', 'rust', 'typescript'];
    if (!supportedLanguages.includes(dto.language)) {
      throw new BadRequestException(`Unsupported language: ${dto.language}. Supported: ${supportedLanguages.join(', ')}`);
    }

    // Backend controls timeout - always set to 60 seconds
    return await this.codeExecutionService.executeCode({
      ...dto,
      timeout: 60
    });
  }
}