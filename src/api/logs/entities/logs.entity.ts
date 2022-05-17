import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, PrimaryColumn, Generated } from 'typeorm';
import { FuncHelperEntity } from './funcHelper.entity';

@Entity({ name: 'logs' })
export class LogsEntity {
    @PrimaryGeneratedColumn()
    @Generated("uuid")
    uid: string;

    @Column()
    username: string;

    @Column()
    ip: string;

    @Column({ type: 'date', nullable: false})
    date: Date;

    @Column()
    using_browser: string

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


    @ManyToOne(() => FuncHelperEntity, (func) => func.helper, {eager: true})
    @JoinColumn({ name: 'usingFuncId', referencedColumnName: 'uid'})
    func: FuncHelperEntity

    @Column({length: 2000, nullable: true})
    req_body: string

}