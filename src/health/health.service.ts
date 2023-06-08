/**
 * @Author: Gibeom Choi
 * @Date:   2023-06-02 21:10:02
 * @Last Modified by:   Gibeom Choi
 * @Last Modified time: 2023-06-08 17:13:01
 */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { HealthRequestDTO } from './dto/health.request.dto';
import { Request } from 'express';
import { HealthRepository } from './health.repository';
import { UserService } from 'src/user/user.service';
import { Health } from './entity/health.entity';
import { HealthResponseDTO } from './dto/health.response.dto';
import { HealthUpdateDTO } from './dto/health.update.dto';

@Injectable()
export class HealthService {
  constructor(
    private readonly healthRepository: HealthRepository,
    private readonly userService: UserService,
  ) {}

  async getHealthInfo(req: Request, health_id: number) {
    const health = await this.healthRepository.findOne({
      where: { health_id },
      relations: {
        user: true,
      },
    });
    const user = await this.userService.findByField({
      where: { user_email: req['user'].email },
    });

    if (!health) {
      throw new BadRequestException('No such health info');
    } else if (!user) {
      throw new BadRequestException('No such user');
    } else if (health.user.user_id !== user.user_id) {
      throw new UnauthorizedException('No authorization');
    }

    const response = new HealthResponseDTO();
    response.health_info_text = health.health_info_text;
    response.health_info_blood_type = health.health_info_blood_type;
    response.health_info_medication = health.health_info_medication;
    response.health_info_height = health.health_info_height;
    response.health_info_weight = health.health_info_weight;

    return response;
  }

  async saveHealthInfo(req: Request, requestDto: HealthRequestDTO) {
    const requester = await this.userService.findByField({
      where: { user_email: req['user'].email },
    });

    // 같은 user_id를 가진 health_info 검색
    const searchResult = await this.healthRepository.findOne({
      where: { user: { user_id: requester.user_id } },
    });

    if (searchResult) {
      return new BadRequestException('user already have health info');
    }

    const health = new Health();
    health.health_info_blood_type = requestDto.blood_type;
    health.health_info_text = requestDto.health_text;
    health.health_info_medication = requestDto.medication;
    health.health_info_weight = requestDto.weight;
    health.health_info_height = requestDto.height;
    health.user = requester;

    const healthResult = await this.healthRepository.save(health);
    const response = new HealthResponseDTO();
    response.health_info_text = healthResult.health_info_text;
    response.health_info_blood_type = healthResult.health_info_blood_type;
    response.health_info_medication = healthResult.health_info_medication;
    response.health_info_height = healthResult.health_info_height;
    response.health_info_weight = healthResult.health_info_weight;
    response.health_info_id = health.health_id;

    return response;
  }

  async updateHealthInfo(
    req: Request,
    update_id: number,
    updateDto: HealthUpdateDTO,
  ) {
    const healthSearch = await this.healthRepository.findOne({
      where: { health_id: update_id },
      relations: { user: true },
    });

    if (healthSearch.user.user_email != req['user'].email) {
      return new UnauthorizedException('Not permitted');
    }

    const partialHealthInfo = new Health();
    partialHealthInfo.health_info_blood_type = updateDto.blood_type;
    partialHealthInfo.health_info_height = updateDto.height;
    partialHealthInfo.health_info_medication = updateDto.medication;
    partialHealthInfo.health_info_text = updateDto.health_text;
    partialHealthInfo.health_info_weight = updateDto.weight;

    return await this.healthRepository.update(update_id, partialHealthInfo);
  }

  async deleteHealthInfo(req: Request, health_id: number) {
    const healthSearch = await this.healthRepository.findOne({
      where: { health_id: health_id },
      relations: { user: true },
    });

    if (healthSearch.user.user_email != req['user'].email) {
      return new UnauthorizedException('Not permitted');
    }

    return await this.healthRepository.delete(health_id);
  }
}
