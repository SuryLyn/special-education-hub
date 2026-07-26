import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Intervention } from './Intervention';

@Entity('disabilities')
export class Disability {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  slug: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  category: string; // ASD, ID, SLI, HI, VI, OI, MI, LD, EBD, ADHD

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'simple-array' })
  causes: string[];

  @Column({ type: 'json' })
  symptoms: any[];

  @Column({ type: 'text' })
  epidemiology: string;

  @Column({ type: 'text', nullable: true })
  diagnosticCriteria: string;

  @Column({ type: 'json', nullable: true })
  assessmentTools: any[];

  @Column({ type: 'simple-array', nullable: true })
  relatedDisabilities: string[];

  @ManyToMany(() => Intervention, intervention => intervention.disabilities)
  @JoinTable()
  interventions: Intervention[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
