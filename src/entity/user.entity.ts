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

  @Column({ select: false })
  password: String

  @Column()
  fullname: String

  @Column()
  birthday: Date

  @Column({ select: false })
  salt: String

  @Column()
  role: String
}