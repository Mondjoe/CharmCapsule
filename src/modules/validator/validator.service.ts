import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateValidatorDto } from './dto/create-validator.dto';
import { UpdateValidatorDto } from './dto/update-validator.dto';

@Injectable()
export class ValidatorService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateValidatorDto) {
    return this.prisma.validator.create({
      data: {
        chainId: dto.chainId,
        address: dto.address,
        name: dto.name,
        status: dto.status ?? 'active',
        commission: dto.commission,
        apr: dto.apr,
        totalStaked: dto.totalStaked,
      },
    });
  }

  async findAll() {
    return this.prisma.validator.findMany({
      include: { chain: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByChain(chainId: string) {
    return this.prisma.validator.findMany({
      where: { chainId },
      include: { chain: true },
    });
  }

  async findOne(id: string) {
    const validator = await this.prisma.validator.findUnique({
      where: { id },
      include: { chain: true, metrics: true, logs: true, nodes: true },
    });

    if (!validator) throw new NotFoundException('Validator not found');
    return validator;
  }

  async update(id: string, dto: UpdateValidatorDto) {
    return this.prisma.validator.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return this.prisma.validator.delete({
      where: { id },
    });
  }
}