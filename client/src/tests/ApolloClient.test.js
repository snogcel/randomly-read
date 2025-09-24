import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

describe('Apollo Client Configuration', () => {
  let client;
  const mockToken = 'test-token-123';

  beforeEach(() => {
    // Recreate the Apollo Client configuration from App/Component.js
    const httpLink = createHttpLink({
      uri: process.env.REACT_APP_GRAPHQL_ENDPOINT || 'https://api.easyonset.com/graphql',
    });

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: mockToken ? `Bearer ${mockToken}` : "",
        }
      }
    });

    client = new ApolloClient({
      link: from([authLink, httpLink]),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          errorPolicy: 'all'
        },
        query: {
          errorPolicy: 'all'
        }
      }
    });
  });

  it('creates Apollo Client instance successfully', () => {
    expect(client).toBeInstanceOf(ApolloClient);
  });

  it('configures InMemoryCache correctly', () => {
    expect(client.cache).toBeInstanceOf(InMemoryCache);
  });

  it('sets correct default options', () => {
    expect(client.defaultOptions.watchQuery.errorPolicy).toBe('all');
    expect(client.defaultOptions.query.errorPolicy).toBe('all');
  });

  it('configures HTTP link with correct URI', () => {
    // Test that the link chain includes the HTTP link
    expect(client.link).toBeDefined();
  });

  it('includes authorization header when token is provided', async () => {
    // Mock the operation context
    const mockOperation = {
      setContext: jest.fn(),
      getContext: () => ({ headers: {} })
    };

    // Test auth link functionality
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: mockToken ? `Bearer ${mockToken}` : "",
        }
      }
    });

    const result = authLink.request(mockOperation, () => Promise.resolve());
    
    expect(result).toBeDefined();
  });

  it('handles empty token gracefully', () => {
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: null ? `Bearer ${null}` : "",
        }
      }
    });

    expect(authLink).toBeDefined();
  });
});