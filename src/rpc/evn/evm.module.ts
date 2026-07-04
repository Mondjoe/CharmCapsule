import { Module } from '@nestjs/common';
import { EvmService } from './evm.service';
import { EvmIndexer } from './evm.indexer';
import { EvmNormalizer } from './evm.normalizer';
import { EvmCron } from './evm.cron';

@Module({
  providers: [EvmService, EvmIndexer, EvmNormalizer, EvmCron],
})
export class EvmModule {}