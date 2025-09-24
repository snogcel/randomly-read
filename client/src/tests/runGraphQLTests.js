#!/usr/bin/env node

/**
 * GraphQL Test Runner
 * 
 * This script runs all GraphQL-related tests to verify the Apollo Client 3.x upgrade
 * and ensure proper functionality of word database queries.
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Running GraphQL Apollo Client 3.x Tests...\n');

const testFiles = [
  'ApolloClient.test.js',
  'GraphQLQueries.test.js',
  'GraphQLIntegration.test.js',
  'WordCard.test.js',
  'RoutinePreview.test.js'
];

const testResults = {
  passed: [],
  failed: [],
  total: testFiles.length
};

testFiles.forEach((testFile, index) => {
  console.log(`📋 Running test ${index + 1}/${testFiles.length}: ${testFile}`);
  
  try {
    const result = execSync(
      `yarn test --testPathPattern=${testFile} --watchAll=false --verbose`,
      { 
        cwd: path.resolve(__dirname, '..', '..'),
        encoding: 'utf8',
        stdio: 'pipe'
      }
    );
    
    console.log(`✅ ${testFile} - PASSED`);
    testResults.passed.push(testFile);
    
  } catch (error) {
    console.log(`❌ ${testFile} - FAILED`);
    console.log(`Error: ${error.message}`);
    testResults.failed.push(testFile);
  }
  
  console.log(''); // Empty line for readability
});

// Summary
console.log('📊 Test Summary:');
console.log(`Total tests: ${testResults.total}`);
console.log(`Passed: ${testResults.passed.length}`);
console.log(`Failed: ${testResults.failed.length}`);

if (testResults.passed.length > 0) {
  console.log('\n✅ Passed tests:');
  testResults.passed.forEach(test => console.log(`  - ${test}`));
}

if (testResults.failed.length > 0) {
  console.log('\n❌ Failed tests:');
  testResults.failed.forEach(test => console.log(`  - ${test}`));
  
  console.log('\n🔧 Troubleshooting tips:');
  console.log('1. Ensure all dependencies are installed: yarn install');
  console.log('2. Check that Apollo Client 3.x is properly configured');
  console.log('3. Verify GraphQL queries are correctly formatted');
  console.log('4. Check network connectivity for integration tests');
  
  process.exit(1);
} else {
  console.log('\n🎉 All GraphQL tests passed! Apollo Client 3.x upgrade is successful.');
  process.exit(0);
}