import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { NearService } from './near.service';

@Injectable()
export class NearRewardsIndexer {
  constructor(
    private prisma: PrismaService,
    private near: NearService,
  ) {}

  async indexRewards(chainId: string) {
    const data = await this.near.getValidators();
    const epoch = data.epoch_height;

    const all = [
      ...data.current_validators,
      ...data.next_validators,
      ...data.prev_validators,
    ];

    for (const v of all) {
      const validator = await this.prisma.validator.findFirst({
        where: { chainId, address: v.account_id },
      });

      if (!validator) continue;

      const reward = Number(v.reward || 0) / 1e24;
      const stake = Number(v.stake || 0) / 1e24;

      await this.prisma.validatorMetric.create({
        data: {
          validatorId: validator.id,
          epoch,
          rewards: reward,
          stake,
          uptime: v.num_produced_blocks / (v.num_expected_blocks || 1),
          slot: null,
        },
      });
    }

    return all.length;
  }
}