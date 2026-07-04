import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SolanaService {
  private RPC: string;

  constructor() {
    if (!process.env.SOLANA_RPC) {
      throw new Error('SOLANA_RPC is missing');
    }
    this.RPC = process.env.SOLANA_RPC;
  }

  async rpc(method: string, params: any[] = []) {
    const { data } = await axios.post(this.RPC, {
      jsonrpc: '2.0',
      id: 1,
      method,
      params,
    });

    return data.result;
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
