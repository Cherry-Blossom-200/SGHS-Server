/**
 * @Author: Gibeom Choi
 * @Date:   2023-05-29 17:40:48
 * @Last Modified by:   Gibeom Choi
 * @Last Modified time: 2023-05-31 18:27:02
 */
import { Gender } from '../entity/gender.enum';
import { Role } from '../entity/role.enum';

export class UserDTO {
  user_name: string;
  user_email: string;
  user_age: number;
  user_password: string;
  user_gender: Gender;
  user_phone_number?: string;
  user_birthday?: Date;
  user_registration_time: Date;
  user_modification_time: Date;
  user_role?: Role;
}
