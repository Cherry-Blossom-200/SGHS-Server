import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async registerAccount(
    @Req() req: Request,
    @Body() UserDTO: UserDTO,
  ): Promise<any> {
    return await this.authService.registUser(UserDTO);
  }

  @Post('/login')
  async login(@Body() UserDTO: UserDTO): Promise<any> {
    return await this.authService.validateUser(UserDTO);
  }
}
