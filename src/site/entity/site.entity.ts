/**
 * @Author: Gibeom Choi
 * @Date:   2023-06-02 17:34:14
 * @Last Modified by:   Gibeom Choi
 * @Last Modified time: 2023-06-02 20:59:32
 */

import { User } from 'src/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('site')
export class Site {
  @PrimaryGeneratedColumn()
  site_id: number;

  // Site와 User는 다대일(Site vs User) 관계를 지니고 있다.
  @ManyToOne(() => User, (user) => user.user_enrolled_sites)
  site_administrator: User;

  @Column()
  site_name: string;

  @Column()
  site_location: string;

  @Column()
  site_type_code: number;

  @Column()
  site_emergency_contact: string;

  @Column()
  site_start_date: Date;

  @Column()
  site_end_date: Date;

  @CreateDateColumn()
  site_registration_date: Date;

  @UpdateDateColumn()
  site_modification_date: Date;
}
