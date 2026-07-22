import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ApiStatus } from '../constants/enums';
import HTTP_STATUS from '../constants/httpStatusCodes';
import { withMiddy } from '../middlewares/withMiddy';
import { buildApiResponse } from '../utils/responseUtils';

const healthCheck = async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> =>
  buildApiResponse(HTTP_STATUS.OK, {
    status: ApiStatus.SUCCESS,
    message: 'ok',
    data: { service: 'webhook-api' },
  });

const handler = withMiddy(healthCheck);

export { handler };
