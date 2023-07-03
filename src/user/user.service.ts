/**
 * @Author: Gibeom Choi
 * @Date:   2023-05-29 17:40:48
 * @Last Modified by:   Gibeom Choi
 * @Last Modified time: 2023-06-18 16:11:30
 * Service class to connect objects which handle User data to UserRepository
 */

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions } from 'typeorm';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './entity/user.entity';
import { UserRepository } from './user.repository';
import { UserUpdateDTO } from './dto/user.update.dto';
import { Request } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  /**
   * Returns the result of the query with the given options
   * @param options
   * @returns
   */
  async findByField(options: FindOneOptions<User>): Promise<User | undefined> {
    return await this.userRepository.findOne(options);
  }

  async save(userDTO: UserDTO): Promise<UserDTO | undefined> {
    await this.transformPassword(userDTO);
    return await this.userRepository.save(userDTO);
  }

  /**
   * Returns Promise object to wait until `user_password` is encrypted for 10 rounds
   * @param user
   * @returns
   */
  async transformPassword(user: UserDTO): Promise<void> {
    user.user_password = await bcrypt.hash(user.user_password, 10);
    return Promise.resolve();
  }

  async getUserById(request: Request, user_id: number) {
    const user = await this.findByField({ where: { user_id: user_id } });
    if (!user) {
      throw new BadRequestException('User Not Found');
    }

    if (request['user'].id !== user.user_id) {
      throw new UnauthorizedException();
    }

    delete user.user_password; // 해쉬된 비밀번호는 반환값에서 제외
    return user;
  }

  async updateExistingUser(
    request: Request,
    user_id: number,
    updateForm: UserUpdateDTO,
  ) {
    const user = await this.findByField({ where: { user_id: user_id } });
    if (!user) {
      throw new BadRequestException('User Not Found');
    }

    if (request['user'].id !== user.user_id) {
      throw new UnauthorizedException();
    }
    return this.userRepository.update(user_id, updateForm);
  }

  async deleteUser(request: Request, user_id: number) {
    const user = await this.findByField({ where: { user_id: user_id } });
    if (!user) {
      throw new BadRequestException('User Not Found');
    }

    if (request['user'].id !== user.user_id) {
      throw new UnauthorizedException();
    }
    return this.userRepository.delete(user_id);
  }
}
