import { Roles } from "@/common/decorators";
import { Role } from "@/common/enums";
import { JwtGuard, RolesGuard } from "@/common/guard";
import { QueryParserPipe } from "@/common/pipes";
import { ValidationPipe } from "@/common/pipes/validation.pipe";
import { PatchProfileDto } from "@/modules/profile/dto/patch-profile.dto";
import { Profile } from "@/modules/profile/entities/profile.entity";
import { ProfileService } from "@/modules/profile/profile.service";
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { FindManyOptions } from "typeorm";

@ApiTags("Profile")
@Controller("profiles")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  findAll(
    @Query(new QueryParserPipe("MANY", []))
    findOption: FindManyOptions<Profile>,
  ): Promise<Profile[]> {
    return this.profileService.findAll(findOption);
  }

  @Get(":id")
  @UseGuards(JwtGuard)
  findOne(@Param("id") id: string): Promise<Profile> {
    return this.profileService.findOneById(parseInt(id));
  }

  @Patch(":id")
  @UseGuards(JwtGuard)
  patchOne(
    @Param("id") id: string,
    @Body(new ValidationPipe()) body: PatchProfileDto,
  ): Promise<Profile> {
    return this.profileService.patchOne({ model_id: parseInt(id), dto: body });
  }
}
