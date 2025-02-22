import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Client } from '../clients/client.entity';

// Перевіряємо наявність URL
const databaseUrl = process.env.DATABASE_PUBLIC_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_PUBLIC_URL is not defined');
}

console.log('Raw DATABASE_PUBLIC_URL:', databaseUrl);

let typeOrmConfig: TypeOrmModuleOptions;

try {
  const dbUrl = new URL(databaseUrl);

  typeOrmConfig = {
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

  console.log('Database config:', {
    host: dbUrl.hostname,
    port: dbUrl.port,
    username: dbUrl.username,
    database: dbUrl.pathname.split('/')[1],
  });
} catch (error) {
  console.error('Error parsing DATABASE_PUBLIC_URL:', error);
  throw error;
}

export { typeOrmConfig }; 