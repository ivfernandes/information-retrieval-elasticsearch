import { cleanEnv, str } from 'envalid';

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'production'] }),
  PORT: str(),
  ELASTIC_CLOUD_ID: str(),
  ELASTIC_USERNAME: str(),
  ELASTIC_PASSWORD: str(),
});

export default {
  env: env.NODE_ENV,
  port: env.PORT,
  elastic: {
    cloudId: env.ELASTIC_CLOUD_ID,
    username: env.ELASTIC_USERNAME,
    password: env.ELASTIC_PASSWORD,
  },
};
