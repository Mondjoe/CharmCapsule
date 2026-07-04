import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SolanaService } from './solana.service';

@Injectable()
export class SolanaRewardsIndexer {
  constructor(
    private prisma: PrismaService,
    private solana: SolanaService,
  ) {}

  async indexRewards(chainId: string) {
    const validators = await this.prisma.validator.findMany({
      where: { chainId },
    });

    if (!validators.length) return;

    const addresses = validators.map(v => v.address);

    const rewards = await this.solana.getInflationReward(addresses);

    for (let i = 0; i < validators.length; i++) {
      const validator = validators[i];
      const reward = rewards[i];

      if (!reward) continue;

      await this.prisma.validatorMetric.create({
        data: {
          validatorId: validator.id,
          epoch: reward.epoch,
          rewards: reward.amount / 1e9, // lamports → SOL
          stake: reward.postBalance / 1e9,
          uptime: null,
          slot: null,
        },
      });
    }

    return rewards.length;
  }
}