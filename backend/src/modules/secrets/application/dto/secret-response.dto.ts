import { ApiProperty } from '@nestjs/swagger';

export class SecretResponseDto {
  @ApiProperty({ type: [Number] })
  vault: number[];

  @ApiProperty()
  viewCount: number;

  @ApiProperty()
  maxViews: number;

  @ApiProperty()
  expiresAt: string;

  @ApiProperty()
  isLastView: boolean;
}