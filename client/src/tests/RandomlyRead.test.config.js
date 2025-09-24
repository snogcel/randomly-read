// Test configuration for RandomlyRead components
import '@testing-library/jest-dom';

// Mock implementations for testing
export const mockImplementations = {
  // Mock window.scrollTo
  scrollTo: jest.fn(),
  
  // Mock Google Analytics
  gtag: jest.fn(),
  
  // Mock React GA
  ReactGA: {
    initialize: jest.fn(),
    send: jest.fn()
  },
  
  // Mock localStorage
  localStorage: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
  },
  
  // Mock sessionStorage
  sessionStorage: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
  }
};

// Setup function to be called before each test
export const setupTest = () => {
  // Apply mocks
  Object.keys(mockImplementations).forEach(key => {
    if (key === 'scrollTo') {
      window.scrollTo = mockImplementations[key];
    } else if (key === 'gtag') {
      window.gtag = mockImplementations[key];
    } else {
      window[key] = mockImplementations[key];
    }
  });
  
  // Mock timers if needed
  jest.useFakeTimers();
  
  // Mock fetch for API calls
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    })
  );
  
  // Mock IntersectionObserver
  global.IntersectionObserver = jest.fn(() => ({
    observe: jest.fn(),
    disconnect: jest.fn(),
    unobserve: jest.fn(),
  }));
  
  // Mock ResizeObserver
  global.ResizeObserver = jest.fn(() => ({
    observe: jest.fn(),
    disconnect: jest.fn(),
    unobserve: jest.fn(),
  }));
};

// Cleanup function to be called after each test
export const cleanupTest = () => {
  jest.clearAllMocks();
  jest.useRealTimers();
  
  // Reset fetch mock
  if (global.fetch && global.fetch.mockClear) {
    global.fetch.mockClear();
  }
};

// Common test data
export const testData = {
  identities: [
    {
      alias: "Beginner",
      navigation: true,
      pathname: ["/therapy/beginner/introduction", "/therapy/beginner/techniques", "/therapy/beginner/practice"],
      token: "test-beginner-token",
      user: {
        routines: [],
        interactionSettings: [],
        clients: [],
        username: "testuser001",
        firstName: "Test",
        lastName: "User001",
        isActive: true,
        id: "test-user-001"
      }
    },
    {
      alias: "Intermediate",
      navigation: true,
      pathname: ["/therapy/intermediate/introduction", "/therapy/intermediate/techniques", "/therapy/intermediate/practice"],
      token: "test-intermediate-token",
      user: {
        routines: [],
        interactionSettings: [],
        clients: [],
        username: "testuser002",
        firstName: "Test",
        lastName: "User002",
        isActive: true,
        id: "test-user-002"
      }
    },
    {
      alias: "Advanced",
      navigation: true,
      pathname: ["/therapy/advanced/introduction", "/therapy/advanced/techniques", "/therapy/advanced/practice"],
      token: "test-advanced-token",
      user: {
        routines: [],
        interactionSettings: [],
        clients: [],
        username: "testuser003",
        firstName: "Test",
        lastName: "User003",
        isActive: true,
        id: "test-user-003"
      }
    }
  ],
  
  routines: [
    {
      id: '1',
      name: 'Beginner Routine',
      description: 'Basic phonation exercises for beginners',
      steps: [
        {
          id: '1',
          mode: 'Word',
          vowel: ['a', 'e', 'i'],
          consonant: ['p', 't', 'k'],
          syllables: [1, 2],
          position: ['initial'],
          age: ['adult'],
          limit: 1,
          rangeVal: 30,
          repetitions: 5
        }
      ]
    },
    {
      id: '2',
      name: 'Intermediate Routine',
      description: 'Transfer exercises for intermediate level',
      steps: [
        {
          id: '2',
          mode: 'Sentence',
          vowel: ['a', 'e', 'i', 'o', 'u'],
          consonant: ['p', 't', 'k', 'b', 'd', 'g'],
          syllables: [2, 3],
          position: ['initial', 'medial'],
          age: ['adult'],
          limit: 1,
          rangeVal: 45,
          repetitions: 3
        }
      ]
    },
    {
      id: '3',
      name: 'Advanced Routine',
      description: 'Natural speech exercises for advanced level',
      steps: [
        {
          id: '3',
          mode: 'Word',
          vowel: ['a', 'e', 'i', 'o', 'u'],
          consonant: ['p', 't', 'k', 'b', 'd', 'g', 'f', 's', 'h'],
          syllables: [3, 4, 5],
          position: ['initial', 'medial', 'final'],
          age: ['adult'],
          limit: 1,
          rangeVal: 60,
          repetitions: 2
        }
      ]
    }
  ],
  
  words: [
    {
      id: '1',
      wordid: 'word1',
      lexeme: 'apple',
      score: 5,
      votes: []
    },
    {
      id: '2',
      wordid: 'word2',
      lexeme: 'elephant',
      score: 4,
      votes: []
    },
    {
      id: '3',
      wordid: 'word3',
      lexeme: 'important',
      score: 3,
      votes: []
    }
  ],
  
  sentences: [
    {
      words: [
        { id: '1', wordid: 'word1', lexeme: 'The', score: 5, votes: [] },
        { id: '2', wordid: 'word2', lexeme: 'apple', score: 4, votes: [] },
        { id: '3', wordid: 'word3', lexeme: 'is', score: 3, votes: [] },
        { id: '4', wordid: 'word4', lexeme: 'red', score: 2, votes: [] }
      ]
    },
    {
      words: [
        { id: '5', wordid: 'word5', lexeme: 'An', score: 5, votes: [] },
        { id: '6', wordid: 'word6', lexeme: 'elephant', score: 4, votes: [] },
        { id: '7', wordid: 'word7', lexeme: 'is', score: 3, votes: [] },
        { id: '8', wordid: 'word8', lexeme: 'large', score: 2, votes: [] }
      ]
    }
  ]
};

// Helper functions for tests
export const testHelpers = {
  // Create a mock store state
  createMockState: (overrides = {}) => ({
    auth: {
      user: null,
      token: null,
      isFetching: false,
      error: null
    },
    routineSelect: {
      id: 0,
      routines: testData.routines,
      isFetching: false
    },
    exerciseHistory: {
      inProgress: false,
      isCompleted: false,
      time: 0,
      timeLeft: 0,
      queryResults: [],
      currentExercise: [],
      currentExerciseNumber: null
    },
    word: {
      text: null,
      isFetching: false
    },
    modeSelect: {
      mode: 0,
      auto: false
    },
    error: null,
    ...overrides
  }),
  
  // Wait for element with timeout
  waitForElement: async (getElement, timeout = 5000) => {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      try {
        const element = getElement();
        if (element) return element;
      } catch (error) {
        // Element not found, continue waiting
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    throw new Error(`Element not found within ${timeout}ms`);
  },
  
  // Simulate user typing
  simulateTyping: async (element, text, delay = 50) => {
    for (const char of text) {
      element.value += char;
      element.dispatchEvent(new Event('input', { bubbles: true }));
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  },
  
  // Check if element is visible
  isElementVisible: (element) => {
    const style = window.getComputedStyle(element);
    return style.display !== 'none' && 
           style.visibility !== 'hidden' && 
           style.opacity !== '0';
  }
};

// Custom matchers for testing
export const customMatchers = {
  // Check if element has correct ARIA attributes
  toHaveCorrectAriaAttributes: (element, expectedAttributes) => {
    const missingAttributes = [];
    
    Object.keys(expectedAttributes).forEach(attr => {
      const actualValue = element.getAttribute(attr);
      const expectedValue = expectedAttributes[attr];
      
      if (actualValue !== expectedValue) {
        missingAttributes.push(`${attr}: expected "${expectedValue}", got "${actualValue}"`);
      }
    });
    
    return {
      pass: missingAttributes.length === 0,
      message: () => `Element missing correct ARIA attributes: ${missingAttributes.join(', ')}`
    };
  },
  
  // Check if element is keyboard accessible
  toBeKeyboardAccessible: (element) => {
    const tabIndex = element.getAttribute('tabindex');
    const role = element.getAttribute('role');
    const isInteractive = ['button', 'link', 'input', 'select', 'textarea'].includes(element.tagName.toLowerCase());
    const hasInteractiveRole = ['button', 'link', 'tab', 'menuitem'].includes(role);
    
    const isAccessible = (tabIndex !== '-1') && (isInteractive || hasInteractiveRole);
    
    return {
      pass: isAccessible,
      message: () => `Element is not keyboard accessible. TabIndex: ${tabIndex}, Role: ${role}, Tag: ${element.tagName}`
    };
  }
};

// Export everything
export default {
  mockImplementations,
  setupTest,
  cleanupTest,
  testData,
  testHelpers,
  customMatchers
};