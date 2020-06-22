import { Entity, Unique, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Applicant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    connection_id: String

    @Column()
    name: String

    @Column()
    date_submit: Date

    @Column()
    date_of_birth: Date

    @Column()
    address: String

    @Column()
    position: String

    @Column()
    is_validate_degree: Boolean

    @Column()
    is_ssi_support: Boolean

    @Column() 
    school: String
}