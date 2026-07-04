import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';

@Controller('logs')
export class LogsController {
  constructor(private logsService: LogsService) {}

  @Post()
  create(@Body() dto: CreateLogDto) {
    return this.logsService.create(dto);
  }

  @Get()
  findAll() {
    return this.logsService.findAll();
  }

  @Get('validator/:validatorId')
  findByValidator(@Param('validatorId') validatorId: string) {
    return this.logsService.findByValidator(validatorId);
  }
}