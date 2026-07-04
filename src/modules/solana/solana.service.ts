import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SolanaService {
  private readonly logger = new Logger(SolanaService.name);
  private readonly RPC: string;

  constructor() {
    if (!process.env.SOLANA_RPC) {
      throw new Error('SOLANA_RPC is required');
    }

    this.RPC = process.env.SOLANA_RPC;
  }

  async rpc(method: string, params: any[] = [], id = 1) {
    try {
      const { data } = await axios.post(
        this.RPC,
        {
          jsonrpc: '2.0',
          id,
          method,
          params,
        },
        { timeout: 10_000 },
      );

      if (data.error) {
        this.logger.error(`RPC error: ${method}`, data.error);
        throw new Error(data.error.message);
      }

      return data.result;
    } catch (err) {
      this.logger.error(`RPC failed: ${method}`, err);
      throw err;
    }
  }

  async rpcBatch(calls: { method: string; params: any[] }[]) {
    const payload = calls.map((c, i) => ({
      jsonrpc: '2.0',
      id: i + 1,
      method: c.method,
      params: c.params,
    }));

    const { data } = await axios.post(this.RPC, payload, {
      timeout: 15_000,
    });

    return data.map((r: any) => r.result);
  }

  getVoteAccounts() {
    return this.rpc('getVoteAccounts');
  }

  getEpochInfo() {
    return this.rpc('getEpochInfo');
  }

  getInflationReward(addresses: string[]) {
    return this.rpc('getInflationReward', [addresses]);
  }

  getStakeAccounts() {
    return this.rpc('getProgramAccounts', [
      'Stake11111111111111111111111111111111111111',
      { encoding: 'jsonParsed' },
    ]);
  }
}