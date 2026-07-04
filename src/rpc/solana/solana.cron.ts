import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SolanaIndexer } from './solana.indexer';
import { PrismaService } from '../../prisma/prisma.service';
import { SolanaRewardsIndexer } from './solana.rewards';

@Injectable()
export class SolanaCron {
  constructor(
    private indexer: SolanaIndexer,
    private prisma: PrismaService,
    private rewards: SolanaRewardsIndexer,
  ) {}

  @Cron('*/5 * * * *') // every 5 minutes
  async updateSolana() {
    const solanaChain = await this.prisma.chain.findFirst({
      where: { type: 'solana' },
    });

    if (!solanaChain) return;

    await this.indexer.indexValidators(solanaChain.id);
  }
}