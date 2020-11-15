import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './enteties/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(login: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ login });
  }

  async create(createUserDto: CreateUserDto) {
    const existUser: User = await this.userRepository.findOne({
      login: createUserDto.login,
    });

    if (existUser) {
      throw new HttpException(
        `${existUser.login} already exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const time = +new Date();
    const user: User = this.userRepository.create({
      ...createUserDto,
      created_at: time.toString(),
    });

    return this.userRepository.save(user);
  }
}
