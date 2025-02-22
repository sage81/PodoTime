import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Client } from '../clients/client.entity';

// Для дебагу
console.log('Database Config:', {
  host: 'yamanote.proxy.rlwy.net',
  port: 42798,
  username: 'postgres',
  database: 'railway',
});

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'yamanote.proxy.rlwy.net',
  port: parseInt(process.env.DB_PORT || '42798', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE || 'railway',
  entities: [Client],
  synchronize: false,
  ssl: {
    rejectUnauthorized: false
  },
  logging: process.env.NODE_ENV !== 'production',
  logger: 'advanced-console',
}; 