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
  host: 'yamanote.proxy.rlwy.net',
  port: 42798,
  username: 'postgres',
  password: 'RwceZSmRQQxcIfMeRzVQenQkNtMFeTVq',
  database: 'railway',
  entities: [Client],
  synchronize: false,
  ssl: {
    rejectUnauthorized: false
  },
  logging: process.env.NODE_ENV !== 'production',
  logger: 'advanced-console',
}; 