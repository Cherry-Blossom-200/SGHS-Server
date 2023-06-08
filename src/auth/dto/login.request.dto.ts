/**
 * @Author: Gibeom Choi
 * @Date:   2023-06-02 21:17:42
 * @Last Modified by:   Gibeom Choi
 * @Last Modified time: 2023-06-09 01:46:43
 */
import { IsEmail, IsString } from 'class-validator';

export class LoginRequestDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
