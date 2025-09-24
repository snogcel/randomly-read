#!/usr/bin/env node

/**
 * Test runner script for RandomlyRead Server
 * Provides convenient test execution with different configurations
 */

const { spawn } = require('child_process');
const path = require('path');

const args = process.argv.slice(2);
const command = args[0] || 'all';

const testConfigs = {
  all: {
    description: 'Run all tests with coverage',
    command: 'npm',
    args: ['run', 'test:coverage']
  },
  unit: {
    description: 'Run unit tests (models and services)',
    command: 'npm',
    args: ['run', 'test:unit']
  },
  integration: {
    description: 'Run integration tests (API and GraphQL)',
    command: 'npm',
    args: ['run', 'test:integration']
  },
  performance: {
    description: 'Run performance and load tests',
    command: 'npm',
    args: ['run', 'test:performance']
  },
  watch: {
    description: 'Run tests in watch mode',
    command: 'npm',
    args: ['run', 'test:watch']
  },
  ci: {
    description: 'Run tests for CI/CD pipeline',
    command: 'npm',
    args: ['run', 'test:ci']
  },
  validate: {
    description: 'Run full validation (type-check, lint, test)',
    command: 'npm',
    args: ['run', 'validate']
  }
};

function showHelp() {
  console.log('\n🧪 RandomlyRead Server Test Runner\n');
  console.log('Usage: node run-tests.js [command]\n');
  console.log('Available commands:');
  
  Object.entries(testConfigs).forEach(([cmd, config]) => {
    console.log(`  ${cmd.padEnd(12)} - ${config.description}`);
  });
  
  console.log('\nExamples:');
  console.log('  node run-tests.js all         # Run all tests with coverage');
  console.log('  node run-tests.js unit        # Run only unit tests');
  console.log('  node run-tests.js watch       # Run tests in watch mode');
  console.log('  node run-tests.js validate    # Full validation pipeline\n');
}

function runTests(config) {
  console.log(`\n🚀 ${config.description}\n`);
  
  const child = spawn(config.command, config.args, {
    stdio: 'inherit',
    shell: true,
    cwd: __dirname
  });
  
  child.on('close', (code) => {
    if (code === 0) {
      console.log(`\n✅ Tests completed successfully!\n`);
    } else {
      console.log(`\n❌ Tests failed with exit code ${code}\n`);
      process.exit(code);
    }
  });
  
  child.on('error', (error) => {
    console.error(`\n❌ Error running tests: ${error.message}\n`);
    process.exit(1);
  });
}

// Handle help command
if (command === 'help' || command === '--help' || command === '-h') {
  showHelp();
  process.exit(0);
}

// Get test configuration
const config = testConfigs[command];

if (!config) {
  console.error(`\n❌ Unknown command: ${command}\n`);
  showHelp();
  process.exit(1);
}

// Set test environment
process.env.NODE_ENV = 'test';

// Run tests
runTests(config);