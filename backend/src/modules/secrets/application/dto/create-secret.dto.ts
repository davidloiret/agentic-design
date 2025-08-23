import { IsString, IsArray, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSecretDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty({ type: [Number] })
  @IsArray()
  vault: number[];

  @ApiProperty()
  @IsDateString()
  expiresAt: string;

  @ApiProperty()
  @IsNumber()
  maxViews: number;
}