import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportService } from './report.service';
import { Report } from './entity/report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Report])],
  exports: [TypeOrmModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
