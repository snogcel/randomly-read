// API Configuration
const config = {
  // Base API URL
  apiUrl: process.env.REACT_APP_API_URL || 'https://api.easyonset.com',
  
  // GraphQL endpoint
  graphqlEndpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT || 'https://api.easyonset.com/graphql',
  
  // Environment
  environment: process.env.NODE_ENV || 'development',
  
  // Helper methods
  getApiUrl: (path = '') => {
    const baseUrl = process.env.REACT_APP_API_URL || 'https://api.easyonset.com';
    return `${baseUrl}${path}`;
  },
  
  getGraphQLEndpoint: () => {
    return process.env.REACT_APP_GRAPHQL_ENDPOINT || 'https://api.easyonset.com/graphql';
  },
  
  isDevelopment: () => {
    return process.env.NODE_ENV === 'development';
  },
  
  isProduction: () => {
    return process.env.NODE_ENV === 'production';
  }
};

export default config;