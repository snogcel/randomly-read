const fetch = require('cross-fetch');

// Test multiple possible GraphQL endpoints
async function testEndpoints() {
  const endpoints = [
    'https://api.easyonset.com/graphql',
    'https://api.easyonset.com/api/graphql',
    'https://api.easyonset.com/graphiql',
    'https://api.easyonset.com/api/graphiql'
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`\n🔍 Testing: ${endpoint}`);
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: '{ __schema { types { name } } }'
        })
      });

      console.log(`   Status: ${response.status} ${response.statusText}`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.data) {
          console.log(`   ✅ SUCCESS! GraphQL endpoint found`);
          console.log(`   Available types: ${data.data.__schema.types.slice(0, 3).map(t => t.name).join(', ')}...`);
        } else if (data.errors) {
          console.log(`   ⚠️  GraphQL errors: ${data.errors[0].message}`);
        }
      } else {
        const text = await response.text();
        console.log(`   ❌ Failed: ${text.substring(0, 100)}...`);
      }
      
    } catch (error) {
      console.log(`   ❌ Network error: ${error.message}`);
    }
  }
}

testEndpoints();