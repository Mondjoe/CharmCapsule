import { IsString, IsOptional, IsNumber } from 'class-validator';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { CreateMetricDto } from './dto/create-metric.dto';

@Controller('metrics')
export class MetricsController {
  constructor(private metricsService: MetricsService) {}

  @Post()
  create(@Body() dto: CreateMetricDto) {
    return this.metricsService.create(dto);
  }

  @Get()
  findAll() {
    return this.metricsService.findAll();
  }

  @Get('validator/:validatorId')
  findByValidator(@Param('validatorId') validatorId: string) {
    return this.metricsService.findByValidator(validatorId);
  }
}