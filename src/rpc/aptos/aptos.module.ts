import { Module } from '@nestjs/common';
import { AptosService } from './aptos.service';
import { AptosIndexer } from './aptos.indexer';
import { AptosNormalizer } from './aptos.normalizer';
import { AptosCron } from './aptos.cron';
import { AptosRewardsIndexer } from './aptos.rewards';

@Module({
  providers: [
    AptosService,
    AptosIndexer,
    AptosNormalizer,
    AptosCron,
    AptosRewardsIndexer,
  ],
})
export class AptosModule {}