/**
 * @Author: Gibeom Choi
 * @Date:   2023-05-29 17:40:48
 * @Last Modified by:   Gibeom Choi
 * @Last Modified time: 2023-06-10 13:13:37
 */
import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDTO } from './dto/register.request.dto';
import { LoginRequestDTO } from './dto/login.request.dto';
import { AuthGuard } from './auth.guard';

// 컨트롤러 변경, v1은 버전을 표기
// api 서버에서 큰 변화가 있을 시 v2로 라우터 변경하기 위함
@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async registerAccount(@Body() request: RegisterRequestDTO): Promise<any> {
    return await this.authService.registerUser(request);
  }

  @Post('/login')
  async login(@Body() request: LoginRequestDTO): Promise<any> {
    return await this.authService.validateUser(request);
  }

  // token 검증용 라우터
  @UseGuards(AuthGuard)
  @Get('/verify')
  verifyToken(@Req() request: Request) {
    return request['user'];
  }
}
