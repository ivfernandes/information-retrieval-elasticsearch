import config from 'config';
import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
  host: config.get('database.host'),
  port: config.get('database.port'),
  username: config.get('database.username'),
  password: config.get('database.password'),
  database: config.get('database.database'),
  logging: config.get('database.logging'),
  dialect: config.get('database.dialect'),
});
