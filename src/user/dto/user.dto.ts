import { Gender } from '../entity/gender.enum';

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
}
