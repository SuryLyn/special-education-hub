import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity('case_studies')
export class CaseStudy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'uuid' })
  disabilityId: string;

  @Column({ type: 'simple-array' })
  interventionIds: string[];

  @Column({ type: 'integer' })
  ageAtIntervention: number;

  @Column({ type: 'integer' })
  durationMonths: number;

  @Column({ type: 'text' })
  outcome: string;

  @ManyToOne(() => User)
  author: User;

  @Column({ type: 'boolean', default: false })
  isVerified: boolean;

  @Column({ type: 'integer', default: 0 })
  likes: number;

  @Column({ type: 'integer', default: 0 })
  views: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
