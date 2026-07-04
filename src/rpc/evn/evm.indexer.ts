import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EvmService } from './evm.service';
import { EvmNormalizer } from './evm.normalizer';

@Injectable()
export class EvmIndexer {
  constructor(
    private prisma: PrismaService,
    private evm: EvmService,
    private normalizer: EvmNormalizer,
  ) {}

  async indexEthereum(chainId: string, beaconUrl: string) {
    const validators = await this.evm.getEthereumValidators(beaconUrl);

    for (const v of validators) {
      const normalized = this.normalizer.normalizeEthereum(v);

      const validator = await this.prisma.validator.upsert({
        where: {
          address_chainId: {
            address: normalized.address,
            chainId,
          },
        },
        update: normalized,
        create: { chainId, ...normalized },
      });

      const metric = this.normalizer.normalizeMetric({
        stake: normalized.totalStaked,
      });

      await this.prisma.validatorMetric.create({
        data: { validatorId: validator.id, ...metric },
      });
    }

    return validators.length;
  }

  async indexGeneric(chainId: string, rpcUrl: string, method: string) {
    const validators = await this.evm.rpc(rpcUrl, method);

    for (const v of validators) {
      const normalized = this.normalizer.normalizeGeneric(v);

      const validator = await this.prisma.validator.upsert({
        where: {
          address_chainId: {
            address: normalized.address,
            chainId,
          },
        },
        update: normalized,
        create: { chainId, ...normalized },
      });

      const metric = this.normalizer.normalizeMetric(normalized);

      await this.prisma.validatorMetric.create({
        data: { validatorId: validator.id, ...metric },
      });
    }

    return validators.length;
  }
}