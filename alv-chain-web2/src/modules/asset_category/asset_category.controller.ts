import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AssetTypeService } from './asset_category.service';
import { AssetType } from './entities/asset_category.entity';
import { CreateAssetTypeDto } from './dto/asset_category.dto';

@Controller('asset-types')
export class AssetTypeController {
  constructor(private readonly assetTypeService: AssetTypeService) {}

  @Post()
  create(@Body() createAssetTypeDto: CreateAssetTypeDto): Promise<AssetType> {
    return this.assetTypeService.create(createAssetTypeDto);
  }

  @Get()
  findAll(): Promise<AssetType[]> {
    return this.assetTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<AssetType> {
    return this.assetTypeService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateAssetTypeDto: CreateAssetTypeDto): Promise<AssetType> {
    return this.assetTypeService.update(id, updateAssetTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.assetTypeService.remove(id);
  }
}