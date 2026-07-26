import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('regional_resources')
export class RegionalResource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  region: string; // US, UK, JP, SG, AU, HK, TW, RU

  @Column({ type: 'uuid', nullable: true })
  disabilityId: string;

  @Column({ type: 'uuid', nullable: true })
  interventionId: string;

  @Column({ type: 'varchar' })
  resourceType: string; // policy, case, organization, guideline, research

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  originalUrl: string;

  @Column({ type: 'text', nullable: true })
  translatedContent: string;

  @Column({ type: 'varchar', default: 'en' })
  language: string;

  @Column({ type: 'varchar', nullable: true })
  license: string;

  @Column({ type: 'text', nullable: true })
  attribution: string;

  @Column({ type: 'varchar', default: 'auto' })
  translationQuality: string; // auto, reviewed, professional

  @Column({ type: 'text', nullable: true })
  complianceNotes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
