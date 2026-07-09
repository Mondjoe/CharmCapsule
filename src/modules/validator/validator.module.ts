import { Module } from '@nestjs/common';
import { ValidatorService } from './validator.service';
import { ValidatorController } from './validator.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [ValidatorController],
  providers: [ValidatorService, PrismaService],
})
export class ValidatorModule {}