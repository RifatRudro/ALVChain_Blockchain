import { Profile } from "@/modules/profile/entities/profile.entity";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { CreateProfileDto, PatchProfileDto } from "./dto";

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async findAll(findOption: FindManyOptions<Profile>): Promise<Profile[]> {
    try {
      return await this.profileRepository.find(findOption);
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async findOne(findOption: FindOneOptions<Profile>): Promise<Profile> {
    try {
      return await this.profileRepository.findOneOrFail(findOption);
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async findOneById(model_id: number): Promise<Profile> {
    return this.profileRepository.findOneByOrFail({ id: model_id });
  }

  async findOneByUserId(user_id: number): Promise<Profile> {
    return this.profileRepository.findOneByOrFail({ user_id });
  }

  async createOne(dto: CreateProfileDto): Promise<Profile> {
    const profile = this.profileRepository.create(dto);
    return await this.profileRepository.save(profile);
  }

  async patchOne({
    model_id,
    dto,
  }: {
    model_id: number;
    dto: PatchProfileDto;
  }): Promise<Profile> {
    const profile = await this.findOneById(model_id);
    if (!profile) throw new NotFoundException();
    this.profileRepository
      .createQueryBuilder()
      .update(dto)
      .where({ id: model_id })
      .execute();
    return this.findOneById(model_id);
  }
}
