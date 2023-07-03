/**
 * @Author: Gibeom Choi
 * @Date:   2023-05-29 17:40:48
 * @Last Modified by:   Gibeom Choi
 * @Last Modified time: 2023-06-24 15:46:46
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
import { JwtPayload } from './dto/jwt.payload.dto';
import { LoginRequestDTO } from './dto/login.request.dto';
import { JwtResponseDTO } from './dto/jwt.response.dto';
import { RegisterResponseDTO } from './dto/register.response.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async registerUser(
    request: RegisterRequestDTO,
  ): Promise<RegisterResponseDTO> {
    const result1 = await this.userService.findByField({
      where: { user_email: request.email },
    });

    if (request.phone_number !== undefined) {
      const result2 = await this.userService.findByField({
        where: { user_phone_number: request.phone_number },
      });
      if (result2) {
        throw new HttpException(
          'phone number already used',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (result1) {
      throw new HttpException('email already used', HttpStatus.BAD_REQUEST);
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

    const savedUser = await this.userService.save(newUser);

    if (!savedUser) {
      throw new HttpException(
        'Error has been occurred!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // UserDTO를 Response로 보내면 해시된 비밀번호가 유출됨
    const response: RegisterResponseDTO = {
      user_email: savedUser.user_email,
      user_age: savedUser.user_age,
      user_gender: savedUser.user_gender,
      user_name: savedUser.user_name,
      user_phone_number: savedUser.user_phone_number,
      user_registration_time: savedUser.user_registration_time,
    };

    return response;
  }

  async validateUser(
    request: LoginRequestDTO,
  ): Promise<JwtResponseDTO | undefined> {
    const userFind: User = await this.userService.findByField({
      where: { user_email: request.email },
    });

    if (!userFind) {
      throw new UnauthorizedException();
    }

    const validatePassword = await bcrypt.compare(
      request.password,
      userFind.user_password,
    );

    if (!validatePassword) {
      throw new UnauthorizedException();
    }

    // JWTPayload에는 민감한 정보가 포함되어서는 안됨.
    const payload: JwtPayload = {
      name: userFind.user_name,
      email: userFind.user_email,
      id: userFind.user_id,
    };

    // JWTResponse에는 access_token(만료기간: 10분), refresh_token(만료기간: 1주일)이 포함됨
    // refresh_token은 이후 업데이트 예정
    const response: JwtResponseDTO = {
      access_token: this.jwtService.sign(payload),
      refresh_token: null,
      user_id: userFind.user_id,
    };

    return response;
  }
}
