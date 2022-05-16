import { ProviderEntity } from 'src/api/provider/entities/provider.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, PrimaryColumn, Generated } from 'typeorm';

@Entity({ name: 'Route' })
export class RouteEntity {
    @PrimaryGeneratedColumn()
    @Generated("uuid")
    uid: string

    @Column()
    code: string


    @Column()
    priority: number

    @ManyToOne(() => ProviderEntity, (code_porvider) => code_porvider.route, {eager: true})
    @JoinColumn({ name: 'code_provider_id', referencedColumnName: 'uid'})
    code_porvider: ProviderEntity

}