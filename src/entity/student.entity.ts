import { Entity, Unique, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
@Unique(['student_id'])
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User, user => user.id, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'user_id' })
    user_id: number

    @Column()
    connection_id: String

    @Column()
    student_id: String

    @Column()
    graduated_date: Date

    @Column()
    grade: String

    @Column()
    major: String

    @Column()
    issued_time: Number

    @Column()
    faculty: String
}