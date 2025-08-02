import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface ExecuteCodeDto {
  code: string;
  language: string;
  timeout: number;
}

export interface ExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  execution_time: number;
  vm_id: string;
}

@Injectable()
export class CodeExecutionService {
  private readonly firecrackerApiUrl: string;

  constructor(private configService: ConfigService) {
    this.firecrackerApiUrl = this.configService.get<string>('FIRECRACKER_API_URL') || 'http://firecracker-api:8000';
  }

  async executeCode(dto: ExecuteCodeDto): Promise<ExecutionResult> {
    try {
      const response = await fetch(`${this.firecrackerApiUrl}/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: dto.code,
          language: dto.language,
          timeout: dto.timeout,
        }),
        signal: AbortSignal.timeout(dto.timeout * 1000 + 5000), // Add 5s buffer
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new HttpException(
          errorData?.error || 'Code execution failed',
          response.status
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new HttpException(
          'Code execution timed out',
          HttpStatus.REQUEST_TIMEOUT
        );
      }
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new HttpException(
          'Code execution service is unavailable',
          HttpStatus.SERVICE_UNAVAILABLE
        );
      }

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Internal server error during code execution',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}