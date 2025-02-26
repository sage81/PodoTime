import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Client } from '../clients/entities/client.entity';
import { Appointment } from '../appointments/entities/appointment.entity';
import { CreateClientsTable1708626000000 } from '../migrations/1708626000000-CreateClientsTable';
import { CreateAppointmentsTable1708700000000 } from '../migrations/1708700000000-CreateAppointmentsTable';

// Завантажуємо .env файл
dotenv.config({ path: '.env' });

console.log('Checking environment:', {
  DATABASE_URL: process.env.DATABASE_PUBLIC_URL,
  NODE_ENV: process.env.NODE_ENV
});

if (!process.env.DATABASE_PUBLIC_URL) {
  throw new Error('DATABASE_PUBLIC_URL is not defined');
}

const dbUrl = new URL(process.env.DATABASE_PUBLIC_URL);

const config = new DataSource({
  type: 'postgres',
  host: dbUrl.hostname,
  port: parseInt(dbUrl.port, 10),
  username: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.replace(/^\//, ''),
  entities: [Client, Appointment],
  migrations: [CreateClientsTable1708626000000, CreateAppointmentsTable1708700000000],
  ssl: {
    rejectUnauthorized: false
  }
});

export default config; 