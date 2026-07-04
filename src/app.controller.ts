import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  root() {
    return {
      status: 'API online',
      service: 'Charm Capsule Validator API',
      version: '1.0.0',
    };
  }
}