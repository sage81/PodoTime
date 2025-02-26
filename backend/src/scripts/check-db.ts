import { createConnection } from 'typeorm';
import * as dotenv from 'dotenv';
import { Client } from '../clients/client.entity';

dotenv.config();

function decodeURIIfNeeded(text: string | null | undefined): string {
  if (!text) return '';
  try {
    // Перевіряємо, чи текст URL-encoded
    if (text.includes('%')) {
      return decodeURIComponent(text);
    }
    return text;
  } catch (e) {
    return text;
  }
}

async function checkDatabase() {
  try {
    const dbUrl = new URL(process.env.DATABASE_PUBLIC_URL || '');
    
    const connection = await createConnection({
      type: 'postgres',
      host: dbUrl.hostname,
      port: parseInt(dbUrl.port, 10),
      username: dbUrl.username,
      password: dbUrl.password,
      database: dbUrl.pathname.replace(/^\//, ''),
      entities: [Client],
      ssl: {
        rejectUnauthorized: false
      }
    });

    console.log('Connected to database');

    // Перевіряємо налаштування кодування
    const encodingResult = await connection.query('SHOW client_encoding');
    console.log('Current encoding:', encodingResult);

    // Додатково перевіримо налаштування сервера
    const serverEncoding = await connection.query('SHOW server_encoding');
    console.log('Server encoding:', serverEncoding);

    // Отримуємо всі записи з таблиці clients
    const clients = await connection.manager.find(Client);
    console.log('\nClients in database:');
    clients.forEach(client => {
      console.log(`\nID: ${client.id}`);
      console.log(`Name: ${decodeURIIfNeeded(client.firstName)} ${decodeURIIfNeeded(client.lastName)}`);
      console.log(`Phone: ${client.phone}`);
      console.log(`Notes: ${decodeURIIfNeeded(client.notes)}`);
      console.log(`Created: ${client.createdAt}`);
      // Додамо сирі дані для аналізу
      console.log('Raw firstName:', Buffer.from(client.firstName).toString('hex'));
      console.log('Raw lastName:', Buffer.from(client.lastName).toString('hex'));
    });

    await connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkDatabase(); 