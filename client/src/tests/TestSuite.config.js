/**
 * Comprehensive Test Suite Configuration
 * Based on the updated system architecture with modern React patterns
 */

module.exports = {
  // Test Environment Configuration
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.js',
    '<rootDir>/src/tests/testSetup.js'
  ],

  // Module Path Mapping
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@contexts/(.*)$': '<rootDir>/src/contexts/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@tests/(.*)$': '<rootDir>/src/tests/$1'
  },

  // Test File Patterns
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}',
    '<rootDir>/src/tests/**/*.{test,spec}.{js,jsx,ts,tsx}'
  ],

  // Coverage Configuration
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.js',
    '!src/serviceWorker.js',
    '!src/setupTests.js',
    '!src/tests/testSetup.js',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/*.config.{js,jsx,ts,tsx}'
  ],

  // Coverage Thresholds
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85
    },
    // Specific thresholds for critical components
    'src/hooks/**/*.{js,jsx,ts,tsx}': {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95
    },
    'src/contexts/**/*.{js,jsx,ts,tsx}': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    },
    'src/components/RRLayout/Timer*.{js,jsx,ts,tsx}': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },

  // Transform Configuration
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '^.+\\.css$': 'jest-transform-css',
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': 'jest-transform-file'
  },

  // Module File Extensions
  moduleFileExtensions: [
    'js',
    'jsx',
    'ts',
    'tsx',
    'json',
    'node'
  ],

  // Test Suites Configuration
  projects: [
    {
      displayName: 'Unit Tests',
      testMatch: [
        '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
        '<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}'
      ],
      testPathIgnorePatterns: [
        '/node_modules/',
        '/build/',
        '\\.integration\\.',
        '\\.e2e\\.',
        '\\.performance\\.',
        '\\.accessibility\\.'
      ]
    },
    {
      displayName: 'Integration Tests',
      testMatch: [
        '<rootDir>/src/tests/*integration*.{js,jsx,ts,tsx}',
        '<rootDir>/src/**/*integration*.{test,spec}.{js,jsx,ts,tsx}'
      ]
    },
    {
      displayName: 'Performance Tests',
      testMatch: [
        '<rootDir>/src/tests/*Performance*.{js,jsx,ts,tsx}',
        '<rootDir>/src/**/*performance*.{test,spec}.{js,jsx,ts,tsx}'
      ],
      testTimeout: 30000 // Longer timeout for performance tests
    },
    {
      displayName: 'Accessibility Tests',
      testMatch: [
        '<rootDir>/src/tests/*Accessibility*.{js,jsx,ts,tsx}',
        '<rootDir>/src/**/*accessibility*.{test,spec}.{js,jsx,ts,tsx}'
      ],
      setupFilesAfterEnv: [
        '<rootDir>/src/setupTests.js',
        '<rootDir>/src/tests/testSetup.js',
        'jest-axe/extend-expect'
      ]
    }
  ],

  // Test Categories
  testCategories: {
    unit: {
      description: 'Unit tests for individual components and functions',
      pattern: '**/*.{test,spec}.{js,jsx,ts,tsx}',
      exclude: ['*integration*', '*e2e*', '*performance*', '*accessibility*']
    },
    hooks: {
      description: 'Custom React hooks testing',
      pattern: 'src/hooks/**/__tests__/**/*.{js,jsx,ts,tsx}',
      coverage: {
        branches: 95,
        functions: 95,
        lines: 95,
        statements: 95
      }
    },
    contexts: {
      description: 'React Context providers and state management',
      pattern: 'src/contexts/**/__tests__/**/*.{js,jsx,ts,tsx}',
      coverage: {
        branches: 90,
        functions: 90,
        lines: 90,
        statements: 90
      }
    },
    components: {
      description: 'React component testing',
      pattern: 'src/components/**/__tests__/**/*.{js,jsx,ts,tsx}',
      coverage: {
        branches: 85,
        functions: 85,
        lines: 85,
        statements: 85
      }
    },
    integration: {
      description: 'Integration tests for component interactions',
      pattern: 'src/tests/*integration*.{js,jsx,ts,tsx}',
      timeout: 10000
    },
    performance: {
      description: 'Performance and memory usage tests',
      pattern: 'src/tests/*Performance*.{js,jsx,ts,tsx}',
      timeout: 30000
    },
    accessibility: {
      description: 'Accessibility and WCAG compliance tests',
      pattern: 'src/tests/*Accessibility*.{js,jsx,ts,tsx}',
      setup: ['jest-axe/extend-expect']
    },
    persistence: {
      description: 'Session persistence and localStorage tests',
      pattern: 'src/tests/*Persistence*.{js,jsx,ts,tsx}'
    }
  },

  // Test Scripts
  scripts: {
    'test': 'react-scripts test',
    'test:unit': 'react-scripts test --selectProjects="Unit Tests"',
    'test:hooks': 'react-scripts test src/hooks',
    'test:contexts': 'react-scripts test src/contexts',
    'test:components': 'react-scripts test src/components',
    'test:integration': 'react-scripts test --selectProjects="Integration Tests"',
    'test:performance': 'react-scripts test --selectProjects="Performance Tests"',
    'test:accessibility': 'react-scripts test --selectProjects="Accessibility Tests"',
    'test:persistence': 'react-scripts test SessionPersistence',
    'test:timer-system': 'react-scripts test TimerSystem',
    'test:coverage': 'react-scripts test --coverage --watchAll=false',
    'test:coverage-hooks': 'react-scripts test src/hooks --coverage --watchAll=false',
    'test:coverage-contexts': 'react-scripts test src/contexts --coverage --watchAll=false',
    'test:ci': 'react-scripts test --coverage --watchAll=false --ci',
    'test:debug': 'react-scripts --inspect-brk test --runInBand --no-cache'
  },

  // Performance Benchmarks
  performanceBudgets: {
    componentRender: 50, // ms
    hookExecution: 10, // ms
    contextUpdate: 25, // ms
    timerPrecision: 25, // ms
    sessionPersistence: 100, // ms
    memoryUsage: 50 * 1024 * 1024, // 50MB
    bundleSize: 2 * 1024 * 1024 // 2MB
  },

  // Accessibility Standards
  accessibilityStandards: {
    wcagLevel: 'AA',
    colorContrast: 4.5,
    focusManagement: true,
    keyboardNavigation: true,
    screenReaderSupport: true,
    ariaLabels: true,
    semanticHTML: true
  },

  // Mock Configuration
  mocks: {
    localStorage: true,
    sessionStorage: true,
    performance: true,
    timers: true,
    mediaQuery: true,
    intersectionObserver: true
  },

  // Test Data
  fixtures: {
    exerciseSession: {
      id: 'test-session-123',
      userId: 'test-user-456',
      routineId: 'test-routine-789',
      words: [
        {
          id: 'word-1',
          lexeme: 'test',
          phonetic: 'tɛst',
          consonants: ['T', 'S'],
          vowels: ['E'],
          syllables: 1,
          gradeLevel: '2',
          difficulty: 3
        }
      ]
    },
    routine: {
      id: 'test-routine-123',
      name: 'Test Routine',
      description: 'A routine for testing',
      age: '5',
      subroutine: [
        {
          id: 'step-1',
          type: 'word',
          duration: 3,
          repetitions: 2,
          mode: 'Word',
          vowels: ['A', 'E'],
          consonants: ['B', 'C'],
          syllables: [1, 2],
          position: 'initial',
          rangeVal: 3
        }
      ]
    }
  },

  // Reporting Configuration
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './coverage/html-report',
        filename: 'report.html',
        expand: true
      }
    ],
    [
      'jest-junit',
      {
        outputDirectory: './coverage',
        outputName: 'junit.xml'
      }
    ]
  ],

  // Watch Configuration
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],

  // Global Test Configuration
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  },

  // Test Environment Options
  testEnvironmentOptions: {
    url: 'http://localhost:3000'
  }
};