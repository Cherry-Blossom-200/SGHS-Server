/**
 * @Author: Gibeom Choi
 * @Date:   2023-05-29 19:27:21
 * @Last Modified by:   Gibeom Choi
 * @Last Modified time: 2023-05-31 18:07:53
 */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtAccessTokenConfig } from 'src/config/jwt.config';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';
import { AuthGuard } from './auth.guard';

// User 관련 클래스 파일들은 전부 분리함.
// Module은 오로지 해당 이름을 가진 파일들만 관리해야하고,
// 외부에서 들어오는 외부 클래스들은 전부 providers로 불러와야함.
@Module({
  imports: [
    JwtModule.register({
      secret: jwtAccessTokenConfig.secretKey,
      signOptions: { expiresIn: jwtAccessTokenConfig.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, UserRepository, AuthGuard],
})
export class AuthModule {}
