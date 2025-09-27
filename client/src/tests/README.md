# Timer System Test Suite

Comprehensive testing suite for the refactored timer system architecture with modern React patterns.

## Architecture Overview

The test suite covers the complete timer system refactoring:

### 🎯 **Custom Hooks Testing**
- `useExerciseTimer`: High-precision timing with 25ms accuracy
- `useRoutineExecution`: Routine flow management and progression
- `useProgressTracking`: Exercise analytics and session tracking
- `useTimerCleanup`: Memory management and cleanup utilities

### 🔄 **React Context Testing**
- `ExerciseContext`: Exercise session state management
- `RoutineContext`: Routine configuration and builder state
- Cross-context communication and synchronization
- State persistence and recovery

### 🧩 **Component Architecture Testing**
- `TimerControls`: Play/pause/skip functionality
- `TimerDisplay`: Time visualization and progress indication
- `ExerciseProgress`: Routine and step progress tracking
- `TimerRefactored`: Main integrated timer component

### 🔗 **Integration Testing**
- Hook-to-hook communication
- Context-to-component integration
- Timer precision and accuracy validation
- Memory leak detection and cleanup

### ⚡ **Performance Testing**
- Component render performance (< 50ms budget)
- Hook execution efficiency (< 10ms budget)
- Memory usage monitoring
- Concurrent operation handling

### ♿ **Accessibility Testing**
- WCAG 2.1 AA compliance
- Screen reader compatibility
- Keyboard navigation support
- Color contrast validation

## Test Categories

### Unit Tests
```bash
npm run test:unit
```
Individual component and hook testing with isolated functionality validation.

### Integration Tests
```bash
npm run test:integration
```
Cross-component communication and hook integration scenarios.

### Performance Tests
```bash
npm run test:performance
```
Performance benchmarks, memory usage, and timing accuracy validation.

### Accessibility Tests
```bash
npm run test:accessibility
```
WCAG compliance, keyboard navigation, and screen reader support.

### Hook Tests
```bash
npm run test:hooks
```
Comprehensive custom hook testing with timing validation.

### Context Tests
```bash
npm run test:contexts
```
React Context state management and provider testing.

### Persistence Tests
```bash
npm run test:persistence
```
Session persistence, localStorage integration, and data recovery.

## Quick Start

### Run All Timer System Tests
```bash
node src/tests/runTimerSystemTests.js
```

### Run Specific Test Categories
```bash
# Custom hooks only
npm run test:hooks

# React contexts only
npm run test:contexts

# Timer components only
npm test src/components/RRLayout

# Integration tests only
npm run test:integration

# Performance tests only
npm run test:performance

# Accessibility tests only
npm run test:accessibility
```

### Generate Coverage Report
```bash
npm run test:coverage
```

### Debug Mode
```bash
npm run test:debug
```

## Test Files Structure

```
src/tests/
├── __tests__/                          # Unit tests
│   ├── useExerciseTimer.test.ts        # Timer hook tests
│   ├── useRoutineExecution.test.ts     # Routine execution tests
│   ├── useProgressTracking.test.ts     # Progress tracking tests
│   ├── TimerControls.test.tsx          # Timer controls component
│   ├── TimerDisplay.test.tsx           # Timer display component
│   └── ExerciseContext.test.tsx        # Exercise context tests
├── TimerSystem.integration.test.tsx    # Integration tests
├── ContextIntegration.test.tsx         # Context integration
├── HookIntegration.test.ts             # Hook integration
├── Performance.test.tsx                # Performance benchmarks
├── Accessibility.test.tsx              # Accessibility compliance
├── SessionPersistence.test.ts          # Persistence testing
├── TestSuite.config.js                 # Test configuration
├── testSetup.js                        # Test environment setup
├── runTimerSystemTests.js              # Test runner script
└── README.md                           # This file
```

## Performance Benchmarks

### Component Rendering
- **Target**: < 50ms initial render
- **Timer Updates**: < 20ms per update
- **Re-renders**: < 200ms for 50 rapid updates

### Hook Execution
- **useExerciseTimer**: < 10ms per operation
- **useRoutineExecution**: < 25ms for routine loading
- **useProgressTracking**: < 100ms for 1000 attempts

### Memory Management
- **Timer Cleanup**: 0 active timers after unmount
- **Memory Usage**: < 50MB for typical session
- **Leak Detection**: Automatic timer leak detection

### Timing Accuracy
- **Precision**: 25ms timer intervals
- **Accuracy**: ±5ms timing variance
- **Pause/Resume**: Maintains timing accuracy

## Accessibility Standards

### WCAG 2.1 AA Compliance
- ✅ Color contrast ratio ≥ 4.5:1
- ✅ Keyboard navigation support
- ✅ Screen reader compatibility
- ✅ Focus management
- ✅ ARIA labels and roles

### Keyboard Navigation
- **Tab Order**: Logical focus progression
- **Enter/Space**: Activate controls
- **Arrow Keys**: Navigate progress indicators
- **Escape**: Cancel operations

### Screen Reader Support
- **Live Regions**: Timer status announcements
- **Progress Updates**: Exercise progression
- **State Changes**: Play/pause notifications
- **Error Messages**: Accessible error reporting

## Test Configuration

### Coverage Thresholds
```javascript
{
  global: { branches: 85, functions: 85, lines: 85, statements: 85 },
  hooks: { branches: 95, functions: 95, lines: 95, statements: 95 },
  contexts: { branches: 90, functions: 90, lines: 90, statements: 90 }
}
```

### Performance Budgets
```javascript
{
  componentRender: 50,    // ms
  hookExecution: 10,      // ms
  contextUpdate: 25,      // ms
  timerPrecision: 25,     // ms
  sessionPersistence: 100 // ms
}
```

## Mock Configuration

### Timer Mocks
- High-precision timing simulation
- Memory leak detection
- Cleanup verification

### Storage Mocks
- localStorage simulation
- Session persistence testing
- Error condition handling

### Performance Mocks
- Consistent timing measurements
- Memory usage tracking
- Frame rate simulation

## Debugging Tests

### Common Issues

#### Timer Tests Failing
```bash
# Check for timer leaks
npm test -- --testNamePattern="memory"

# Verify timing accuracy
npm test -- --testNamePattern="precision"
```

#### Context Tests Failing
```bash
# Check provider setup
npm test -- --testNamePattern="context"

# Verify state synchronization
npm test -- --testNamePattern="integration"
```

#### Performance Tests Failing
```bash
# Run with extended timeout
npm test -- --testTimeout=30000 --testNamePattern="performance"
```

### Debug Mode
```bash
# Run with debugger
npm run test:debug

# Run specific test with verbose output
npm test -- --testNamePattern="useExerciseTimer" --verbose
```

## Continuous Integration

### GitHub Actions
```yaml
- name: Run Timer System Tests
  run: |
    cd client
    npm ci
    node src/tests/runTimerSystemTests.js
    npm run test:coverage
```

### Test Reports
- **HTML Report**: `coverage/html-report/report.html`
- **JSON Report**: `src/tests/timer-system-test-report.json`
- **JUnit XML**: `coverage/junit.xml`

## Contributing

### Adding New Tests

1. **Hook Tests**: Add to `src/hooks/__tests__/`
2. **Component Tests**: Add to `src/components/**/__tests__/`
3. **Integration Tests**: Add to `src/tests/`
4. **Performance Tests**: Include performance benchmarks
5. **Accessibility Tests**: Ensure WCAG compliance

### Test Naming Convention
```
ComponentName.test.tsx        # Component tests
hookName.test.ts             # Hook tests
FeatureName.integration.test.tsx  # Integration tests
FeatureName.performance.test.tsx  # Performance tests
FeatureName.accessibility.test.tsx # Accessibility tests
```

### Best Practices

1. **Isolation**: Each test should be independent
2. **Cleanup**: Always clean up timers and event listeners
3. **Mocking**: Mock external dependencies appropriately
4. **Performance**: Include performance assertions
5. **Accessibility**: Test with screen readers and keyboard navigation

## Troubleshooting

### Common Test Failures

#### "Timer leak detected"
- Ensure all timers are cleaned up in `afterEach`
- Use `global.testUtils.cleanupTimers()`

#### "Component did not render within timeout"
- Check for missing providers
- Verify mock setup

#### "Performance budget exceeded"
- Profile component rendering
- Check for unnecessary re-renders

#### "Accessibility violation"
- Review ARIA attributes
- Check color contrast
- Verify keyboard navigation

### Getting Help

1. Check test output for specific error messages
2. Review the test setup in `testSetup.js`
3. Run tests in debug mode for detailed information
4. Check the generated test reports for insights

## Architecture Benefits

The refactored timer system provides:

### 🚀 **Performance**
- High-precision timing (25ms accuracy)
- Efficient memory management
- Optimized re-rendering

### 🧩 **Modularity**
- Reusable custom hooks
- Composable components
- Separation of concerns

### 🔒 **Reliability**
- Comprehensive error handling
- Memory leak prevention
- State recovery mechanisms

### ♿ **Accessibility**
- WCAG 2.1 AA compliance
- Screen reader support
- Keyboard navigation

### 🔧 **Maintainability**
- TypeScript type safety
- Comprehensive test coverage
- Clear component boundaries

This test suite ensures the timer system maintains these benefits while providing a robust foundation for speech therapy exercises.