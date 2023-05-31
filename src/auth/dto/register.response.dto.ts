import { Gender } from 'src/user/entity/gender.enum';

/**
 * @Author: Gibeom Choi
 * @Date:   2023-05-31 18:33:49
 * @Last Modified by:   Gibeom Choi
 * @Last Modified time: 2023-05-31 18:35:41
 */
export class RegisterResponseDTO {
  user_age: number;
  user_name: string;
  user_gender: Gender;
  user_email: string;
  user_phone_number: string;
  user_registration_time: Date;
  user_birthday?: Date;
}
