/* eslint-disable @typescript-eslint/no-explicit-any */
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import type { Context } from 'aws-lambda';
import { withErrorHandler } from './error';
import withLogger from './logger';

export interface MiddlewareConfig {
  enableLogger?: boolean;
  handleErrors?: boolean;
  parseBody?: boolean;
}

export function withMiddy<Result = any>(
  handler: (event: any, context: Context) => Promise<Result>,
  config: MiddlewareConfig = {},
) {
  const mergedConfig: MiddlewareConfig = {
    enableLogger: true,
    handleErrors: true,
    parseBody: false,
    ...config,
  };

  let chain = middy(handler);

  if (mergedConfig.enableLogger) {
    chain = chain.use(withLogger());
  }

  if (mergedConfig.parseBody) {
    chain = chain.use(httpJsonBodyParser());
  }

  if (mergedConfig.handleErrors) {
    chain = chain.use(withErrorHandler());
  }

  return chain;
}
