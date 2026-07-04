import { Controller, Get, Param, Post, Patch, Delete, Body } from '@nestjs/common';
import { NodeService } from './node.service';
import { CreateNodeDto } from './dto/create-node.dto';
import { UpdateNodeDto } from './dto/update-node.dto';

@Controller('nodes')
export class NodeController {
  constructor(private nodeService: NodeService) {}

  @Post()
  create(@Body() dto: CreateNodeDto) {
    return this.nodeService.create(dto);
  }

  @Get()
  findAll() {
    return this.nodeService.findAll();
  }

  @Get('validator/:validatorId')
  findByValidator(@Param('validatorId') validatorId: string) {
    return this.nodeService.findByValidator(validatorId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nodeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNodeDto) {
    return this.nodeService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nodeService.remove(id);
  }
}