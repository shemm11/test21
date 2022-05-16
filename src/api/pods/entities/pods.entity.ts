import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, PrimaryColumn, Generated } from 'typeorm';

@Entity({ name: 'Pods' })
export class PodsEntity {
    @PrimaryGeneratedColumn()
    @Generated("uuid")
    uid: string

    @Column()
    name: string

    @Column()
    status: boolean = true

}