/**
 * @Author: Gibeom Choi
 * @Date:   2023-05-30 17:16:14
 * @Last Modified by:   Gibeom Choi
 * @Last Modified time: 2023-06-24 15:44:31
 */
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Gender } from 'src/user/entity/gender.enum';

export class RegisterRequestDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsEnum(Gender)
  gender: Gender; // `female`, `male`, `none` 중 택 1

  @IsOptional()
  @IsString()
  phone_number: string;

  @IsDateString()
  birthday?: Date;
}
