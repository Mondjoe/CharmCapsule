import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { RedisService } from '../../cache/redis.service';

export const SOLANA_QUEUES = {
  BLOCK: 'solana-block-queue',
  TX: 'solana-tx-queue',
  STAKE: 'solana-stake-queue',
  VALIDATOR: 'solana-validator-queue',
};

@Injectable()
export class SolanaQueue {
  public readonly blockQueue: Queue;
  public readonly txQueue: Queue;
  public readonly stakeQueue: Queue;
  public readonly validatorQueue: Queue;

  constructor(private readonly redis: RedisService) {
    const connection = this.redis.getBullConnection();   // ⭐ FIXED

    this.blockQueue = new Queue(SOLANA_QUEUES.BLOCK, { connection });
    this.txQueue = new Queue(SOLANA_QUEUES.TX, { connection });
    this.stakeQueue = new Queue(SOLANA_QUEUES.STAKE, { connection });
    this.validatorQueue = new Queue(SOLANA_QUEUES.VALIDATOR, { connection });
  }

  async addBlockJob(slot: number) {
    await this.blockQueue.add(
      'process-block',
      { slot },
      {
        attempts: 3,
        backoff: { type: 'exponential', delay: 2000 },
        removeOnComplete: true,
        removeOnFail: false,
      },
    );
  }

  async addTxJob(signature: string, raw: any, slot: number) {
    await this.txQueue.add(
      'process-tx',
      { signature, raw, slot },
      {
        attempts: 3,
        backoff: { type: 'exponential', delay: 2000 },
        removeOnComplete: true,
      },
    );
  }

  async addStakeJob(address: string) {
    await this.stakeQueue.add(
      'process-stake',
      { address },
      {
        attempts: 3,
        backoff: { type: 'exponential', delay: 2000 },
        removeOnComplete: true,
      },
    );
  }

  async addValidatorJob() {
    await this.validatorQueue.add(
      'process-validators',
      {},
      {
        attempts: 3,
        backoff: { type: 'exponential', delay: 2000 },
        removeOnComplete: true,
      },
    );
  }
}