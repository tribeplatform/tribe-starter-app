import { config } from 'dotenv';
config({ path: `.env` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
  NODE_ENV,
  PORT,
  DB_HOST,
  CLIENT_ID,
  CLIENT_SECRET,
  SIGNING_SECRET,
  NETWORK_ID,
  MEMBER_ID,
  GRAPHQL_URL,
  LOG_FORMAT,
  LOG_DIR = '../logs',
  ORIGIN,
} = process.env;
