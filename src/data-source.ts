import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.HOST,
  port: Number(process.env.PORT),
  username: 'postgres',
  password: process.env.PASSWORD,
  database: process.env.NAME,
  entities: ['src/**/*.Entity.ts'],
  migrations: ['src/migrations/*.ts'],
});
