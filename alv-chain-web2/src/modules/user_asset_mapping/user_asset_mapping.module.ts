import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAssetMapping } from './entities/user_asset_mapping.entity';
import { UserAssetMappingService } from './user_asset_mapping.service';
import { UserAssetMappingController } from './user_asset_mapping.controller';
import { AssetTypeModule } from '../asset_category/asset_category.module';
import { LiabilityService } from '../liabilities/liabilities.service';
import { LiabilityModule } from '../liabilities/liabilities.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserAssetMapping]),
forwardRef(()=>AssetTypeModule),
forwardRef(()=>LiabilityModule)

],
  providers: [UserAssetMappingService],
  controllers: [UserAssetMappingController],
  exports: [UserAssetMappingService]
})
export class UserAssetMappingModule {}