import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateMetricDto {
  @IsString()
  validatorId: string;

  @IsOptional()
  @IsNumber()
  epoch?: number;

  @IsOptional()
  @IsNumber()
  slot?: number;

  @IsOptional()
  @IsNumber()
  uptime?: number;

  @IsOptional()
  @IsNumber()
  rewards?: number;

  @IsOptional()
  @IsNumber()
  stake?: number;
}