/**
 * @Author: Gibeom Choi
 * @Date:   2023-05-29 17:40:48
 * @Last Modified by:   Gibeom Choi
 * @Last Modified time: 2023-05-31 18:10:27
 */
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserDTO } from '../user/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RegisterRequestDTO } from './dto/register.request.dto';
import { JwtPayload } from './dto/jwt.payload';
import { LoginRequestDTO } from './dto/login.request.dto';
import { JwtResponseDTO } from './dto/jwt.response.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async registerUser(request: RegisterRequestDTO): Promise<UserDTO> {
    const userFind: UserDTO = await this.userService.findByField({
      where: { user_name: request.name },
    });

    if (userFind) {
      throw new HttpException('username already used', HttpStatus.BAD_REQUEST);
    }

    // RegisterRequestDTO를 UserDTO로 연결
    const newUser: UserDTO = {
      user_age: request.age,
      user_name: request.name,
      user_gender: request.gender,
      user_email: request.email,
      user_phone_number: request.phone_number,
      user_password: request.password,
      user_modification_time: new Date(),
      user_registration_time: new Date(),
      user_birthday: request.birthday,
    };

    return await this.userService.save(newUser);
  }

  async validateUser(
    request: LoginRequestDTO,
  ): Promise<JwtResponseDTO | undefined> {
    const userFind: User = await this.userService.findByField({
      where: { user_email: request.email },
    });

    const validatePassword = await bcrypt.compare(
      request.password,
      userFind.user_password,
    );

    if (!userFind || !validatePassword) {
      throw new UnauthorizedException();
    }

    // JWTPayload에는 민감한 정보가 포함되어서는 안됨.
    const payload: JwtPayload = {
      name: userFind.user_name,
      email: userFind.user_email,
    };

    // JWTResponse에는 access_token(만료기간: 10분), refresh_token(만료기간: 1주일)이 포함됨
    // refresh_token은 이후 업데이트 예정
    const response: JwtResponseDTO = {
      access_token: this.jwtService.sign(payload),
      refresh_token: null,
    };

    return response;
  }
}
