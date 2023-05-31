/**
 * @Author: Gibeom Choi
 * @Date:   2023-05-30 17:16:14
 * @Last Modified by:   Gibeom Choi
 * @Last Modified time: 2023-05-31 18:11:23
 */
import { Gender } from 'src/user/entity/gender.enum';

export class RegisterRequestDTO {
  email: string;
  password: string;
  name: string;
  age: number;
  gender: Gender; // `female`, `male`, `none` 중 택 1
  phone_number: string;
  birthday?: Date;
}
