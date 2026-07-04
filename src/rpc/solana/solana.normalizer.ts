import { Injectable } from '@nestjs/common';

@Injectable()
export class SolanaNormalizer {
  normalizeValidator(v: any, isDelinquent: boolean) {
    return {
      address: v.votePubkey,
      name: v.nodePubkey,
      commission: v.commission,
      totalStaked: v.activatedStake,
      delinquent: isDelinquent,
      status: isDelinquent ? 'delinquent' : 'active',
      lastVote: v.lastVote,
      rootSlot: v.rootSlot,
      apr: null, // computed later
    };
  }

  normalizeMetric(v: any, epochInfo: any) {
    const credits = v.epochCredits?.[v.epochCredits.length - 1];
    const previous = credits ? credits[2] : 0;
    const current = credits ? credits[1] : 0;

    const creditsDelta = current - previous;

    return {
      epoch: epochInfo.epoch,
      slot: epochInfo.slotIndex,
      uptime: creditsDelta,
      stake: v.activatedStake,
      rewards: null, // filled by rewards indexer
    };
  }
}