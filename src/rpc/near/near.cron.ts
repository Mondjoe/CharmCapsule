import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NearIndexer } from './near.indexer';
import { PrismaService } from '../../prisma/prisma.service';
import { NearRewardsIndexer } from './near.rewards';

@Injectable()
export class NearCron {
  constructor(
    private indexer: NearIndexer,
    private rewards: NearRewardsIndexer,
    private prisma: PrismaService,
  ) {}

  @Cron('*/5 * * * *')
  async updateNear() {
    const nearChain = await this.prisma.chain.findFirst({
      where: { type: 'near' },
    });

    if (!nearChain) return;

    await this.indexer.indexValidators(nearChain.id);
  }
}