import { IsString, IsOptional } from 'class-validator';

export class CreateNodeDto {
  @IsString()
  validatorId: string;

  @IsString()
  type: string;

  @IsString()
  endpoint: string;

  @IsOptional()
  @IsString()
  status?: string;
}