/**
 * @Author: Gibeom Choi
 * @Date:   2023-05-31 16:22:28
 * @Last Modified by:   Gibeom Choi
 * @Last Modified time: 2023-05-31 17:58:02
 * Module class to handle User-related objects and inject User Table into MySQL.
 */

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [UserService, UserRepository],
})
export class UserModule {}
