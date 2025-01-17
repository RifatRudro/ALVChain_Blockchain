import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Liability } from './entities/liabilities.entity';
import { CreateLiabilityDto } from './dto/liabilities.dto';

@Injectable()
export class LiabilityService {
  constructor(
    @InjectRepository(Liability)
    private liabilityRepository: Repository<Liability>,
  ) {}

  async create(createLiabilityDto: CreateLiabilityDto): Promise<Liability> {
    const liability = this.liabilityRepository.create(createLiabilityDto);
    return this.liabilityRepository.save(liability);
  }

  async findAll(): Promise<Liability[]> {
    return this.liabilityRepository.find();
  }

  async findOne(id: number): Promise<Liability|any> {
    return this.liabilityRepository.findOne({where:{id}});
  }
  async findOneByFindOptions(findOptions: any): Promise<Liability|any> {
    return this.liabilityRepository.findOne(findOptions);
  }

  async update(id: number, updateLiabilityDto: CreateLiabilityDto): Promise<Liability|any> {
    await this.liabilityRepository.update(id, updateLiabilityDto);
    return this.liabilityRepository.findOne({where:{id}});
  }

  async remove(id: number): Promise<void> {
    await this.liabilityRepository.delete(id);
  }
}