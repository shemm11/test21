import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, PrimaryColumn, Generated } from 'typeorm';
import { LogsEntity } from './logs.entity';
import { ApiProperty } from '@nestjs/swagger'

@Entity({ name: 'funcHelper' })
export class FuncHelperEntity {
    @ApiProperty({ example: 'baa6b60b-fb6a-416d-ae4b-3ff1d4e07564', description: 'UID' })
    @PrimaryGeneratedColumn()
    @Generated("uuid")
    uid: string;

    @ApiProperty({ example: '/dashboards/history', description: 'Api path of request' })
    @Column()
    path: string;

    @ApiProperty({ example: 'Получение провайдеров', description: 'Description of the user action' })
    @Column()
    desciption: string;

    @ApiProperty({ example: 'SELECT', description: 'Method used in the request' })
    @Column()
    method: string

    @OneToMany(
        () => LogsEntity,
        (helper) => helper.func,
    )
    helper: LogsEntity[];

   
}