import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AptosService } from './aptos.service';
import { AptosNormalizer } from './aptos.normalizer';

@Injectable()
export class AptosIndexer {
  private readonly logger = new Logger(AptosIndexer.name);

  constructor(
    private prisma: PrismaService,
    private aptos: AptosService,
    private normalizer: AptosNormalizer,
  ) {}

  async indexValidators(chainId: string) {
    this.logger.log(`Indexing Aptos validators for chain ${chainId}`);

    const data = await this.aptos.getValidatorSet();
    const validators = data?.active_validators || [];

    for (const v of validators) {
      const normalized = this.normalizer.normalizeValidator(v);

      const validator = await this.prisma.validator.upsert({
        where: {
          address_chainId: {
            address: normalized.address,
            chainId,
          },
        },
        update: {
          name: normalized.name,
          status: normalized.status,
          commission: normalized.commission,
          apr: normalized.apr,
          totalStaked: normalized.totalStaked,
        },
        create: {
          chainId,
          address: normalized.address,
          name: normalized.name,
          status: normalized.status,
          commission: normalized.commission,
          apr: normalized.apr,
          totalStaked: normalized.totalStaked,
        },
      });

      const metric = this.normalizer.normalizeMetric(v);

      await this.prisma.validatorMetric.create({
        data: {
          validatorId: validator.id,
          epoch: metric.epoch,
          slot: metric.slot,
          uptime: metric.uptime,
          rewards: metric.rewards,
          stake: metric.stake,
        },
      });
    }

    this.logger.log(
      `Aptos validator indexing complete (${validators.length} validators)`
    );

    return validators.length;
  }
}