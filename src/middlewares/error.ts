import type { Request } from '@middy/core';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { buildApiErrorResponse } from '../utils/responseUtils';

export const withErrorHandler = () => ({
  onError: async (request: Request<APIGatewayProxyEvent, APIGatewayProxyResult>) =>
    buildApiErrorResponse(request.error),
});
