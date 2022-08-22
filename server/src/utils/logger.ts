import { Logger, LoggerLevel } from '@tribeplatform/node-logger';

const createLogger = (context: string = 'Global'): Logger =>
  new Logger({
    pretty: process.env.LOGGER_PRETTY_PRINT ? process.env.LOGGER_PRETTY_PRINT === 'true' : process.env.NODE_ENV === 'production' ? false : true,
    level: (process.env.LOG_FORMAT as LoggerLevel) || 'info',
    context,
  });

const logger = createLogger('Global');

export { logger, createLogger };
