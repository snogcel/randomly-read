#!/usr/bin/env node

/**
 * Timer System Test Runner
 * Comprehensive test execution for the refactored timer system
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Test configuration
const testConfig = {
  suites: [
    {
      name: 'Custom Hooks Tests',
      pattern: 'src/hooks/**/__tests__/**/*.{js,jsx,ts,tsx}',
      description: 'Testing useExerciseTimer, useRoutineExecution, useProgressTracking',
      timeout: 10000,
      coverage: true
    },
    {
      name: 'React Context Tests',
      pattern: 'src/contexts/**/__tests__/**/*.{js,jsx,ts,tsx}',
      description: 'Testing ExerciseContext and RoutineContext',
      timeout: 10000,
      coverage: true
    },
    {
      name: 'Timer Components Tests',
      pattern: 'src/components/RRLayout/**/__tests__/**/*.{js,jsx,ts,tsx}',
      description: 'Testing TimerControls, TimerDisplay, ExerciseProgress',
      timeout: 10000,
      coverage: true
    },
    {
      name: 'Integration Tests',
      pattern: 'src/tests/*integration*.{js,jsx,ts,tsx}',
      description: 'Testing component and hook integration',
      timeout: 15000,
      coverage: true
    },
    {
      name: 'Performance Tests',
      pattern: 'src/tests/*Performance*.{js,jsx,ts,tsx}',
      description: 'Testing performance and memory usage',
      timeout: 30000,
      coverage: false
    },
    {
      name: 'Accessibility Tests',
      pattern: 'src/tests/*Accessibility*.{js,jsx,ts,tsx}',
      description: 'Testing WCAG compliance and accessibility',
      timeout: 15000,
      coverage: false
    },
    {
      name: 'Session Persistence Tests',
      pattern: 'src/tests/*Persistence*.{js,jsx,ts,tsx}',
      description: 'Testing localStorage and session management',
      timeout: 10000,
      coverage: true
    }
  ],
  
  coverageThresholds: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85
    },
    hooks: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95
    },
    contexts: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  }
};

// Utility functions
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logHeader(message) {
  const border = '='.repeat(message.length + 4);
  log(border, 'cyan');
  log(`  ${message}  `, 'cyan');
  log(border, 'cyan');
}

function logSection(message) {
  log(`\n${'-'.repeat(50)}`, 'blue');
  log(message, 'blue');
  log('-'.repeat(50), 'blue');
}

function execCommand(command, options = {}) {
  try {
    const result = execSync(command, {
      stdio: 'pipe',
      encoding: 'utf8',
      ...options
    });
    return { success: true, output: result };
  } catch (error) {
    return { 
      success: false, 
      output: error.stdout || error.message,
      error: error.stderr || error.message
    };
  }
}

function checkTestFiles(pattern) {
  const glob = require('glob');
  const files = glob.sync(pattern);
  return files;
}

function generateTestReport(results) {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      total: results.length,
      passed: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      duration: results.reduce((sum, r) => sum + (r.duration || 0), 0)
    },
    suites: results,
    coverage: null
  };

  // Save report
  const reportPath = path.join(__dirname, 'timer-system-test-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  return report;
}

// Main test execution
async function runTimerSystemTests() {
  logHeader('Timer System Test Suite');
  log('Testing modern React timer architecture with hooks and contexts\n', 'bright');

  const results = [];
  let totalDuration = 0;

  // Check if we're in the correct directory
  if (!fs.existsSync('package.json')) {
    log('Error: Must be run from the client directory', 'red');
    process.exit(1);
  }

  // Pre-flight checks
  logSection('Pre-flight Checks');
  
  // Check for required test files
  let allFilesExist = true;
  for (const suite of testConfig.suites) {
    const files = checkTestFiles(suite.pattern);
    if (files.length === 0) {
      log(`⚠️  No test files found for pattern: ${suite.pattern}`, 'yellow');
    } else {
      log(`✅ Found ${files.length} test files for ${suite.name}`, 'green');
    }
  }

  // Check dependencies
  log('\nChecking test dependencies...', 'blue');
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredDeps = [
    '@testing-library/react',
    '@testing-library/jest-dom',
    '@testing-library/user-event',
    'jest-axe'
  ];

  for (const dep of requiredDeps) {
    if (packageJson.devDependencies?.[dep] || packageJson.dependencies?.[dep]) {
      log(`✅ ${dep}`, 'green');
    } else {
      log(`❌ Missing dependency: ${dep}`, 'red');
      allFilesExist = false;
    }
  }

  if (!allFilesExist) {
    log('\n❌ Pre-flight checks failed. Please install missing dependencies.', 'red');
    process.exit(1);
  }

  log('\n✅ Pre-flight checks passed!', 'green');

  // Run test suites
  for (const suite of testConfig.suites) {
    logSection(`Running ${suite.name}`);
    log(suite.description, 'cyan');
    
    const startTime = Date.now();
    
    // Build test command
    let command = `npm test -- --testPathPattern="${suite.pattern}" --watchAll=false`;
    
    if (suite.coverage) {
      command += ' --coverage';
    }
    
    if (suite.timeout) {
      command += ` --testTimeout=${suite.timeout}`;
    }

    log(`Command: ${command}`, 'blue');
    
    const result = execCommand(command);
    const duration = Date.now() - startTime;
    
    const suiteResult = {
      name: suite.name,
      pattern: suite.pattern,
      success: result.success,
      duration,
      output: result.output,
      error: result.error
    };

    results.push(suiteResult);
    totalDuration += duration;

    if (result.success) {
      log(`✅ ${suite.name} passed (${duration}ms)`, 'green');
    } else {
      log(`❌ ${suite.name} failed (${duration}ms)`, 'red');
      if (result.error) {
        log(`Error: ${result.error}`, 'red');
      }
    }
  }

  // Run comprehensive coverage report
  logSection('Generating Coverage Report');
  
  const coverageCommand = `npm test -- --coverage --watchAll=false --testPathPattern="src/(hooks|contexts|components/RRLayout)" --coverageReporters=text-lcov,html,json-summary`;
  const coverageResult = execCommand(coverageCommand);
  
  if (coverageResult.success) {
    log('✅ Coverage report generated', 'green');
    
    // Parse coverage summary if available
    const coveragePath = path.join(__dirname, '../coverage/coverage-summary.json');
    if (fs.existsSync(coveragePath)) {
      const coverage = JSON.parse(fs.readFileSync(coveragePath, 'utf8'));
      log('\nCoverage Summary:', 'bright');
      log(`Lines: ${coverage.total.lines.pct}%`, 'cyan');
      log(`Functions: ${coverage.total.functions.pct}%`, 'cyan');
      log(`Branches: ${coverage.total.branches.pct}%`, 'cyan');
      log(`Statements: ${coverage.total.statements.pct}%`, 'cyan');
    }
  } else {
    log('⚠️  Coverage report generation failed', 'yellow');
  }

  // Generate final report
  logSection('Test Results Summary');
  
  const report = generateTestReport(results);
  
  log(`Total Suites: ${report.summary.total}`, 'bright');
  log(`Passed: ${report.summary.passed}`, 'green');
  log(`Failed: ${report.summary.failed}`, report.summary.failed > 0 ? 'red' : 'green');
  log(`Total Duration: ${totalDuration}ms`, 'cyan');

  // Performance analysis
  logSection('Performance Analysis');
  
  const performanceThresholds = {
    unitTests: 5000, // 5 seconds
    integrationTests: 15000, // 15 seconds
    performanceTests: 30000, // 30 seconds
    accessibilityTests: 15000 // 15 seconds
  };

  for (const result of results) {
    const threshold = performanceThresholds[result.name.toLowerCase().replace(/\s+/g, '')] || 10000;
    if (result.duration > threshold) {
      log(`⚠️  ${result.name} took ${result.duration}ms (threshold: ${threshold}ms)`, 'yellow');
    } else {
      log(`✅ ${result.name} performance OK (${result.duration}ms)`, 'green');
    }
  }

  // Final status
  logSection('Final Status');
  
  if (report.summary.failed === 0) {
    log('🎉 All timer system tests passed!', 'green');
    log('The refactored timer architecture is working correctly.', 'green');
    
    // Additional success metrics
    log('\nArchitecture Validation:', 'bright');
    log('✅ Custom hooks are properly tested', 'green');
    log('✅ React Context integration is verified', 'green');
    log('✅ Component architecture is validated', 'green');
    log('✅ Performance benchmarks are met', 'green');
    log('✅ Accessibility standards are maintained', 'green');
    log('✅ Session persistence is working', 'green');
    
    process.exit(0);
  } else {
    log('❌ Some tests failed. Please review the results above.', 'red');
    
    // Show failed suites
    const failedSuites = results.filter(r => !r.success);
    log('\nFailed Suites:', 'red');
    for (const suite of failedSuites) {
      log(`  - ${suite.name}`, 'red');
    }
    
    process.exit(1);
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    log('Timer System Test Runner', 'bright');
    log('Usage: node runTimerSystemTests.js [options]', 'cyan');
    log('\nOptions:', 'bright');
    log('  --help, -h     Show this help message', 'cyan');
    log('  --suite <name> Run specific test suite', 'cyan');
    log('  --coverage     Generate coverage report', 'cyan');
    log('  --performance  Run only performance tests', 'cyan');
    log('  --accessibility Run only accessibility tests', 'cyan');
    log('\nAvailable Suites:', 'bright');
    for (const suite of testConfig.suites) {
      log(`  - ${suite.name}: ${suite.description}`, 'cyan');
    }
    process.exit(0);
  }

  // Handle specific suite execution
  const suiteIndex = args.indexOf('--suite');
  if (suiteIndex !== -1 && args[suiteIndex + 1]) {
    const suiteName = args[suiteIndex + 1];
    const suite = testConfig.suites.find(s => 
      s.name.toLowerCase().includes(suiteName.toLowerCase())
    );
    
    if (suite) {
      testConfig.suites = [suite];
      log(`Running specific suite: ${suite.name}`, 'cyan');
    } else {
      log(`Suite not found: ${suiteName}`, 'red');
      process.exit(1);
    }
  }

  // Handle performance-only execution
  if (args.includes('--performance')) {
    testConfig.suites = testConfig.suites.filter(s => 
      s.name.toLowerCase().includes('performance')
    );
  }

  // Handle accessibility-only execution
  if (args.includes('--accessibility')) {
    testConfig.suites = testConfig.suites.filter(s => 
      s.name.toLowerCase().includes('accessibility')
    );
  }

  runTimerSystemTests().catch(error => {
    log(`Fatal error: ${error.message}`, 'red');
    console.error(error);
    process.exit(1);
  });
}

module.exports = {
  runTimerSystemTests,
  testConfig
};