import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { NearService } from './near.service';
import { NearNormalizer } from './near.normalizer';

@Injectable()
export class NearIndexer {
  constructor(
    private prisma: PrismaService,
    private near: NearService,
    private normalizer: NearNormalizer,
  ) {}

  async indexValidators(chainId: string) {
    const data = await this.near.getValidators();
    const epoch = data.epoch_height;

    const all = [
      ...data.current_validators,
      ...data.next_validators,
      ...data.prev_validators,
    ];

    for (const v of all) {
      const normalized = this.normalizer.normalizeValidator(v);

      const validator = await this.prisma.validator.upsert({
        where: {
          address_chainId: {
            address: normalized.address,
            chainId,
          },
        },
        update: normalized,
        create: {
          chainId,
          ...normalized,
        },
      });

      const metric = this.normalizer.normalizeMetric(v, epoch);

      await this.prisma.validatorMetric.create({
        data: {
          validatorId: validator.id,
          ...metric,
        },
      });
    }

    return all.length;
  }
}