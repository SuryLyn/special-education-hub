import { DataSource } from 'typeorm';
import { Disability } from '../models/Disability';
import { Intervention } from '../models/Intervention';
import { RegionalResource } from '../models/RegionalResource';
import { CaseStudy } from '../models/CaseStudy';
import { User } from '../models/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'special_education_hub',
  synchronize: process.env.NODE_ENV === 'development',
  logging: false,
  entities: [
    Disability,
    Intervention,
    RegionalResource,
    CaseStudy,
    User,
  ],
  migrations: ['src/db/migrations/*.ts'],
  subscribers: [],
});
