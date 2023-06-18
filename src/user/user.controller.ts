/**
 * @Author: Gibeom Choi
 * @Date:   2023-06-18 15:02:42
 * @Last Modified by:   Gibeom Choi
 * @Last Modified time: 2023-06-18 15:33:12
 */

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from './user.service';
import { UserUpdateDTO } from './dto/user.update.dto';
import { Request } from 'express';

@Controller('/api/v1/user')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  @UseGuards(AuthGuard)
  async getUserById(@Req() request: Request, @Param('id') userId: number) {
    return this.userService.getUserById(request, userId);
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  async updateUserById(
    @Req() request: Request,
    @Param('id') userId: number,
    @Body() updateForm: UserUpdateDTO,
  ) {
    return this.userService.updateExistingUser(request, userId, updateForm);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async deleteUserById(@Req() request: Request, @Param('id') userId: number) {
    return this.userService.deleteUser(request, userId);
  }
}
