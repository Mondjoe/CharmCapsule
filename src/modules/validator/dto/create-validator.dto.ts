import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateValidatorDto {
  @IsString()
  chainId: string;

  @IsString()
  address: string;

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