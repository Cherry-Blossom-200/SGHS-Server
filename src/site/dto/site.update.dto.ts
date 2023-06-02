/**
 * @Author: Gibeom Choi
 * @Date:   2023-06-02 19:46:21
 * @Last Modified by:   Gibeom Choi
 * @Last Modified time: 2023-06-02 19:47:17
 */
export class SiteUpdateDTO {
  name?: string;
  location?: string;
  type_code?: number;
  emergency_contact?: string;
  start_date?: Date;
  end_date?: Date;
}
