import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AptosIndexer } from './aptos.indexer';
import { PrismaService } from '../../prisma/prisma.service';
import { AptosRewardsIndexer } from './aptos.rewards';

@Injectable()
export class AptosCron {
  constructor(
    private indexer: AptosIndexer,
    private rewards: AptosRewardsIndexer,
    private prisma: PrismaService,
  ) {}

  @Cron('*/5 * * * *')
  async updateAptos() {
    const aptosChain = await this.prisma.chain.findFirst({
      where: { type: 'aptos' },
    });

    if (!aptosChain) return;

    await this.indexer.indexValidators(aptosChain.id);
  }
}