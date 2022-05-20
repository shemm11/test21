import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, PrimaryColumn, Generated } from 'typeorm';
import { FuncHelperEntity } from './funcHelper.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

@Entity({ name: 'logs' })
export class LogsEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 'baa6b60b-fb6a-416d-ae4b-3ff1d4e07564', description: 'UID' })
    @Generated("uuid")
    uid: string;

    @ApiProperty({ example: 'baa6b60b-fb6a-416d-ae4b-3ff1d4e07564', description: 'link to table permissions.tuser.uid' })
    @Column()
    username: string;

    @ApiProperty({ example: '10.20.32.71', description: 'User ip address' })
    @Column()
    ip: string;

    @ApiProperty({ example: '2022-05-19T00:00:00', description: 'Transaction time' })
    @Column({ type: 'date', nullable: false})
    date: Date;

    @ApiProperty({ example: 'Chrome', description: 'User browser' })
    @Column()
    using_browser: string

    @ApiProperty({ example: true, description: 'Status of request' })
    @Column({
        type: 'boolean',
        transformer: {
            to: (d) => d,
            from: (is_successful) =>{
                switch (is_successful) {
                    case true: return 'Успешно'
                    case false: return 'Не успешно'
                }
            }
        }
        
    })
    is_successful: boolean


    @ApiProperty({ example: '3519c2ca-3eec-488d-b107-5173b068ec4e', description: 'Link to table func_helper.uid' })
    @ManyToOne(() => FuncHelperEntity, (func) => func.helper, {eager: true})
    @JoinColumn({ name: 'usingFuncId', referencedColumnName: 'uid'})
    func: FuncHelperEntity

    @ApiPropertyOptional({ example: '{"dateBegin":"2022-05-19T00:00:00","dateEnd":"2022-05-19T09:36"}' , description: 'User request body' })
    @Column({length: 2000, nullable: true})
    req_body: string

}