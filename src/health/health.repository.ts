import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Health } from './entity/health.entity';

/**
 * @Author: Gibeom Choi
 * @Date:   2023-06-02 19:20:30
 * @Last Modified by:   Gibeom Choi
 * @Last Modified time: 2023-06-06 15:56:59
 */
@Injectable()
export class HealthRepository extends Repository<Health> {
  constructor(private dataSource: DataSource) {
    super(Health, dataSource.createEntityManager());
  }
}
