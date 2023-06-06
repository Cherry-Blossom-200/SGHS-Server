import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './entity/report.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) {}

  async create(report: Report): Promise<void> {
    await this.reportRepository.save(report);
  }

  async remove(id: number): Promise<void> {
    await this.reportRepository.delete(id);
  }
}
