import { Injectable, Options } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRePository } from './user.repository';
import { FindOneOptions } from 'typeorm';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRePository)
    private userRepository: UserRePository,
  ) {}

  async findByField(
    options: FindOneOptions<UserDTO>,
  ): Promise<User | undefined> {
    return await this.userRepository.findOne(options);
  }

  async save(userDTO: UserDTO): Promise<UserDTO | undefined> {
    await this.transformPassword(userDTO);
    return await this.userRepository.save(userDTO);
  }

  async transformPassword(user: UserDTO): Promise<void> {
    user.user_password = await bcrypt.hash(user.user_password, 10);
    return Promise.resolve();
  }
}
