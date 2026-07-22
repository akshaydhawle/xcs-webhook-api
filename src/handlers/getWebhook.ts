import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ApiStatus, WebhookStatus } from '../constants/enums';
import HTTP_STATUS from '../constants/httpStatusCodes';
import { withMiddy } from '../middlewares/withMiddy';
import { buildApiResponse } from '../utils/responseUtils';

const getWebhook = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const webhookId = event.pathParameters?.webhook_id ?? 'unknown';

  return buildApiResponse(HTTP_STATUS.OK, {
    status: ApiStatus.SUCCESS,
    data: {
      webhook_id: webhookId,
      name: 'demo-webhook',
      account_id: 'demo-account',
      event_type: 'com.xplortechnologies.growth.demo',
      payload_url: 'https://example.com/webhook',
      status: WebhookStatus.ACTIVE,
    },
  });
};

const handler = withMiddy(getWebhook);

export { handler };
