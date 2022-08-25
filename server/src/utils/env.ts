import { config } from 'dotenv';
import Joi from 'joi';
import { logger } from '@utils/logger';

config({ path: `.env` });

const schema = Joi.object({
  NODE_ENV: Joi.string().required(),
  PORT: Joi.number().required(),
  LOG_FORMAT: Joi.string().valid('debug', 'info', 'warn', 'error').default('info'),
  LOGGER_PRETTY_PRINT: Joi.boolean().default(false),
});
logger.log('Validating env...');

const result = schema.validate(process.env);
if (result.error) {
  throw new Error(`Environment variables validation failed: ${result?.error?.message}`);
}
