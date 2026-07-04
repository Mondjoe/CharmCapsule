import { Injectable } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  private client: RedisClientType;

  async connect(url: string) {
    this.client = createClient({ url });
    await this.client.connect();
  }

  getClient() {
    return this.client;
  }

  // ⭐ BullMQ-compatible connection options
  getBullConnection() {
    const url = new URL(this.client.options.url!);
    return {
      host: url.hostname,
      port: Number(url.port),
    };
  }
}