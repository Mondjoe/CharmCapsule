import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NearService {
  private RPC = process.env.NEAR_RPC!;

  async rpc(method: string, params: any = []) {
    const { data } = await axios.post(this.RPC, {
      jsonrpc: '2.0',
      id: 'near-indexer',
      method,
      params,
    });

    return data.result;
  }

  getValidators() {
    return this.rpc('validators', [null]);
  }

  getEpochStatus() {
    return this.rpc('validators', [null]);
  }

  getNodeStatus() {
    return this.rpc('status');
  }
}