/**
 * @Author: Gibeom Choi
 * @Date:   2023-05-29 17:40:48
 * @Last Modified by:   Gibeom Choi
 * @Last Modified time: 2023-06-18 15:12:40
 */
import { Gender } from '../entity/gender.enum';
import { Role } from '../entity/role.enum';

export class UserUpdateDTO {
  user_name?: string;
  user_email?: string;
  user_age?: number;
  user_password?: string;
  user_gender?: Gender;
  user_phone_number?: string;
  user_birthday?: Date;
  user_registration_time?: Date;
  user_modification_time?: Date;
  user_role?: Role;
}
