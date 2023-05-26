import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { Payload } from './security/payload.interface';
import { User } from './entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async registUser(newUser: UserDTO): Promise<UserDTO> {
    const userFind: UserDTO = await this.userService.findByField({
      where: { user_name: newUser.user_name },
    });
    if (userFind) {
      throw new HttpException('username already used', HttpStatus.BAD_REQUEST);
    }
    return await this.userService.save(newUser);
  }

  async validateUser(
    userDTO: UserDTO,
  ): Promise<{ accessToken: string } | undefined> {
    const userFind: User = await this.userService.findByField({
      where: { user_name: userDTO.user_name },
    });
    const validatePassword = await bcrypt.compare(
      userDTO.user_password,
      userFind.user_password,
    );
    if (!userFind || !validatePassword) {
      throw new UnauthorizedException();
    }
    const payLoad: Payload = { id: userFind.id, username: userFind.user_name };
    return {
      accessToken: this.jwtService.sign(payLoad),
    };
  }
}
