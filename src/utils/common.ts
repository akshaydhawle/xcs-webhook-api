import type { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import type { ApiResponseDTO } from '../dtos/common/apiResponse';

export const createApiResponse = <T>(
  statusCode: number,
  responseData: ApiResponseDTO<T>,
): APIGatewayProxyResult => ({
  statusCode,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(responseData),
});

function isApiGatewayEvent(event: APIGatewayEvent): boolean {
  return (
    !!event &&
    typeof event === 'object' &&
    'httpMethod' in event &&
    !!event.requestContext &&
    typeof event.requestContext === 'object' &&
    'apiId' in event.requestContext
  );
}

export function getLogInfo(event: APIGatewayEvent, context: Context) {
  const info: Record<string, unknown> = {
    function: context.functionName,
    payload: event,
  };

  if (isApiGatewayEvent(event)) {
    info.payload = {
      httpMethod: event.httpMethod,
      path: event.path,
      pathParameters: event.pathParameters,
      queryStringParameters: event.queryStringParameters,
      body: event?.body,
    };
  }
  return info;
}
