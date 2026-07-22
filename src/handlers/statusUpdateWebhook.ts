import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ApiStatus, WebhookStatus } from '../constants/enums';
import HTTP_STATUS from '../constants/httpStatusCodes';
import { withMiddy } from '../middlewares/withMiddy';
import { buildApiResponse } from '../utils/responseUtils';

const statusUpdateWebhook = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const webhookId = event.pathParameters?.webhook_id ?? 'unknown';
  const body = (event.body ?? {}) as Record<string, unknown>;
  const status =
    body.status === WebhookStatus.INACTIVE ? WebhookStatus.INACTIVE : WebhookStatus.ACTIVE;

  return buildApiResponse(HTTP_STATUS.OK, {
    status: ApiStatus.SUCCESS,
    message: 'Webhook status updated successfully',
    data: {
      webhook_id: webhookId,
      status,
    },
  });
};

const handler = withMiddy(statusUpdateWebhook, { parseBody: true });

export { handler };
