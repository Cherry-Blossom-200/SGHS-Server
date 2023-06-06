import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReportType } from './reportType.enum';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @CreateDateColumn()
  report_date: Date;

  @Column()
  report_location: string;

  @Column()
  site_id: number;

  @Column()
  report_type: ReportType;
}
