import { config } from 'dotenv';
import Joi from 'joi';

config({ path: `.env` });

const schema = {
  NODE_ENV: Joi.string().required(),
  PORT: Joi.number().required(),
  LOG_FORMAT: Joi.string().valid('debug', 'info', 'warn', 'error').default('info'),
  LOGGER_PRETTY_PRINT: Joi.boolean().default(false),
};

const envValues = Object.fromEntries(Object.keys(schema).map(key => [key, process?.env[key]]))
const result = Joi.object(schema).validate(envValues);
console.log(result)
if (result.error) {
  throw new Error(`Environment variables validation failed: ${result?.error?.message}`);
}
