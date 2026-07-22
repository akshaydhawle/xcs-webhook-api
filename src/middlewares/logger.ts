import type { Request } from '@middy/core';
import type { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getLogInfo } from '../utils/common';
import { closeLogger, createLogger, logger } from '../utils/logger';

const withLogger = () => ({
  before: async ({ event, context }: Request<APIGatewayEvent, APIGatewayProxyResult>) => {
    createLogger();
    const info = getLogInfo(event, context);
    logger.debug(`function:${context.functionName}, execution started`, info);
    logger.info(`function:${context.functionName}, execution started`);
  },
  after: async ({ context, response }: Request<APIGatewayEvent, APIGatewayProxyResult>) => {
    logger.info(`function:${context.functionName}, execution succeeded`, {
      statusCode: response?.statusCode,
    });
    await closeLogger();
  },
  onError: async () => {
    await closeLogger();
  },
});

export default withLogger;
