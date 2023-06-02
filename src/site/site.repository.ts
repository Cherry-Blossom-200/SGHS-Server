import { Injectable } from '@nestjs/common';
import { Site } from './entity/site.entity';
import { DataSource, Repository } from 'typeorm';

/**
 * @Author: Gibeom Choi
 * @Date:   2023-06-02 19:20:30
 * @Last Modified by:   Gibeom Choi
 * @Last Modified time: 2023-06-02 19:30:29
 */
@Injectable()
export class SiteRepository extends Repository<Site> {
  constructor(private dataSource: DataSource) {
    super(Site, dataSource.createEntityManager());
  }
}
