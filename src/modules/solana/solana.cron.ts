import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SolanaIndexer } from './solana.indexer';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SolanaCron {
  private readonly logger = new Logger(SolanaCron.name);

  constructor(
    private readonly indexer: SolanaIndexer,
    private readonly prisma: PrismaService,
  ) {}

  // -----------------------------
  // Scan new blocks every 5 seconds
  // -----------------------------
  @Cron('*/5 * * * * *')
  async scanBlocks() {
    this.logger.log('Scanning new Solana blocks...');
    await this.indexer.scanNewBlocks();
  }

  // -----------------------------
  // Update validators every 60 seconds
  // -----------------------------
  @Cron(CronExpression.EVERY_MINUTE)
  async updateValidators() {
    this.logger.log('Updating Solana validators...');

    const chain = await this.prisma.chain.findFirst({
      where: { type: 'solana' },
    });

    if (!chain) {
      this.logger.error('Solana chain not found');
      return;
    }

    await this.indexer.updateValidators(chain.id);
  }

  // -----------------------------
  // Update balances every 30 seconds
  // -----------------------------
  @Cron('*/30 * * * * *')
  async updateBalances() {
    this.logger.log('Updating balances...');
    const trackedAccounts = [];

    for (const address of trackedAccounts) {
      await this.indexer.updateBalance(address);
    }
  }

  // -----------------------------
  // Update stake accounts every 45 seconds
  // -----------------------------
  @Cron('*/45 * * * * *')
  async updateStake() {
    this.logger.log('Updating stake accounts...');
    const trackedAccounts = [];

    for (const address of trackedAccounts) {
      await this.indexer.updateStakeAccounts(address);
    }
  }

  // -----------------------------
  // Update rewards every 2 minutes
  // -----------------------------
  @Cron('*/120 * * * * *')
  async updateRewards() {
    this.logger.log('Updating rewards...');
    const trackedAccounts = [];

    for (const address of trackedAccounts) {
      await this.indexer.updateRewards(address);
    }
  }
}