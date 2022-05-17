import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RegexEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  regexCondition: string;

  @Column()
  regexSubst: string;

  @Column()
  regexNewSubst: string;

  @Column()
  flasg: string;
}