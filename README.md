# xcs-webhook-api (Node.js stub)

TypeScript Serverless Framework service mirroring the Python `xcs-webhook-api` HTTP routes, using patterns from `xcs-inbox-api`.

Handlers return simple success responses (**200**) with stub data — no DynamoDB, Cognito, SQS, EventBridge, or KMS integrations.

## Endpoints

| Method | Path | Handler |
|--------|------|---------|
| GET | `/v1/health-check` | healthCheck |
| POST | `/v1/webhook` | createWebhook |
| GET | `/v1/webhook/{webhook_id}` | getWebhook |
| GET | `/v1/webhooks?account_id=` | getWebhooks |
| PATCH | `/v1/webhook/{webhook_id}` | updateWebhook |
| PUT | `/v1/webhook/{webhook_id}/status` | statusUpdateWebhook |
| GET | `/v1/public-key/{key_id}` | getPublicKey |

## Run locally

```bash
cp .env.example .env
npm install
npm start
```

Offline default: `http://localhost:3001`

On AWS deploy, `serverless-domain-manager` maps the API under the shared custom domain
(`API_GATEWAY_CUSTOM_DOMAIN` / SSM) with base path `API_GATEWAY_SUFFIX` (default `webhook-api`),
same as the Python service — e.g. `https://api.astraaries.site/webhook/...`.

Examples:

```bash
curl http://localhost:3001/local/v1/health-check
curl -X POST http://localhost:3001/local/v1/webhook \
  -H 'Content-Type: application/json' \
  -d '{"name":"demo","account_id":"acc-1","event_type":"demo.event","payload_url":"https://example.com"}'
curl 'http://localhost:3001/local/v1/webhooks?account_id=acc-1'
```

## GitHub CI/CD

Workflows (inbox/webhook landing-zone style):

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `.github/workflows/ci.yml` | PR / non-main push | `tsc --noEmit` + ESLint |
| `.github/workflows/deploy-sls-aws-landing-zone.yml` | `main` push / manual | OIDC deploy to AWS |

Deploy uses GitHub Environment **`aws-xcs-shared-technology-dev-usea1-env`** (created by CDK) with:

- `AWS_REGION`
- `AWS_IAM_ROLE_ARN` → `arn:aws:iam::501921308880:role/xcs-dev-usea1-webhook-api-role`
- `SERVICE_NAME_PREFIX` → `xcs-dev-usea1-webhook-api`

OIDC trust is scoped to **`akshaydhawle/xcs-webhook-api`**. Push this code to that repo’s `main` branch (or ensure the IAM trust matches your fork) for deploy to succeed.
