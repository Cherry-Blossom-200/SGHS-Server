/**
 * @Author: Gibeom Choi
 * @Date:   2023-06-02 17:25:20
 * @Last Modified by:   Gibeom Choi
 * @Last Modified time: 2023-06-02 20:07:50
 */
import { Module } from '@nestjs/common';
import { SiteController } from './site.controller';
import { SiteService } from './site.service';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from './entity/site.entity';
import { SiteRepository } from './site.repository';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserRepository } from 'src/user/user.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Site])],
  controllers: [SiteController],
  providers: [
    SiteService,
    UserService,
    UserRepository,
    SiteRepository,
    JwtService,
    AuthGuard,
  ],
})
export class SiteModule {}
