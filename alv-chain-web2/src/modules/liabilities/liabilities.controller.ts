import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { LiabilityService } from './liabilities.service';
import { CreateLiabilityDto } from './dto/liabilities.dto';
import { Liability } from './entities/liabilities.entity';

@Controller('liabilities')
export class LiabilityController {
  constructor(private readonly liabilityService: LiabilityService) {}

  @Post()
  create(@Body() createLiabilityDto: CreateLiabilityDto): Promise<Liability> {
    return this.liabilityService.create(createLiabilityDto);
  }

  @Get()
  findAll(): Promise<Liability[]> {
    return this.liabilityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Liability> {
    return this.liabilityService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateLiabilityDto: CreateLiabilityDto): Promise<Liability> {
    return this.liabilityService.update(id, updateLiabilityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.liabilityService.remove(id);
  }
}