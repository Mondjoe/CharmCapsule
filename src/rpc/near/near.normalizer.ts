import { Injectable } from '@nestjs/common';

@Injectable()
export class NearNormalizer {
  normalizeValidator(v: any) {
    return {
      address: v.account_id,
      name: v.account_id,
      status: v.is_slashed ? 'slashed' : 'active',
      commission: null,
      apr: null,
      totalStaked: Number(v.stake) / 1e24, // NEAR uses yoctoNEAR
    };
  }

  normalizeMetric(v: any, epoch: number) {
    return {
      epoch,
      slot: null,
      uptime: v.num_produced_blocks / (v.num_expected_blocks || 1),
      rewards: Number(v.reward) / 1e24,
      stake: Number(v.stake) / 1e24,
    };
  }
}