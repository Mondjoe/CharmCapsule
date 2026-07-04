import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateValidatorDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsNumber()
  commission?: number;

  @IsOptional()
  @IsNumber()
  apr?: number;

  @IsOptional()
  @IsNumber()
  totalStaked?: number;
}