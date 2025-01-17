import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Liability } from './entities/liabilities.entity';
import { LiabilityService } from './liabilities.service';
import { LiabilityController } from './liabilities.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Liability])],
  providers: [LiabilityService],
  controllers: [LiabilityController],
  exports: [LiabilityService]
})
export class LiabilityModule {}