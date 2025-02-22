import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Client } from '../clients/client.entity';

// Перевіряємо URL
const dbUrl = process.env.DATABASE_PUBLIC_URL;
console.log('Database URL:', dbUrl); // Для дебагу

if (!dbUrl) {
  throw new Error('DATABASE_PUBLIC_URL is not defined');
}

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: dbUrl,
  entities: [Client],
  synchronize: false,
  ssl: {
    rejectUnauthorized: false
  },
  logging: process.env.NODE_ENV !== 'production',
  logger: 'advanced-console',
}; 