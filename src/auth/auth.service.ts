import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async registUser(newUser: UserDTO): Promise<UserDTO> {
    const userFind: UserDTO = await this.userService.findByField({
      where: { user_name: newUser.user_name },
    });
    if (userFind) {
      throw new HttpException('username already used', HttpStatus.BAD_REQUEST);
    }
    return await this.userService.save(newUser);
  }

  async validateUser(userDTO: UserDTO): Promise<string | undefined> {
    const userFind: UserDTO = await this.userService.findByField({
      where: { user_name: userDTO.user_name },
    });
    const validatePassword = await bcrypt.compare(
      userDTO.user_password,
      userFind.user_password,
    );
    if (!userFind || !validatePassword) {
      throw new UnauthorizedException();
    }
    return 'loginSuccess';
  }
}
