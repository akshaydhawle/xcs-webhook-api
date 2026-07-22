import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ApiStatus } from '../constants/enums';
import HTTP_STATUS from '../constants/httpStatusCodes';
import { withMiddy } from '../middlewares/withMiddy';
import { buildApiResponse } from '../utils/responseUtils';

const getPublicKey = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const keyId = event.pathParameters?.key_id ?? 'unknown';

  return buildApiResponse(HTTP_STATUS.OK, {
    status: ApiStatus.SUCCESS,
    data: {
      key_id: keyId,
      public_key: 'demo-public-key-base64',
      valid_until: '2099-12-31T23:59:59.000Z',
    },
  });
};

const handler = withMiddy(getPublicKey);

export { handler };
