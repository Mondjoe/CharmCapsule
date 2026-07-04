import { Injectable } from '@nestjs/common';

@Injectable()
export class EvmNormalizer {
  normalizeEthereum(v: any) {
    return {
      address: v.validator.pubkey,
      name: v.validator.pubkey,
      status: v.status,
      commission: null,
      apr: null,
      totalStaked: Number(v.balance) / 1e9, // Gwei → ETH
    };
  }

  normalizeGeneric(v: any) {
    return {
      address: v.address || v.pubkey || v.nodeId,
      name: v.name || v.address,
      status: v.active ? 'active' : 'inactive',
      commission: v.commission || null,
      apr: v.apr || null,
      totalStaked: v.stake || 0,
    };
  }

  normalizeMetric(v: any) {
    return {
      epoch: null,
      slot: null,
      uptime: v.uptime || null,
      rewards: v.rewards || null,
      stake: v.stake || null,
    };
  }
}