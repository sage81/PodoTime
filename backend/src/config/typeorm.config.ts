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
  // Видаляємо початковий слеш з pathname
  const database = dbUrl.pathname.replace(/^\//, '');

  typeOrmConfig = {
    type: 'postgres',
    host: dbUrl.hostname,
    port: parseInt(dbUrl.port, 10),
    username: dbUrl.username,
    password: dbUrl.password,
    database: database, // Використовуємо очищену назву бази даних
    entities: [Client],
    synchronize: false,
    ssl: {
      rejectUnauthorized: false
    },
    logging: true,
    logger: 'advanced-console',
    extra: {
      max: 20,
      connectionTimeoutMillis: 5000,
      client_encoding: 'UTF8',
    }
  };

  console.log('Database config:', {
    host: dbUrl.hostname,
    port: dbUrl.port,
    username: dbUrl.username,
    database: database,
    ssl: true,
  });
} catch (error) {
  console.error('Error parsing DATABASE_PUBLIC_URL:', error);
  throw error;
}

export { typeOrmConfig }; 