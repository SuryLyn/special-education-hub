import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { CaseStudy } from './CaseStudy';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', select: false })
  password: string;

  @Column({ type: 'varchar', default: 'user' })
  role: string; // user, educator, professional, admin

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @OneToMany(() => CaseStudy, caseStudy => caseStudy.author)
  caseStudies: CaseStudy[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
