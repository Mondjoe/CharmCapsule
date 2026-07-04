import { IsOptional, IsString } from 'class-validator';

export class UpdateChainDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  type?: string;
}