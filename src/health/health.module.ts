/**
 * @Author: Gibeom Choi
 * @Date:   2023-06-02 21:10:16
 * @Last Modified by:   Gibeom Choi
 * @Last Modified time: 2023-06-06 16:06:41
 */
import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from 'src/auth/auth.guard';
import { Health } from './entity/health.entity';
import { HealthRepository } from './health.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Health])],
  controllers: [HealthController],
  providers: [
    HealthService,
    HealthRepository,
    UserService,
    UserRepository,
    JwtService,
    AuthGuard,
  ],
})
export class HealthModule {}
