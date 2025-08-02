import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CodeExecutionController } from './code-execution.controller';
import { CodeExecutionService } from './code-execution.service';

@Module({
  imports: [ConfigModule],
  controllers: [CodeExecutionController],
  providers: [
    {
      provide: 'CodeExecutionService',
      useClass: CodeExecutionService,
    },
  ],
  exports: ['CodeExecutionService'],
})
export class CodeExecutionModule {}