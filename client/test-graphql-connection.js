const { ApolloClient, InMemoryCache, createHttpLink, gql } = require('@apollo/client');
const fetch = require('cross-fetch');

// Test GraphQL connection
async function testGraphQLConnection() {
  const httpLink = createHttpLink({
    uri: 'https://api.easyonset.com/graphql',
    fetch
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  try {
    console.log('Testing GraphQL connection to https://api.easyonset.com/graphql...');
    
    // Test basic schema query
    const result = await client.query({
      query: gql`
        query {
          __schema {
            types {
              name
            }
          }
        }
      `
    });
    
    console.log('✅ GraphQL server is accessible!');
    console.log('Available types:', result.data.__schema.types.slice(0, 5).map(t => t.name));
    
    // Test exercise routines query (the one that's likely failing)
    try {
      const routinesResult = await client.query({
        query: gql`
          query {
            exerciseRoutines {
              id
              name
              description
            }
          }
        `
      });
      
      console.log('✅ Exercise routines query successful!');
      console.log('Found routines:', routinesResult.data.exerciseRoutines?.length || 0);
      
    } catch (routineError) {
      console.log('❌ Exercise routines query failed:', routineError.message);
    }
    
  } catch (error) {
    console.log('❌ GraphQL server connection failed:', error.message);
    console.log('Make sure the GraphQL server is accessible at https://api.easyonset.com/graphql');
  }
}

testGraphQLConnection();