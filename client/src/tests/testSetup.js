/**
 * Test Setup for Modern Timer System Architecture
 * Configures testing environment for hooks, contexts, and components
 */

import '@testing-library/jest-dom';
import 'jest-axe/extend-expect';

// Mock performance API for consistent testing
const mockPerformance = {
  now: jest.fn(() => Date.now()),
  mark: jest.fn(),
  measure: jest.fn(),
  getEntriesByName: jest.fn(() => []),
  getEntriesByType: jest.fn(() => []),
  clearMarks: jest.fn(),
  clearMeasures: jest.fn()
};

Object.defineProperty(window, 'performance', {
  value: mockPerformance,
  writable: true
});

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock matchMedia for responsive testing
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock localStorage with enhanced functionality
const localStorageMock = (() => {
  let store = {};

  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    key: jest.fn((index) => {
      const keys = Object.keys(store);
      return keys[index] || null;
    }),
    get length() {
      return Object.keys(store).length;
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock sessionStorage
Object.defineProperty(window, 'sessionStorage', {
  value: localStorageMock
});

// Mock console methods to reduce noise in tests
const originalConsole = global.console;
global.console = {
  ...originalConsole,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: originalConsole.error, // Keep error for debugging
};

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true
});

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn(cb => setTimeout(cb, 16));
global.cancelAnimationFrame = jest.fn(id => clearTimeout(id));

// Mock fetch for API testing
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
  })
);

// Enhanced timer mocks for precision testing
const originalSetTimeout = global.setTimeout;
const originalSetInterval = global.setInterval;
const originalClearTimeout = global.clearTimeout;
const originalClearInterval = global.clearInterval;

// Track active timers for memory leak detection
global.activeTimers = new Set();

global.setTimeout = jest.fn((callback, delay) => {
  const id = originalSetTimeout(callback, delay);
  global.activeTimers.add(id);
  return id;
});

global.setInterval = jest.fn((callback, delay) => {
  const id = originalSetInterval(callback, delay);
  global.activeTimers.add(id);
  return id;
});

global.clearTimeout = jest.fn((id) => {
  global.activeTimers.delete(id);
  return originalClearTimeout(id);
});

global.clearInterval = jest.fn((id) => {
  global.activeTimers.delete(id);
  return originalClearInterval(id);
});

// Test utilities for timer system
global.testUtils = {
  // Advance timers and trigger React updates
  advanceTimersAndUpdate: (ms) => {
    jest.advanceTimersByTime(ms);
    return new Promise(resolve => setTimeout(resolve, 0));
  },

  // Check for timer memory leaks
  checkTimerLeaks: () => {
    const leakCount = global.activeTimers.size;
    if (leakCount > 0) {
      console.warn(`Potential timer leak detected: ${leakCount} active timers`);
    }
    return leakCount;
  },

  // Clean up all timers
  cleanupTimers: () => {
    global.activeTimers.forEach(id => {
      clearTimeout(id);
      clearInterval(id);
    });
    global.activeTimers.clear();
  },

  // Mock high precision timing
  mockHighPrecisionTimer: (precision = 1) => {
    let time = 0;
    mockPerformance.now.mockImplementation(() => {
      time += precision;
      return time;
    });
    return () => {
      time = 0;
      mockPerformance.now.mockRestore();
    };
  },

  // Create mock exercise data
  createMockExerciseSession: (overrides = {}) => ({
    id: 'test-session-123',
    userId: 'test-user-456',
    routineId: 'test-routine-789',
    startTime: new Date(),
    currentWordIndex: 0,
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
    ],
    attempts: [],
    isActive: true,
    isPaused: false,
    settings: {
      duration: 3,
      autoAdvance: true,
      showPhonetics: false,
      fontSize: 'medium',
      mode: 'word',
      vowels: ['A', 'E'],
      consonants: ['B', 'C'],
      syllables: [1, 2],
      position: 'initial',
      gradeLevel: '2'
    },
    ...overrides
  }),

  // Create mock routine data
  createMockRoutine: (overrides = {}) => ({
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
    ],
    ...overrides
  }),

  // Create mock word attempt
  createMockWordAttempt: (overrides = {}) => ({
    wordId: 'word-1',
    lexeme: 'test',
    timestamp: new Date(),
    accuracy: 0.85,
    timeSpent: 3000,
    difficulty: 3,
    exerciseType: 'word',
    position: 'initial',
    phonetics: {
      vowels: ['E'],
      consonants: ['T', 'S'],
      syllables: 1
    },
    ...overrides
  })
};

// Performance testing utilities
global.performanceUtils = {
  // Measure component render time
  measureRenderTime: async (renderFn) => {
    const start = performance.now();
    await renderFn();
    const end = performance.now();
    return end - start;
  },

  // Measure hook execution time
  measureHookTime: (hookFn) => {
    const start = performance.now();
    const result = hookFn();
    const end = performance.now();
    return { result, time: end - start };
  },

  // Memory usage estimation
  estimateMemoryUsage: () => {
    if (performance.memory) {
      return {
        used: performance.memory.usedJSHeapSize,
        total: performance.memory.totalJSHeapSize,
        limit: performance.memory.jsHeapSizeLimit
      };
    }
    return null;
  }
};

// Accessibility testing utilities
global.a11yUtils = {
  // Check for ARIA attributes
  checkAriaAttributes: (element) => {
    const ariaAttributes = {};
    Array.from(element.attributes).forEach(attr => {
      if (attr.name.startsWith('aria-')) {
        ariaAttributes[attr.name] = attr.value;
      }
    });
    return ariaAttributes;
  },

  // Check for keyboard accessibility
  checkKeyboardAccessibility: (element) => {
    return {
      focusable: element.tabIndex >= 0,
      hasKeyHandlers: !!(
        element.onkeydown || 
        element.onkeyup || 
        element.onkeypress
      ),
      role: element.getAttribute('role'),
      ariaLabel: element.getAttribute('aria-label')
    };
  }
};

// Setup and teardown helpers
beforeEach(() => {
  // Clear all mocks
  jest.clearAllMocks();
  
  // Clear localStorage
  localStorage.clear();
  
  // Clear active timers
  global.testUtils.cleanupTimers();
  
  // Reset performance mock
  mockPerformance.now.mockClear();
  
  // Reset console mocks
  global.console.log.mockClear();
  global.console.debug.mockClear();
  global.console.info.mockClear();
  global.console.warn.mockClear();
});

afterEach(() => {
  // Check for timer leaks
  const leakCount = global.testUtils.checkTimerLeaks();
  if (leakCount > 0) {
    global.testUtils.cleanupTimers();
  }
  
  // Clean up any remaining timers
  jest.clearAllTimers();
});

// Global error handler for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Suppress specific warnings in tests
const originalError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (
      args[0].includes('Warning: ReactDOM.render is deprecated') ||
      args[0].includes('Warning: componentWillReceiveProps') ||
      args[0].includes('Warning: componentWillMount')
    )
  ) {
    return;
  }
  originalError.call(console, ...args);
};

// Export test configuration
export const testConfig = {
  performanceBudgets: {
    componentRender: 50, // ms
    hookExecution: 10, // ms
    contextUpdate: 25, // ms
    timerPrecision: 25, // ms
    sessionPersistence: 100 // ms
  },
  
  accessibilityStandards: {
    wcagLevel: 'AA',
    colorContrast: 4.5,
    focusManagement: true,
    keyboardNavigation: true,
    screenReaderSupport: true
  },
  
  memoryLimits: {
    maxHeapSize: 50 * 1024 * 1024, // 50MB
    maxTimers: 10,
    maxEventListeners: 100
  }
};