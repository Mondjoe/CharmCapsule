@Controller('validators')
export class ValidatorController {
  constructor(private validatorService: ValidatorService) {}

  @Post()
  create(@Body() dto: CreateValidatorDto) {
    return this.validatorService.create(dto);
  }

  @Get()
  findAll() {
    return this.validatorService.findAll();
  }

  @Get('chain/:chainId')
  findByChain(@Param('chainId') chainId: string) {
    return this.validatorService.findByChain(chainId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.validatorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateValidatorDto) {
    return this.validatorService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.validatorService.remove(id);
  }
}