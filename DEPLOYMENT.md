# Deployment

The repository is prepared for GitHub Actions + FTPS deployment to `deekaycee.shop`.

Configure these values in the GitHub repository's `production` environment:

## Secrets

- `DEPLOY_FTPS_HOST`
- `DEPLOY_FTPS_USERNAME`
- `DEPLOY_FTPS_PASSWORD`

## Variables

- `DEPLOY_FTPS_PORT` — normally `21` for explicit FTPS
- `DEPLOY_FTPS_SERVER_DIR` — the FTPS path that maps to the domain's web root

Do not commit hosting passwords, API keys, or `.env` files. Confirm the FTPS server directory with the hosting provider before enabling the first production deployment.

This workflow currently deploys the static storefront prototype. When the Laravel application is introduced, the workflow will be extended to build Composer/frontend dependencies and run the required deployment commands through SSH or hosting cron.

