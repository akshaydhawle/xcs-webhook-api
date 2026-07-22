import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ApiStatus, WebhookStatus } from '../constants/enums';
import HTTP_STATUS from '../constants/httpStatusCodes';
import { withMiddy } from '../middlewares/withMiddy';
import { buildApiResponse } from '../utils/responseUtils';

const getWebhooks = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const accountId = event.queryStringParameters?.account_id ?? 'demo-account';
  const eventType = event.queryStringParameters?.event_type;

  return buildApiResponse(HTTP_STATUS.OK, {
    status: ApiStatus.SUCCESS,
    data: {
      webhooks: [
        {
          webhook_id: '00000000-0000-4000-8000-000000000001',
          name: 'demo-webhook',
          account_id: accountId,
          event_type: eventType ?? 'com.xplortechnologies.growth.demo',
          payload_url: 'https://example.com/webhook',
          status: WebhookStatus.ACTIVE,
        },
      ],
    },
  });
};

const handler = withMiddy(getWebhooks);

export { handler };
