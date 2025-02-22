import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Client } from '../clients/client.entity';

// Використовуємо URL підключення замість окремих параметрів
const dbUrl = process.env.DATABASE_PUBLIC_URL;
console.log('Trying to connect with URL:', dbUrl?.replace(/:[^:]+@/, ':***@'));

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: dbUrl,
  entities: [Client],
  synchronize: false,
  ssl: {
    rejectUnauthorized: false
  },
  logging: true,
  logger: 'advanced-console',
}; 