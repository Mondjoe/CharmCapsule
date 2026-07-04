import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateLogDto } from './dto/create-log.dto';

@Injectable()
export class LogsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateLogDto) {
    // Ensure validator exists
    const validator = await this.prisma.validator.findUnique({
      where: { id: dto.validatorId },
    });

    if (!validator) throw new NotFoundException('Validator not found');

    return this.prisma.validatorLog.create({
      data: {
        validatorId: dto.validatorId,
        level: dto.level,
        message: dto.message,
      },
    });
  }

  async findAll() {
    return this.prisma.validatorLog.findMany({
      orderBy: { timestamp: 'desc' },
      include: { validator: true },
    });
  }

  async findByValidator(validatorId: string) {
    return this.prisma.validatorLog.findMany({
      where: { validatorId },
      orderBy: { timestamp: 'desc' },
    });
  }
}