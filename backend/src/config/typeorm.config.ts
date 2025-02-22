import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Client } from '../clients/client.entity';

// Розбираємо URL на компоненти для більшої гнучкості
const dbUrl = new URL(process.env.DATABASE_PUBLIC_URL || '');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: dbUrl.hostname,
  port: parseInt(dbUrl.port, 10),
  username: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.split('/')[1],
  entities: [Client],
  synchronize: false,
  ssl: {
    rejectUnauthorized: false
  },
  logging: true,
  logger: 'advanced-console',
};

// Логуємо конфігурацію без чутливих даних
console.log('Database config:', {
  host: dbUrl.hostname,
  port: dbUrl.port,
  username: dbUrl.username,
  database: dbUrl.pathname.split('/')[1],
}); 