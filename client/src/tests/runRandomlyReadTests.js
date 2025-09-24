#!/usr/bin/env node

/**
 * Test runner for RandomlyRead components
 * This script runs all RandomlyRead-related tests and generates a comprehensive report
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
  testFiles: [
    'RandomlyRead.routes.test.js',
    'RandomlyRead.components.test.js', 
    'RandomlyRead.practice.test.js',
    'RandomlyRead.e2e.test.js'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  timeout: 30000 // 30 seconds
};

// Utility functions
const log = (message, color = 'reset') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

const logHeader = (message) => {
  log('\n' + '='.repeat(60), 'cyan');
  log(`  ${message}`, 'bright');
  log('='.repeat(60), 'cyan');
};

const logSubHeader = (message) => {
  log(`\n${'-'.repeat(40)}`, 'blue');
  log(`  ${message}`, 'blue');
  log('-'.repeat(40), 'blue');
};

const logSuccess = (message) => log(`✓ ${message}`, 'green');
const logError = (message) => log(`✗ ${message}`, 'red');
const logWarning = (message) => log(`⚠ ${message}`, 'yellow');
const logInfo = (message) => log(`ℹ ${message}`, 'blue');

// Check if test files exist
const checkTestFiles = () => {
  logSubHeader('Checking Test Files');
  
  const missingFiles = [];
  const existingFiles = [];
  
  testConfig.testFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      existingFiles.push(file);
      logSuccess(`Found: ${file}`);
    } else {
      missingFiles.push(file);
      logError(`Missing: ${file}`);
    }
  });
  
  if (missingFiles.length > 0) {
    logWarning(`${missingFiles.length} test files are missing`);
    return false;
  }
  
  logSuccess(`All ${existingFiles.length} test files found`);
  return true;
};

// Run individual test file
const runTestFile = (testFile) => {
  try {
    logInfo(`Running ${testFile}...`);
    
    const command = `npm test -- --testPathPattern=${testFile} --verbose --coverage=false --watchAll=false`;
    const output = execSync(command, { 
      encoding: 'utf8',
      cwd: path.join(__dirname, '..'),
      timeout: testConfig.timeout
    });
    
    // Parse test results
    const lines = output.split('\n');
    const passedTests = lines.filter(line => line.includes('✓')).length;
    const failedTests = lines.filter(line => line.includes('✗')).length;
    const totalTests = passedTests + failedTests;
    
    if (failedTests === 0) {
      logSuccess(`${testFile}: ${passedTests}/${totalTests} tests passed`);
      return { file: testFile, passed: passedTests, failed: failedTests, success: true };
    } else {
      logError(`${testFile}: ${failedTests}/${totalTests} tests failed`);
      return { file: testFile, passed: passedTests, failed: failedTests, success: false };
    }
    
  } catch (error) {
    logError(`${testFile}: Failed to run tests`);
    console.error(error.message);
    return { file: testFile, passed: 0, failed: 0, success: false, error: error.message };
  }
};

// Run all tests
const runAllTests = () => {
  logSubHeader('Running Individual Test Files');
  
  const results = [];
  
  testConfig.testFiles.forEach(testFile => {
    const result = runTestFile(testFile);
    results.push(result);
  });
  
  return results;
};

// Run coverage analysis
const runCoverage = () => {
  logSubHeader('Running Coverage Analysis');
  
  try {
    const command = `npm test -- --testPathPattern=RandomlyRead --coverage --watchAll=false --coverageReporters=text-summary --coverageReporters=lcov`;
    const output = execSync(command, { 
      encoding: 'utf8',
      cwd: path.join(__dirname, '..'),
      timeout: testConfig.timeout * 2 // Double timeout for coverage
    });
    
    // Parse coverage results
    const lines = output.split('\n');
    const coverageLine = lines.find(line => line.includes('All files'));
    
    if (coverageLine) {
      logSuccess('Coverage analysis completed');
      log(coverageLine, 'cyan');
      
      // Check if coverage meets threshold
      const coverageMatch = coverageLine.match(/(\d+\.?\d*)%/g);
      if (coverageMatch && coverageMatch.length >= 4) {
        const [statements, branches, functions, lines] = coverageMatch.map(m => parseFloat(m));
        
        const meetsThreshold = 
          statements >= testConfig.coverageThreshold.global.statements &&
          branches >= testConfig.coverageThreshold.global.branches &&
          functions >= testConfig.coverageThreshold.global.functions &&
          lines >= testConfig.coverageThreshold.global.lines;
        
        if (meetsThreshold) {
          logSuccess('Coverage threshold met');
        } else {
          logWarning('Coverage threshold not met');
        }
        
        return { success: true, meetsThreshold, coverage: { statements, branches, functions, lines } };
      }
    }
    
    return { success: true, meetsThreshold: false };
    
  } catch (error) {
    logError('Coverage analysis failed');
    console.error(error.message);
    return { success: false, error: error.message };
  }
};

// Generate test report
const generateReport = (testResults, coverageResult) => {
  logSubHeader('Test Report Summary');
  
  const totalTests = testResults.reduce((sum, result) => sum + result.passed + result.failed, 0);
  const totalPassed = testResults.reduce((sum, result) => sum + result.passed, 0);
  const totalFailed = testResults.reduce((sum, result) => sum + result.failed, 0);
  const successfulFiles = testResults.filter(result => result.success).length;
  
  log(`\nTest Files: ${successfulFiles}/${testResults.length} passed`, 
    successfulFiles === testResults.length ? 'green' : 'red');
  log(`Total Tests: ${totalPassed}/${totalTests} passed`, 
    totalFailed === 0 ? 'green' : 'red');
  
  if (coverageResult.success && coverageResult.coverage) {
    log(`\nCoverage:`, 'cyan');
    log(`  Statements: ${coverageResult.coverage.statements}%`, 
      coverageResult.coverage.statements >= testConfig.coverageThreshold.global.statements ? 'green' : 'red');
    log(`  Branches: ${coverageResult.coverage.branches}%`, 
      coverageResult.coverage.branches >= testConfig.coverageThreshold.global.branches ? 'green' : 'red');
    log(`  Functions: ${coverageResult.coverage.functions}%`, 
      coverageResult.coverage.functions >= testConfig.coverageThreshold.global.functions ? 'green' : 'red');
    log(`  Lines: ${coverageResult.coverage.lines}%`, 
      coverageResult.coverage.lines >= testConfig.coverageThreshold.global.lines ? 'green' : 'red');
  }
  
  // Failed tests details
  const failedFiles = testResults.filter(result => !result.success);
  if (failedFiles.length > 0) {
    log(`\nFailed Test Files:`, 'red');
    failedFiles.forEach(result => {
      log(`  - ${result.file}: ${result.failed} failed tests`, 'red');
      if (result.error) {
        log(`    Error: ${result.error}`, 'red');
      }
    });
  }
  
  // Success message
  if (totalFailed === 0 && successfulFiles === testResults.length) {
    log(`\n🎉 All tests passed successfully!`, 'green');
    
    if (coverageResult.meetsThreshold) {
      log(`🎯 Coverage threshold met!`, 'green');
    }
  } else {
    log(`\n❌ Some tests failed. Please review and fix the issues.`, 'red');
  }
  
  return {
    totalTests,
    totalPassed,
    totalFailed,
    successfulFiles,
    totalFiles: testResults.length,
    allPassed: totalFailed === 0 && successfulFiles === testResults.length,
    coverageMet: coverageResult.meetsThreshold
  };
};

// Save report to file
const saveReport = (report, testResults, coverageResult) => {
  const reportData = {
    timestamp: new Date().toISOString(),
    summary: report,
    testResults,
    coverage: coverageResult,
    config: testConfig
  };
  
  const reportPath = path.join(__dirname, 'test-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
  
  logInfo(`Report saved to: ${reportPath}`);
};

// Main execution
const main = () => {
  logHeader('RandomlyRead Test Suite Runner');
  
  // Check prerequisites
  if (!checkTestFiles()) {
    logError('Cannot proceed: Missing test files');
    process.exit(1);
  }
  
  // Run tests
  const testResults = runAllTests();
  
  // Run coverage
  const coverageResult = runCoverage();
  
  // Generate report
  const report = generateReport(testResults, coverageResult);
  
  // Save report
  saveReport(report, testResults, coverageResult);
  
  // Exit with appropriate code
  if (report.allPassed) {
    logSuccess('\nTest suite completed successfully!');
    process.exit(0);
  } else {
    logError('\nTest suite completed with failures!');
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  runAllTests,
  runCoverage,
  generateReport,
  testConfig
};