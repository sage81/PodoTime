import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Client } from '../clients/entities/client.entity';
import { Appointment } from '../appointments/entities/appointment.entity';
import { CreateClientsTable1708626000000 } from '../migrations/1708626000000-CreateClientsTable';
import { CreateAppointmentsTable1708700000000 } from '../migrations/1708700000000-CreateAppointmentsTable';

// Завантажуємо .env файл
dotenv.config();

console.log('Checking environment:', {
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
});

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  // Додаємо параметри з'єднання для вирішення проблеми ECONNRESET
  connectTimeoutMS: 30000, // 30 секунд
  extra: {
    connectionTimeoutMillis: 30000, // 30 секунд
    query_timeout: 30000, // 30 секунд
    statement_timeout: 30000, // 30 секунд
    idle_in_transaction_session_timeout: 30000, // 30 секунд
  },
});

export default dataSource; 