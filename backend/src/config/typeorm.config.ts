import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Client } from '../clients/client.entity';

// Для дебагу
const config = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '42798', 10),
  username: process.env.DB_USERNAME,
  database: process.env.DB_DATABASE,
};

console.log('Trying to connect with:', { ...config, password: '***' });

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  ...config,
  password: process.env.DB_PASSWORD,
  entities: [Client],
  synchronize: false,
  ssl: {
    rejectUnauthorized: false
  },
  logging: true,
  logger: 'advanced-console',
}; 