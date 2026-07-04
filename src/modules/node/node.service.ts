import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateNodeDto } from './dto/create-node.dto';
import { UpdateNodeDto } from './dto/update-node.dto';

@Injectable()
export class NodeService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateNodeDto) {
    const validator = await this.prisma.validator.findUnique({
      where: { id: dto.validatorId },
    });

    if (!validator) throw new NotFoundException('Validator not found');

    return this.prisma.node.create({
      data: {
        chainId: validator.chainId,
        validatorId: dto.validatorId,
        endpoint: dto.endpoint,
        type: dto.type,
        name: null,
      },
    });
  }

  async findAll() {
    return this.prisma.node.findMany({
      include: { validator: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByValidator(validatorId: string) {
    return this.prisma.node.findMany({
      where: { validatorId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const node = await this.prisma.node.findUnique({
      where: { id },
      include: { validator: true },
    });

    if (!node) throw new NotFoundException('Node not found');
    return node;
  }

  async update(id: string, dto: UpdateNodeDto) {
    return this.prisma.node.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return this.prisma.node.delete({
      where: { id },
    });
  }
}
