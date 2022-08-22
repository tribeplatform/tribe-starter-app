import { config } from 'dotenv';
import { cleanEnv, port, str } from 'envalid';
config({ path: `.env` });
cleanEnv(process.env, {
  NODE_ENV: str(),
  PORT: port(),
});
