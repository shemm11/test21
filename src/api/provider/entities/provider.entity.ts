import { RouteEntity } from 'src/api/route/entities/route.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, PrimaryColumn, Generated, OneToMany } from 'typeorm';

@Entity({ name: 'Providers' })
export class ProviderEntity {
    @PrimaryGeneratedColumn()
    @Generated("uuid")
    uid: string

    @Column()
    operator: string

    @Column()
    description: string

    @Column()
    code: string

    @Column()
    status: boolean = false

    @OneToMany(
        () => RouteEntity,
        (route) => route.code_porvider,
    )
    route: RouteEntity[];
}