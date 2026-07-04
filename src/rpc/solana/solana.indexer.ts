import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SolanaService } from './solana.service';
import { SolanaNormalizer } from './solana.normalizer';
import { Validator } from '@prisma/client';

@Injectable()
export class SolanaIndexer {
  constructor(
    private readonly prisma: PrismaService,
    private readonly solana: SolanaService,
    private readonly normalizer: SolanaNormalizer,
  ) {}

  async scanNewBlocks(): Promise<void> {
    // TODO: implement block scanning
  }

  async updateValidators(chainId: string): Promise<void> {
    await this.indexValidators(chainId);
  }

  async updateBalance(address: string): Promise<void> {
    // TODO: implement balance update
  }

  async updateStakeAccounts(address: string): Promise<void> {
    // TODO: implement stake accounts update
  }

  async updateRewards(address: string): Promise<void> {
    // TODO: implement rewards update
  }

  async scanBlock(slot: number): Promise<void> {
    // TODO: implement single block scan
  }

  async processTransaction(raw: any, slot: number): Promise<void> {
    // TODO: implement transaction processing
  }

  async indexValidators(chainId: string) {
    // Fetch in parallel
    const [voteAccounts, epochInfo] = await Promise.all([
      this.solana.getVoteAccounts(),
      this.solana.getEpochInfo(),
    ]);

    const current = voteAccounts.current.map(v => ({ v, delinquent: false }));
    const delinquent = voteAccounts.delinquent.map(v => ({ v, delinquent: true }));
    const all = [...current, ...delinquent];

    // Normalize all validators + metrics
    const validators = all.map(({ v, delinquent }) =>
      this.normalizer.normalizeValidator(v, delinquent),
    );

    const metrics = all.map(({ v }) =>
      this.normalizer.normalizeMetric(v, epochInfo),
    );

    // Upsert validators
    const validatorOps = validators.map(val =>
      this.prisma.validator.upsert({
        where: {
          address_chainId: {
            address: val.address,
            chainId,
          },
        },
        update: val,
        create: { chainId, ...val },
      }),
    );

    const savedValidators = await this.prisma.$transaction(validatorOps) as Validator[];

    // Insert metrics
    const metricOps = metrics.map((m, i) =>
      this.prisma.validatorMetric.create({
        data: {
          validatorId: savedValidators[i].id,
          ...m,
        },
      }),
    );

    await this.prisma.$transaction(metricOps);

    return validators.length;
  }
}