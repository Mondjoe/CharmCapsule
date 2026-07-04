import { Module } from '@nestjs/common';
import { NearService } from './near.service';
import { NearIndexer } from './near.indexer';
import { NearNormalizer } from './near.normalizer';
import { NearCron } from './near.cron';
import { NearRewardsIndexer } from './near.rewards';

@Module({
  providers: [
    NearService,
    NearIndexer,
    NearNormalizer,
    NearCron,
    NearRewardsIndexer,
  ],
})
export class NearModule {}