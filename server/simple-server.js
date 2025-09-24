// Simple test server to verify basic functionality
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  if (parsedUrl.pathname === '/graphql') {
    res.setHeader('Content-Type', 'application/json');
    
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const query = JSON.parse(body);
          console.log('GraphQL Query:', query.query);
          
          // Mock response for exerciseRoutines
          if (query.query.includes('exerciseRoutines')) {
            res.writeHead(200);
            res.end(JSON.stringify({
              data: {
                exerciseRoutines: [
                  {
                    id: '1',
                    name: 'Beginner Practice',
                    description: 'Basic routine for beginners',
                    steps: [
                      {
                        mode: 'Word',
                        vowel: ['A', 'E'],
                        consonant: ['B', 'C'],
                        syllables: [1, 2],
                        position: 'initial',
                        repetitions: 5,
                        duration: 30
                      }
                    ]
                  }
                ]
              }
            }));
            return;
          }
          
          // Mock response for schema introspection
          if (query.query.includes('__schema')) {
            res.writeHead(200);
            res.end(JSON.stringify({
              data: {
                __schema: {
                  types: [
                    { name: 'Query' },
                    { name: 'ExerciseRoutine' },
                    { name: 'User' }
                  ]
                }
              }
            }));
            return;
          }
          
          // Default response
          res.writeHead(200);
          res.end(JSON.stringify({
            data: null,
            errors: [{ message: 'Query not implemented in mock server' }]
          }));
          
        } catch (error) {
          res.writeHead(400);
          res.end(JSON.stringify({
            errors: [{ message: 'Invalid JSON' }]
          }));
        }
      });
    } else {
      res.writeHead(405);
      res.end(JSON.stringify({
        errors: [{ message: 'Method not allowed' }]
      }));
    }
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: 'Not found' }));
  }
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`🚀 Mock GraphQL server running on http://localhost:${PORT}/graphql`);
  console.log('📋 Available endpoints:');
  console.log('   - POST /graphql (GraphQL queries)');
  console.log('');
  console.log('🔧 This is a temporary mock server for testing.');
  console.log('   Install Yarn and run "yarn install" for the full server.');
});

module.exports = server;