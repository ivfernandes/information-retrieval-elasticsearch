import { cleanEnv, str } from 'envalid';

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'production'] }),
  PORT: str(),
  DATABASE_HOST: str(),
  DATABASE_PORT: str(),
  DATABASE_NAME: str(),
  DATABASE_USERNAME: str(),
  DATABASE_PASSWORD: str(),
  DATABASE_DIALECT: str(),
});

export default {
  env: env.NODE_ENV,
  port: env.PORT,
  database: {
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    dialect: env.DATABASE_DIALECT,
    logging: env.NODE_ENV === 'development' || env.NODE_ENV === 'test',
  },
};
