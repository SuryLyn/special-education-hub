import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { Disability } from './Disability';

@Entity('interventions')
export class Intervention {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true })
  mechanism: string;

  @Column({ type: 'simple-array' })
  ageGroups: string[]; // 0-3, 3-6, 6-12, 12-18

  @Column({ type: 'varchar' })
  evidenceLevel: string; // I, II, III, IV, V (based on NIH standards)

  @Column({ type: 'float', default: 0 })
  efficacyRate: number;

  @Column({ type: 'text' })
  implementationGuide: string;

  @Column({ type: 'varchar' })
  duration: string;

  @Column({ type: 'varchar' })
  frequency: string;

  @Column({ type: 'varchar', nullable: true })
  cost: string;

  @Column({ type: 'text', nullable: true })
  contraindications: string;

  @Column({ type: 'json' })
  references: any[];

  @Column({ type: 'simple-array' })
  regions: string[]; // US, UK, JP, SG, AU, HK, TW, RU

  @ManyToMany(() => Disability, disability => disability.interventions)
  disabilities: Disability[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
