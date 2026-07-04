import { IsString, IsOptional, IsNumber } from 'class-validator';
import { Body, Controller, Get, Param, Post, Patch, Delete } from '@nestjs/common';
import { ChainService } from './chain.service';
import { CreateChainDto } from './dto/create-chain.dto';
import { UpdateChainDto } from './dto/update-chain.dto';

@Controller('chains')
export class ChainController {
  constructor(private chainService: ChainService) {}

  @Post()
  create(@Body() dto: CreateChainDto) {
    return this.chainService.create(dto);
  }

  @Get()
  findAll() {
    return this.chainService.findAll();
  }

  @Get('seed')
  seed() {
    return this.chainService.seedDefaultChains();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chainService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateChainDto) {
    return this.chainService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chainService.remove(id);
  }
}