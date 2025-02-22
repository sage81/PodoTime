import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Client } from '../clients/client.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_PUBLIC_URL,
  entities: [Client],
  synchronize: false,
  ssl: {
    rejectUnauthorized: false
  },
  logging: process.env.NODE_ENV !== 'production',
  logger: 'advanced-console',
}; 