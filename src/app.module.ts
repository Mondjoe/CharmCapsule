import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { ChainModule } from './modules/chain/chain.module';
import { ValidatorModule } from './modules/validator/validator.module';
import { MetricsModule } from './modules/metrics/metrics.module';
import { LogsModule } from './modules/logs/logs.module';
import { NodeModule } from './modules/node/node.module';

import { SolanaModule } from './rpc/solana/solana.module';
import { AptosModule } from './rpc/aptos/aptos.module';
import { NearModule } from './rpc/near/near.module';
import { EvmModule } from './rpc/evn/evm.module';
import { ApiModule } from './modules/api/api.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    ChainModule,
    ValidatorModule,
    MetricsModule,
    LogsModule,
    NodeModule,
    SolanaModule,
    AptosModule,
    NearModule,
    EvmModule,
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}