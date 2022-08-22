
export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
  NODE_ENV,
  PORT,
  DB_HOST,
  CLIENT_ID,
  CLIENT_SECRET,
  SIGNING_SECRET,
  GRAPHQL_URL,
  LOG_FORMAT,
  LOG_DIR = '../logs',
  ORIGIN,
  LOGGER_PRETTY_PRINT,
} = process.env;
