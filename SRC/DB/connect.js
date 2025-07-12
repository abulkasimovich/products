import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
config();

const client = new MongoClient(process.env.MONGO_URI);
let db;

export async function connectDB() {
  try {
    await client.connect();
    db = client.db();
    console.log('Database connected successfully');
  } catch (error) {
    console.log('Error connecting to database:', error.message);
  }
}

export function getDB() {
  return db;
}