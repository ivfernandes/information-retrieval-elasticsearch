import { cleanEnv, str } from 'envalid';

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'production'] }),
  PORT: str(),
  ES_HOST: str(),
  ES_PORT: str(),
  ELASTIC_PASSWORD: str(),
});

export default {
  env: env.NODE_ENV,
  port: env.PORT,
  elastic: {
    host: env.ES_HOST,
    port: env.ES_PORT,
    password: env.ELASTIC_PASSWORD,
  },
};
