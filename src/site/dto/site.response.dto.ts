/**
 * @Author: Gibeom Choi
 * @Date:   2023-06-02 17:33:18
 * @Last Modified by:   Gibeom Choi
 * @Last Modified time: 2023-06-02 17:33:46
 */
export class SiteResponseDTO {
  site_id: number;
  site_name: string;
  site_location: string;
  site_type_code: number;
  site_emergency_contact: string;
  site_start_date: Date;
  site_end_date: Date;
}
