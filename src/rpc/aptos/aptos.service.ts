import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AptosService {
  private NODE = process.env.APTOS_NODE;

  async get(path: string) {
    const { data } = await axios.get(`${this.NODE}${path}`);
    return data;
  }

  getValidatorSet() {
    return this.get('/validators');
  }

  getStakingInfo(address: string) {
    return this.get(`/accounts/${address}/resources`);
  }

  getRewards(address: string) {
    return this.get(
      `/accounts/${address}/events/0x1::staking_contract::StakingContractEvent`,
    );
  }
}