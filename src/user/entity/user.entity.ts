/**
 * @Author: Gibeom Choi
 * @Date:   2023-05-29 17:40:48
 * @Last Modified by:   Gibeom Choi
 * @Last Modified time: 2023-05-31 18:02:29
 */

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Gender } from './gender.enum';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  user_name: string;

  @Column({ unique: true, nullable: false })
  user_email: string;

  @Column({ nullable: false })
  user_age: number;

  @Column({ nullable: false })
  user_password: string;

  @Column({
    type: 'set',
    enum: Gender,
    nullable: false,
  })
  user_gender: Gender;

  @Column({ nullable: true, type: 'datetime' })
  user_birthday: Date;

  @Column({ unique: true, nullable: true })
  user_phone_number?: string;

  // 생성 시기 시간을 자동으로 추가
  @CreateDateColumn()
  user_registration_time: Date;

  // 수정 시기 시간을 자동으로 업데이트
  @UpdateDateColumn()
  user_modification_time: Date;
}
