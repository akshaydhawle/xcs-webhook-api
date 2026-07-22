import winston from 'winston';

export let logger: winston.Logger;

const consoleDevFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp(),
  winston.format.printf(({ level, message, timestamp, stack, ...meta }) => {
    const metaString = Object.keys(meta).length ? `\n${JSON.stringify(meta, null, 2)}` : '';
    return `[${timestamp}] ${level}: ${message}${stack ? `\n${stack}` : ''}${metaString}\n\n`;
  }),
);

const jsonFormat = winston.format.combine(
  winston.format.errors({ stack: true }),
  winston.format.timestamp(),
  winston.format.json(),
);

const recreateLogger = () => {
  const isOffline = process.env.IS_OFFLINE === 'true' || process.env.IS_LOCAL === 'true';
  logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: isOffline ? consoleDevFormat : jsonFormat,
    transports: [new winston.transports.Console()],
  });
};

export const createLogger = (): winston.Logger => {
  if (!logger || !logger.writable) {
    recreateLogger();
  }
  return logger;
};

export const closeLogger = async () => {
  if (!logger) return;
  const loggerClosed = new Promise((resolve) => logger.on('finish', resolve));
  logger.end();
  return loggerClosed;
};
