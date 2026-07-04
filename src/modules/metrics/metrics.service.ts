import { IsString, IsOptional, IsNumber } from 'class-validator';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateMetricDto } from './dto/create-metric.dto';

@Injectable()
export class MetricsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMetricDto) {
    // Ensure validator exists
    const validator = await this.prisma.validator.findUnique({
      where: { id: dto.validatorId },
    });

    if (!validator) throw new NotFoundException('Validator not found');

    return this.prisma.validatorMetric.create({
      data: {
        validatorId: dto.validatorId,
        epoch: dto.epoch,
        slot: dto.slot,
        uptime: dto.uptime,
        rewards: dto.rewards,
        stake: dto.stake,
      },
    });
  }

  async findByValidator(validatorId: string) {
    return this.prisma.validatorMetric.findMany({
      where: { validatorId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAll() {
    return this.prisma.validatorMetric.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}