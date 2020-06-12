import { Entity, Unique, PrimaryGeneratedColumn, Column } from 'typeorm';
import { select } from 'async';

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: String

  @Column()
  email: String

  @Column()
  password: String

  @Column()
  fullname: String

  @Column()
  birthday: Date

  @Column()
  salt: String

  @Column()
  role: String
}