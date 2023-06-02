/**
 * @Author: Gibeom Choi
 * @Date:   2023-06-02 17:25:43
 * @Last Modified by:   Gibeom Choi
 * @Last Modified time: 2023-06-02 21:05:52
 */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SiteRequestDTO } from './dto/site.request.dto';
import { Request } from 'express';
import { SiteRepository } from './site.repository';
import { Site } from './entity/site.entity';
import { UserService } from 'src/user/user.service';
import { SiteResponseDTO } from './dto/site.response.dto';
import { SiteUpdateDTO } from './dto/site.update.dto';

@Injectable()
export class SiteService {
  constructor(
    private siteRepository: SiteRepository,
    private userService: UserService,
  ) {}

  async saveSite(request: Request, siteDTO: SiteRequestDTO) {
    // payload 이메일 가져오기
    const adminUserEmail = request['user']?.email;
    if (!adminUserEmail) {
      return new BadRequestException('Cannot find user');
    }

    // email로 User를 검색
    const userResult = await this.userService.findByField({
      where: { user_email: adminUserEmail },
    });
    if (!userResult) {
      return new BadRequestException('Cannot find user');
    }

    // DB에 저장할 Site 객체 생성
    const site = new Site();
    site.site_administrator = userResult;
    site.site_emergency_contact = siteDTO.emergency_contact;
    site.site_end_date = siteDTO.end_date;
    site.site_location = siteDTO.location;
    site.site_start_date = siteDTO.start_date;
    site.site_end_date = siteDTO.end_date;
    site.site_name = siteDTO.name;
    site.site_type_code = siteDTO.type_code;

    // Response 제작
    const savedSite = await this.siteRepository.save(site);
    const response = new SiteResponseDTO();
    response.site_id = savedSite.site_id;
    response.site_name = savedSite.site_name;
    response.site_location = savedSite.site_location;
    response.site_type_code = savedSite.site_type_code;
    response.site_start_date = savedSite.site_start_date;
    response.site_end_date = savedSite.site_end_date;
    response.site_emergency_contact = savedSite.site_emergency_contact;

    return response;
  }

  async getSiteInfo(site_id: number) {
    return this.siteRepository.findOneBy({ site_id });
  }

  async updateSite(req: Request, site_id: number, updateInfo: SiteUpdateDTO) {
    const accessorEmail = req['user']?.email;
    if (!accessorEmail) {
      return new BadRequestException('Cannot find use');
    }

    const site = await this.siteRepository.findOne({
      where: {
        site_id,
      },
      relations: {
        site_administrator: true,
      },
    });
    const user = await this.userService.findByField({
      where: { user_email: accessorEmail },
    });

    if (site.site_administrator.user_id !== user.user_id) {
      return new UnauthorizedException(
        'Cannot access because you are not the administrator',
      );
    }
    const partialSite = new Site();
    partialSite.site_emergency_contact = updateInfo.emergency_contact;
    partialSite.site_name = updateInfo.name;
    partialSite.site_location = updateInfo.location;
    partialSite.site_end_date = updateInfo.end_date;
    partialSite.site_start_date = updateInfo.start_date;
    partialSite.site_type_code = updateInfo.type_code;

    return this.siteRepository.update(site_id, partialSite);
  }

  async deleteSite(req: Request, site_id: number) {
    const accessorEmail = req['user']?.email ?? undefined;
    if (!accessorEmail) {
      return new BadRequestException('Cannot find use');
    }

    const site = await this.siteRepository.findOne({
      where: {
        site_id,
      },
      relations: {
        site_administrator: true,
      },
    });
    const user = await this.userService.findByField({
      where: { user_email: accessorEmail },
    });

    if (site.site_administrator.user_id !== user.user_id) {
      return new UnauthorizedException(
        'Cannot access because you are not the administrator',
      );
    }

    return this.siteRepository.delete(site);
  }
}
