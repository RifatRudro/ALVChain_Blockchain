import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetType } from './entities/asset_category.entity';
import { AssetTypeService } from './asset_category.service';
import { AssetTypeController } from './asset_category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AssetType])],
  providers: [AssetTypeService],
  controllers: [AssetTypeController],
  exports: [AssetTypeService]
})
export class AssetTypeModule {}