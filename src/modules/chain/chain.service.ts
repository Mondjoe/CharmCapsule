import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateChainDto } from './dto/create-chain.dto';
import { UpdateChainDto } from './dto/update-chain.dto';

@Injectable()
export class ChainService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateChainDto) {
    return this.prisma.chain.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.chain.findMany({
      orderBy: { createdAt: 'asc' },
    });
  }

  async findOne(id: string) {
    const chain = await this.prisma.chain.findUnique({ where: { id } });
    if (!chain) throw new NotFoundException('Chain not found');
    return chain;
  }

  async update(id: string, dto: UpdateChainDto) {
    return this.prisma.chain.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return this.prisma.chain.delete({
      where: { id },
    });
  }

  // Seed default chains
  async seedDefaultChains() {
    const defaults = [
      { name: 'Solana', type: 'solana' },
      { name: 'Aptos', type: 'aptos' },
      { name: 'NEAR', type: 'near' },
      { name: 'EVM', type: 'evm' },
    ];

    for (const chain of defaults) {
      await this.prisma.chain.upsert({
        where: { name: chain.name },
        update: {},
        create: chain,
      });
    }

    return this.findAll();
  }
}