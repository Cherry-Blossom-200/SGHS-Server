/**
 * @Author: Gibeom Choi
 * @Date:   2023-05-30 17:22:19
 * @Last Modified by:   Gibeom Choi
 * @Last Modified time: 2023-05-31 18:10:42
 */
export class JwtResponseDTO {
  access_token: string;
  refresh_token?: string; // Null이 될 수 있기에 ?를 붙임
}
