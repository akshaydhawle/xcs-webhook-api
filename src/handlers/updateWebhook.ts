import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ApiStatus, WebhookStatus } from '../constants/enums';
import HTTP_STATUS from '../constants/httpStatusCodes';
import { withMiddy } from '../middlewares/withMiddy';
import { buildApiResponse } from '../utils/responseUtils';

const updateWebhook = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const webhookId = event.pathParameters?.webhook_id ?? 'unknown';
  const body = (event.body ?? {}) as Record<string, unknown>;

  return buildApiResponse(HTTP_STATUS.OK, {
    status: ApiStatus.SUCCESS,
    message: 'Webhook updated successfully',
    data: {
      webhook_id: webhookId,
      name: body.name ?? 'demo-webhook-updated',
      payload_url: body.payload_url ?? 'https://example.com/webhook',
      status: WebhookStatus.ACTIVE,
    },
  });
};

const handler = withMiddy(updateWebhook, { parseBody: true });

export { handler };
