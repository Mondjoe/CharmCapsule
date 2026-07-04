import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EvmIndexer } from './evm.indexer';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EvmCron {
  constructor(
    private indexer: EvmIndexer,
    private prisma: PrismaService,
  ) {}

  @Cron('*/5 * * * *')
  async updateEvm() {
    const evmChains = await this.prisma.chain.findMany({
      where: { type: 'evm' },
    });

    for (const chain of evmChains) {
      if (chain.name === 'Ethereum') {
        await this.indexer.indexEthereum(chain.id, process.env.ETH_BEACON!);
        await this.indexer.indexGeneric(chain.id, process.env.BNB_RPC!, 'bnbchain_getValidatorSet');
        await this.indexer.indexGeneric(chain.id, process.env.POLYGON_RPC!, 'bor_getValidatorSet');
        await this.indexer.indexGeneric(chain.id, process.env.AVAX_RPC!, 'platform.getCurrentValidators');
      }
    }
  }
}