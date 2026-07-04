import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AptosService } from './aptos.service';

@Injectable()
export class AptosRewardsIndexer {
  constructor(
    private prisma: PrismaService,
    private aptos: AptosService,
  ) {}

  async indexRewards(chainId: string) {
    const validators = await this.prisma.validator.findMany({
      where: { chainId },
    });

    for (const v of validators) {
      const resources = await this.aptos.getStakingInfo(v.address);

      const staking = resources.find((r: any) =>
        r.type.includes('0x1::staking_contract::StakingContract')
      );

      if (!staking) continue;

      const rewards = staking.data?.rewards || 0;
      const stake = staking.data?.principal || 0;

      await this.prisma.validatorMetric.create({
        data: {
          validatorId: v.id,
          epoch: null,
          rewards: Number(rewards) / 1e8,
          stake: Number(stake) / 1e8,
          uptime: null,
          slot: null,
        },
      });
    }

    return validators.length;
  }
}