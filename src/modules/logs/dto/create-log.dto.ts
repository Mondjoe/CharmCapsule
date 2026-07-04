import { IsString } from 'class-validator';

export class CreateLogDto {
  @IsString()
  validatorId: string;

  @IsString()
  level: string; // info | warn | error

  @IsString()
  message: string;
}