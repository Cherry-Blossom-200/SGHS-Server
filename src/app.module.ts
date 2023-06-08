/**
 * @Author: Gibeom Choi
 * @Date:   2023-05-29 17:40:48
 * @Last Modified by:   Gibeom Choi
 * @Last Modified time: 2023-06-06 16:08:03
 */
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { SiteModule } from './site/site.module';
import { HealthService } from './health/health.service';
import { HealthController } from './health/health.controller';
import { ReportModule } from './report/report.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UserModule,
    SiteModule,
    ReportModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
