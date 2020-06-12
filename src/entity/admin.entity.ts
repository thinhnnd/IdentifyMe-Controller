import { Entity, Unique, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User, user => user.id, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'user_id' })
    user_id: number
}