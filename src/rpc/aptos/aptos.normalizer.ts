import { Injectable } from '@nestjs/common';

@Injectable()
export class AptosNormalizer {
  normalizeValidator(v: any) {
    return {
      address: v.account_address,
      name: v.config?.consensus_public_key || null,
      status: v.active ? 'active' : 'inactive',
      commission: v.commission_percentage || 0,
      apr: v.rewards_rate || null,
      totalStaked: v.voting_power || 0,
    };
  }

  normalizeMetric(v: any) {
    return {
      epoch: v.epoch,
      slot: null,
      uptime: v.uptime_percentage || null,
      rewards: v.rewards_amount || null,
      stake: v.voting_power || null,
    };
  }
}