import { Injectable, Logger } from '@nestjs/common';
import { Worker } from 'bullmq';
import { RedisService } from '../../cache/redis.service';
import { SolanaIndexer } from './solana.indexer';
import { SOLANA_QUEUES } from './solana.queue';

@Injectable()
export class SolanaProcessor {
  private readonly logger = new Logger(SolanaProcessor.name);

  constructor(
    private readonly redis: RedisService,
    private readonly indexer: SolanaIndexer,
  ) {
    const connection = this.redis.getBullConnection();

    new Worker(
      SOLANA_QUEUES.VALIDATOR,
      async () => {
        this.logger.log('Processing validator update job');
        await this.indexer.indexValidators('solana');
      },
      { connection },
    );

    new Worker(
      SOLANA_QUEUES.BLOCK,
      async job => {
        const { slot } = job.data;
        this.logger.log(`Processing block job for slot ${slot}`);
        if (this.indexer.scanBlock) {
          await this.indexer.scanBlock(slot);
        }
      },
      { connection },
    );

    new Worker(
      SOLANA_QUEUES.TX,
      async job => {
        const { signature, raw, slot } = job.data;
        this.logger.log(`Processing tx job ${signature}`);
        if (this.indexer.processTransaction) {
          await this.indexer.processTransaction(raw, slot);
        }
      },
      { connection },
    );

    new Worker(
      SOLANA_QUEUES.STAKE,
      async job => {
        const { address } = job.data;
        this.logger.log(`Processing stake job for ${address}`);
        if (this.indexer.updateStakeAccounts) {
          await this.indexer.updateStakeAccounts(address);
        }
      },
      { connection },
    );
  }
}