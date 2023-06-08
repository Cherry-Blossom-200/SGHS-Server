import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { Report } from './entity/report.entity';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Post()
  create_report(@Body() report: Report) {
    return this.reportService.create(report);
  }

  @Delete(':id')
  remove_report(@Param('id') id: number) {
    return this.reportService.remove(id);
  }
}
