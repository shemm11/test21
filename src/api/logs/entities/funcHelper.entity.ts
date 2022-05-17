import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, PrimaryColumn, Generated } from 'typeorm';
import { LogsEntity } from './logs.entity';

@Entity({ name: 'funcHelper' })
export class FuncHelperEntity {
    @PrimaryGeneratedColumn()
    @Generated("uuid")
    uid: string;

    @Column()
    desciption: string;

    @Column()
    path: string;

    @Column()
    method: string

    @OneToMany(
        () => LogsEntity,
        (helper) => helper.func,
    )
    helper: LogsEntity[];

   
}