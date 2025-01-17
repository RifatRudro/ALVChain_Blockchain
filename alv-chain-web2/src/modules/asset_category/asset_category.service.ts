import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssetType } from './entities/asset_category.entity';
import { CreateAssetTypeDto } from './dto/asset_category.dto';

@Injectable()
export class AssetTypeService {
  constructor(
    @InjectRepository(AssetType)
    private assetTypeRepository: Repository<AssetType>,
  ) {}

  async create(createAssetTypeDto: CreateAssetTypeDto): Promise<AssetType> {
    const assetType = this.assetTypeRepository.create(createAssetTypeDto);
    return this.assetTypeRepository.save(assetType);
  }

  async findAll(): Promise<AssetType[]> {
    return this.assetTypeRepository.find();
  }

  async findOne(id: number): Promise<AssetType|any> {
    return this.assetTypeRepository.findOne({where:{id}});
  }

  async update(id: number, updateAssetTypeDto: CreateAssetTypeDto): Promise<AssetType|any> {
    await this.assetTypeRepository.update(id, updateAssetTypeDto);
    return this.assetTypeRepository.findOne({where:{id}});
  }

  async remove(id: number): Promise<void> {
    await this.assetTypeRepository.delete(id);
  }
}