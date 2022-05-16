import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, PrimaryColumn, Generated } from 'typeorm';

@Entity({ name: 'templates' })
export class TemplatesEntity {
    @PrimaryGeneratedColumn()
    @Generated("uuid")
    uid: string;

    @Column()
    condition: string

    @Column()
    subString: string

    @Column()
    newSubString: string

    @Column()
    flags: string

}