/**
 * @Author: Gibeom Choi
 * @Date:   2023-05-29 17:40:48
 * @Last Modified by:   Gibeom Choi
 * @Last Modified time: 2023-06-02 21:12:45
 */
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { SiteModule } from './site/site.module';
import { HealthService } from './health/health.service';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UserModule,
    SiteModule,
  ],
  controllers: [HealthController],
  providers: [HealthService],
})
export class AppModule {}
