import { Module } from '@nestjs/common';
import { SolanaService } from './solana.service';
import { SolanaIndexer } from './solana.indexer';
import { SolanaNormalizer } from './solana.normalizer';
import { SolanaCron } from './solana.cron';
import { SolanaRewardsIndexer } from './solana.rewards';

@Module({
  providers: [
    SolanaService,
    SolanaIndexer,
    SolanaNormalizer,
    SolanaCron,
    SolanaRewardsIndexer,
  ],
  exports: [SolanaService],
})
export class SolanaModule {}