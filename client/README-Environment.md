# Environment Configuration

This application supports environment-based configuration for API endpoints.

## Environment Variables

The following environment variables control API routing:

- `REACT_APP_API_URL`: Base API URL (default: https://api.easyonset.com)
- `REACT_APP_GRAPHQL_ENDPOINT`: GraphQL endpoint (default: https://api.easyonset.com/graphql)

## Environment Files

- `.env`: Default environment variables (committed to repo)
- `.env.development`: Development-specific variables (committed to repo)
- `.env.production`: Production-specific variables (committed to repo)
- `.env.local`: Local overrides (ignored by git)
- `.env.development.local`: Local development overrides (ignored by git)
- `.env.production.local`: Local production overrides (ignored by git)

## Usage

### Development
When running `npm start` or `yarn start`, the app will use:
1. Variables from `.env.development.local` (if exists)
2. Variables from `.env.development`
3. Variables from `.env.local` (if exists)
4. Variables from `.env`

### Production
When running `npm run build`, the app will use:
1. Variables from `.env.production.local` (if exists)
2. Variables from `.env.production`
3. Variables from `.env.local` (if exists)
4. Variables from `.env`

## Local Development Setup

For local development with a local API server:

1. Create `.env.development.local`:
```
REACT_APP_API_URL=http://localhost:4000
REACT_APP_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
```

2. Start your local API server on port 4000
3. Run `npm start` or `yarn start`

## Production Deployment

The production build will automatically use the production environment variables pointing to `api.easyonset.com`.

## Configuration Helper

You can import the configuration helper for centralized API configuration:

```javascript
import config from './config/api';

// Get API URL
const apiUrl = config.getApiUrl('/api/posts');

// Get GraphQL endpoint
const graphqlEndpoint = config.getGraphQLEndpoint();

// Check environment
if (config.isDevelopment()) {
  console.log('Running in development mode');
}
```