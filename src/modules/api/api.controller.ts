import { Controller, Get, Param } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private api: ApiService) {}

  @Get('chains')
  getChains() {
    return this.api.getChains();
  }

  @Get('validators')
  getValidators() {
    return this.api.getValidators();
  }

  @Get('chain/:chainId/validators')
  getValidatorsByChain(@Param('chainId') chainId: string) {
    return this.api.getValidatorsByChain(chainId);
  }

  @Get('validator/:id')
  getValidator(@Param('id') id: string) {
    return this.api.getValidator(id);
  }

  @Get('validator/:id/metrics')
  getValidatorMetrics(@Param('id') id: string) {
    return this.api.getValidatorMetrics(id);
  }

  @Get('validator/:id/logs')
  getValidatorLogs(@Param('id') id: string) {
    return this.api.getValidatorLogs(id);
  }

  @Get('validator/:id/nodes')
  getValidatorNodes(@Param('id') id: string) {
    return this.api.getValidatorNodes(id);
  }

  @Get('overview')
  getOverview() {
    return this.api.getOverview();
  }
}