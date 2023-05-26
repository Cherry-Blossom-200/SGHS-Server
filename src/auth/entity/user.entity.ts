import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_name: string;

  @Column()
  user_email: string;

  @Column()
  user_age: number;

  @Column()
  user_password: string;

  @Column()
  user_gender: string;

  @Column()
  user_birthday: string;

  @Column()
  user_phoneNum: string;

  @Column()
  user_registrationTime: string;

  @Column()
  user_modificationTime: string;
}
