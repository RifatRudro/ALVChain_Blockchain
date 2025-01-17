import { Profile } from "@/modules/profile/entities/profile.entity";
import { ProfileController } from "@/modules/profile/profile.controller";
import { ProfileService } from "@/modules/profile/profile.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
