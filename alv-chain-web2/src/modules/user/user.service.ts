import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User|any> {
    return this.userRepository.findOne({where:{id}});
  }

  async update(id: number, updateUserDto: CreateUserDto): Promise<User|any> {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOne({where:{id}});
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}