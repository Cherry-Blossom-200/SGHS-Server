/**
 * @Author: Gibeom Choi
 * @Date:   2023-06-02 21:23:46
 * @Last Modified by:   Gibeom Choi
 * @Last Modified time: 2023-06-06 16:12:06
 */

import { User } from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('health_info')
export class Health {
  @PrimaryGeneratedColumn()
  health_id: number;

  @Column('text', { nullable: true }) // 길이 제한 없는 문자열
  health_info_text?: string;

  @Column({ nullable: true })
  health_info_blood_type?: string;

  @Column('text', { nullable: true }) // 길이 제한 없는 문자열
  health_info_medication?: string;

  @Column()
  health_info_height: number;

  @Column()
  health_info_weight: number;

  @OneToOne(() => User)
  @JoinColumn() // 외래키를 가지는 한쪽에서만 관계를 설정하는 어노테이션
  user: User;
}
