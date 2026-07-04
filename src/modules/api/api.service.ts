import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class ApiService {
  constructor(private prisma: PrismaService) {}

  // All chains
  getChains() {
    return this.prisma.chain.findMany({
      orderBy: { createdAt: 'asc' },
    });
  }

  // All validators (multi-chain)
  getValidators() {
    return this.prisma.validator.findMany({
      include: {
        chain: true,
      },
      orderBy: { totalStaked: 'desc' },
    });
  }

  // Validators by chain
  getValidatorsByChain(chainId: string) {
    return this.prisma.validator.findMany({
      where: { chainId },
      include: { chain: true },
      orderBy: { totalStaked: 'desc' },
    });
  }

  // Single validator
  getValidator(id: string) {
    return this.prisma.validator.findUnique({
      where: { id },
      include: {
        chain: true,
        metrics: {
          orderBy: { createdAt: 'desc' },
          take: 100,
        },
        logs: {
          orderBy: { timestamp: 'desc' },
          take: 50,
        },
        nodes: true,
      },
    });
  }

  // Metrics only
  getValidatorMetrics(id: string) {
    return this.prisma.validatorMetric.findMany({
      where: { validatorId: id },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
  }

  // Logs only
  getValidatorLogs(id: string) {
    return this.prisma.validatorLog.findMany({
      where: { validatorId: id },
      orderBy: { timestamp: 'desc' },
      take: 100,
    });
  }

  // Nodes only
  getValidatorNodes(id: string) {
    return this.prisma.node.findMany({
      where: { validatorId: id },
    });
  }

  // Dashboard overview
  async getOverview() {
    const chains = await this.prisma.chain.count();
    const validators = await this.prisma.validator.count();
    const metrics = await this.prisma.validatorMetric.count();

    return {
      chains,
      validators,
      metrics,
    };
  }
}