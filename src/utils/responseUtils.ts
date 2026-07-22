import type { APIGatewayProxyResult } from 'aws-lambda';
import createHttpError from 'http-errors';
import ERROR_MESSAGES from '../constants/errorMessages';
import HTTP_STATUS from '../constants/httpStatusCodes';
import type { ApiResponseDTO } from '../dtos/common/apiResponse';
import { createApiResponse } from './common';
import { logger } from './logger';

export const buildApiResponse = <T>(
  statusCode: number,
  data: ApiResponseDTO<T>,
): APIGatewayProxyResult => createApiResponse(statusCode, { ...data });

export const buildApiErrorResponse = (error: Error | null | unknown): APIGatewayProxyResult => {
  logger?.error(error);

  if (createHttpError.isHttpError(error)) {
    return createApiResponse(error.statusCode, {
      status: 'error',
      message: error.message,
    });
  }

  return createApiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, {
    status: 'error',
    message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
  });
};
