/**
 * Manual GraphQL Test
 * 
 * This script can be run to manually test GraphQL queries against the API
 * to verify that the Apollo Client 3.x upgrade is working correctly.
 */

import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { buildQuery } from '../util/api';

// Test configuration
const TEST_CONFIG = {
  apiUrl: process.env.REACT_APP_GRAPHQL_ENDPOINT || 'https://api.easyonset.com/graphql',
  testToken: 'your-test-token-here', // Replace with actual token for testing
  testQueries: [
    {
      name: 'Word Query - Basic',
      props: {
        vowel: ['A'],
        consonant: ['B'],
        syllables: [1],
        limit: 1,
        position: 'initial',
        age: 'adult',
        mode: 'Word'
      }
    },
    {
      name: 'Word Query - Multiple Vowels',
      props: {
        vowel: ['A', 'E', 'I'],
        consonant: ['B', 'C'],
        syllables: [1, 2],
        limit: 5,
        position: 'initial',
        age: 'adult',
        mode: 'Word'
      }
    },
    {
      name: 'Sentence Query - Basic',
      props: {
        vowel: ['A'],
        consonant: ['B'],
        syllables: [1],
        limit: 1,
        position: 'initial',
        age: 'adult',
        mode: 'Sentence'
      }
    },
    {
      name: 'Word Query - No Consonant',
      props: {
        vowel: ['A', 'E'],
        consonant: [],
        syllables: [1],
        limit: 3,
        position: 'initial',
        age: 'adult',
        mode: 'Word'
      }
    },
    {
      name: 'Word Query - No Vowel',
      props: {
        vowel: [],
        consonant: ['B', 'C'],
        syllables: [1, 2],
        limit: 3,
        position: 'initial',
        age: 'adult',
        mode: 'Word'
      }
    }
  ]
};

// Setup Apollo Client
function createApolloClient(token) {
  const httpLink = createHttpLink({
    uri: TEST_CONFIG.apiUrl,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

  return new ApolloClient({
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
}

// Test runner function
async function runManualTests() {
  console.log('🧪 Starting Manual GraphQL Tests...\n');
  
  const client = createApolloClient(TEST_CONFIG.testToken);
  const results = [];

  for (const testCase of TEST_CONFIG.testQueries) {
    console.log(`📋 Testing: ${testCase.name}`);
    console.log(`Parameters:`, JSON.stringify(testCase.props, null, 2));
    
    try {
      // Build the query
      const query = buildQuery(testCase.props);
      
      if (!query) {
        throw new Error('Query builder returned null');
      }
      
      console.log('✅ Query built successfully');
      
      // Execute the query
      const startTime = Date.now();
      const result = await client.query({
        query,
        fetchPolicy: 'no-cache',
        errorPolicy: 'all'
      });
      const endTime = Date.now();
      
      console.log(`✅ Query executed in ${endTime - startTime}ms`);
      console.log('Response data:', JSON.stringify(result.data, null, 2));
      
      results.push({
        test: testCase.name,
        status: 'PASSED',
        responseTime: endTime - startTime,
        data: result.data
      });
      
    } catch (error) {
      console.log(`❌ Test failed: ${error.message}`);
      
      results.push({
        test: testCase.name,
        status: 'FAILED',
        error: error.message
      });
    }
    
    console.log(''); // Empty line for readability
  }
  
  // Summary
  console.log('📊 Test Results Summary:');
  console.log(`Total tests: ${results.length}`);
  console.log(`Passed: ${results.filter(r => r.status === 'PASSED').length}`);
  console.log(`Failed: ${results.filter(r => r.status === 'FAILED').length}`);
  
  console.log('\n📋 Detailed Results:');
  results.forEach(result => {
    const status = result.status === 'PASSED' ? '✅' : '❌';
    const time = result.responseTime ? ` (${result.responseTime}ms)` : '';
    console.log(`${status} ${result.test}${time}`);
    
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    }
  });
  
  return results;
}

// Export for use in other files
export { runManualTests, createApolloClient, TEST_CONFIG };

// Run tests if this file is executed directly
if (typeof window === 'undefined' && require.main === module) {
  runManualTests()
    .then(results => {
      const failedTests = results.filter(r => r.status === 'FAILED');
      process.exit(failedTests.length > 0 ? 1 : 0);
    })
    .catch(error => {
      console.error('❌ Test runner failed:', error);
      process.exit(1);
    });
}