/**
 * @Author: Gibeom Choi
 * @Date:   2023-06-02 17:25:33
 * @Last Modified by:   Gibeom Choi
 * @Last Modified time: 2023-06-02 20:03:34
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
import { AuthGuard } from 'src/auth/auth.guard';
import { SiteService } from './site.service';
import { SiteRequestDTO } from './dto/site.request.dto';
import { Request } from 'express';
import { SiteUpdateDTO } from './dto/site.update.dto';

@Controller('api/v1/site')
export class SiteController {
  constructor(private siteService: SiteService) {}

  @Get('/:id')
  getSiteInfo(@Param('id') id: number) {
    return this.siteService.getSiteInfo(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  postNewSite(@Req() req: Request, @Body() siteReq: SiteRequestDTO) {
    return this.siteService.saveSite(req, siteReq);
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  updateSiteInfo(
    @Req() req: Request,
    @Param('id') site_id: number,
    @Body() updateReq: SiteUpdateDTO,
  ) {
    return this.siteService.updateSite(req, site_id, updateReq);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  deleteSiteInfo(@Req() req: Request, @Param('id') site_id: number) {
    return this.siteService.deleteSite(req, site_id);
  }
}
