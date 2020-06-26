import { Entity, Unique, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Applicant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: String

    @Column()
    date_of_birth: Date

    @Column()
    email: String

    @Column()
    phone_number: String

    @Column()
    date_submit: Date

    @Column() 
    school: String

    @Column()
    address: String

    @Column()
    position: String

    @Column()
    is_validate_degree: Boolean

    @Column()
    is_ssi_support: Boolean

    @Column()
    connection_id: String

    @Column()
    invitation_url: String

    @Column()
    proof_id: String


}