import { IsOptional, IsObject, IsString } from 'class-validator';

export class EnrollWorkshopDto {
  @IsOptional()
  @IsString()
  teamPreference?: string;

  @IsOptional()
  @IsObject()
  paymentDetails?: {
    amount: number;
    currency: string;
    paymentMethod: string;
    transactionId: string;
    paidAt: Date;
  };
}