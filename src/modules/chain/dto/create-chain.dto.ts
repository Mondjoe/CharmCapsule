import { IsString } from 'class-validator';

export class CreateChainDto {
  @IsString()
  name: string;

  @IsString()
  type: string; // solana | aptos | near | evm
}