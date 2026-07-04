import { Injectable, Logger } from '@nestjs/common';
import { Connection } from '@solana/web3.js';

@Injectable()
export class RpcManager {
  public connection: Connection;
  private readonly logger = new Logger(RpcManager.name);

  constructor() {
    const rpc = process.env.SOLANA_RPC;
    if (!rpc) {
      throw new Error('SOLANA_RPC is not defined');
    }

    this.connection = new Connection(rpc, {
      commitment: 'confirmed',
    });
  }

  getConnection(): Connection {
    return this.connection;
  }

  async safeRpc<T>(fn: () => Promise<T>, label: string): Promise<T | null> {
    const maxRetries = 3;
    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        return await fn();
      } catch (err) {
        attempt++;
        this.logger.warn(
          `[RPC WARNING] ${label} failed (attempt ${attempt}/${maxRetries})`,
        );
      }
    }

    this.logger.error(
      `[RPC ERROR] ${label} failed after ${maxRetries} retries`,
    );
    return null;
  }

  async getVoteAccounts() {
    return this.safeRpc(() => this.connection.getVoteAccounts(), 'getVoteAccounts');
  }

  async getEpochInfo() {
    return this.safeRpc(() => this.connection.getEpochInfo(), 'getEpochInfo');
  }

  async getSlot() {
    return this.safeRpc(() => this.connection.getSlot(), 'getSlot');
  }
}
