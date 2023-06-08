/**
 * @Author: Gibeom Choi
 * @Date:   2023-06-02 21:10:09
 * @Last Modified by:   Gibeom Choi
 * @Last Modified time: 2023-06-08 17:00:31
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { HealthRequestDTO } from './dto/health.request.dto';
import { HealthService } from './health.service';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { HealthUpdateDTO } from './dto/health.update.dto';

@Controller('/api/v1/health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getHealthInfo(@Req() req: Request, @Param('id') health_id: number) {
    return this.healthService.getHealthInfo(req, health_id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async saveHealthInfo(
    @Req() req: Request,
    @Body() healthRequestDto: HealthRequestDTO,
  ) {
    return this.healthService.saveHealthInfo(req, healthRequestDto);
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  async updateHealthInfo(
    @Req() req: Request,
    @Param('id') update_id: number,
    @Body() updateDto: HealthUpdateDTO,
  ) {
    return this.healthService.updateHealthInfo(req, update_id, updateDto);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deleteHealthInfo(@Req() req: Request, @Param('id') health_id: number) {
    return this.healthService.deleteHealthInfo(req, health_id);
  }
}
