import { Client } from 'pg';
import * as dotenv from 'dotenv';

// Завантажуємо змінні середовища з .env файлу
dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_PUBLIC_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function testConnection() {
  try {
    console.log('Trying to connect with URL:', process.env.DATABASE_PUBLIC_URL);
    await client.connect();
    console.log('Successfully connected to the database');
    const result = await client.query('SELECT NOW()');
    console.log('Current time in DB:', result.rows[0]);
    await client.end();
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

testConnection(); 