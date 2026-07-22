import { randomUUID } from 'crypto';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ApiStatus, WebhookStatus } from '../constants/enums';
import HTTP_STATUS from '../constants/httpStatusCodes';
import { withMiddy } from '../middlewares/withMiddy';
import { buildApiResponse } from '../utils/responseUtils';

const createWebhook = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const body = (event.body ?? {}) as Record<string, unknown>;

  return buildApiResponse(HTTP_STATUS.OK, {
    status: ApiStatus.SUCCESS,
    message: 'Webhook created successfully',
    data: {
      webhook_id: randomUUID(),
      name: body.name ?? 'demo-webhook',
      account_id: body.account_id ?? 'demo-account',
      event_type: body.event_type ?? 'com.xplortechnologies.growth.demo',
      payload_url: body.payload_url ?? 'https://example.com/webhook',
      status: WebhookStatus.ACTIVE,
    },
  });
};

const handler = withMiddy(createWebhook, { parseBody: true });

export { handler };
