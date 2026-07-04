import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class EvmService {
  async rpc(rpcUrl: string, method: string, params: any[] = []) {
    const { data } = await axios.post(rpcUrl, {
      jsonrpc: '2.0',
      id: 1,
      method,
      params,
    });

    return data.result;
  }

  // Ethereum Beacon API
  async getEthereumValidators(beaconUrl: string) {
    const { data } = await axios.get(
      `${beaconUrl}/eth/v1/beacon/states/head/validators`,
    );
    return data.data;
  }

  // BNB Chain
  async getBnbValidators(rpcUrl: string) {
    return this.rpc(rpcUrl, 'bnbchain_getValidatorSet');
  }

  // Polygon
  async getPolygonValidators(rpcUrl: string) {
    return this.rpc(rpcUrl, 'bor_getValidatorSet');
  }

  // Avalanche
  async getAvalancheValidators(rpcUrl: string) {
    return this.rpc(rpcUrl, 'platform.getCurrentValidators');
  }
}