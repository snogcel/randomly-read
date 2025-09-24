# RandomlyRead Test Suite Documentation

This document provides comprehensive documentation for the RandomlyRead component test suite, covering all therapy routes and functionality.

## Overview

The RandomlyRead test suite provides complete coverage for the speech therapy application routes and components, including:

- **9 therapy routes** across 3 difficulty levels (Beginner, Intermediate, Advanced)
- **3 main sections** per level (Introduction, Techniques, Practice)
- **End-to-end user workflows**
- **Component integration testing**
- **Accessibility compliance**
- **Error handling and edge cases**

## Test Routes Covered

### Beginner Level Routes
- `http://localhost:3000/therapy/beginner/introduction`
- `http://localhost:3000/therapy/beginner/techniques`
- `http://localhost:3000/therapy/beginner/practice`

### Intermediate Level Routes
- `http://localhost:3000/therapy/intermediate/introduction`
- `http://localhost:3000/therapy/intermediate/techniques`
- `http://localhost:3000/therapy/intermediate/practice`

### Advanced Level Routes
- `http://localhost:3000/therapy/advanced/introduction`
- `http://localhost:3000/therapy/advanced/techniques`
- `http://localhost:3000/therapy/advanced/practice`

## Test Files Structure

### 1. `RandomlyRead.routes.test.js`
**Purpose**: Tests routing configuration and navigation between therapy routes

**Coverage**:
- Route configuration validation
- URL-to-component mapping
- Tab navigation synchronization
- Authentication context per route
- Error handling for invalid routes
- Responsive behavior across devices

**Key Test Cases**:
- ✅ Route mappings in Identities configuration
- ✅ Valid tokens and user objects for each route
- ✅ Beginner/Intermediate/Advanced route rendering
- ✅ Tab switching functionality
- ✅ URL synchronization with tab state
- ✅ Authentication context switching
- ✅ Invalid route handling
- ✅ Mobile/desktop responsive layouts

### 2. `RandomlyRead.components.test.js`
**Purpose**: Tests individual components and their interactions

**Coverage**:
- Introduction components for all levels
- Techniques components with expandable content
- Home component with different contexts
- Tab switching and content display
- Component accessibility features
- Performance optimization

**Key Test Cases**:
- ✅ Exercise1/2/3 Introduction component rendering
- ✅ Exercise1/2/3 Techniques component functionality
- ✅ Home component with beginner/intermediate/advanced contexts
- ✅ Level-specific content highlighting
- ✅ Tab navigation and content switching
- ✅ Navigation shortcuts between levels
- ✅ ARIA attributes and accessibility compliance
- ✅ Keyboard navigation support
- ✅ Performance benchmarks

### 3. `RandomlyRead.practice.test.js`
**Purpose**: Tests practice functionality including timers, word cards, and routines

**Coverage**:
- Practice tab functionality
- WordCard component with GraphQL integration
- Timer component controls
- Routine selection and execution
- Practice session workflows
- Progress tracking and results

**Key Test Cases**:
- ✅ Practice interface display
- ✅ Routine selection when no routine is active
- ✅ Practice content when routine is selected
- ✅ WordCard rendering and word fetching
- ✅ Sentence mode functionality
- ✅ Intermission mode handling
- ✅ Loading and error states
- ✅ Timer start/stop/reset functionality
- ✅ Timer countdown and completion
- ✅ Routine selection and description display
- ✅ Complete practice session flow
- ✅ Session interruption and resume
- ✅ Progress tracking and result saving

### 4. `RandomlyRead.e2e.test.js`
**Purpose**: End-to-end integration tests simulating real user interactions

**Coverage**:
- Complete user journeys for all levels
- Cross-level navigation
- Practice session workflows
- Accessibility and user experience
- Error handling and edge cases
- Performance under load

**Key Test Cases**:
- ✅ Complete beginner therapy session
- ✅ Complete intermediate therapy session  
- ✅ Complete advanced therapy session
- ✅ Navigation between all routes
- ✅ Tab state synchronization with URLs
- ✅ Cross-level navigation and state management
- ✅ Full practice session with timer
- ✅ Routine selection and execution
- ✅ Keyboard navigation accessibility
- ✅ ARIA attributes and screen reader support
- ✅ Network error handling
- ✅ Invalid route handling
- ✅ Missing authentication handling
- ✅ Rapid navigation changes

## Test Configuration

### Setup (`RandomlyRead.test.config.js`)
- Mock implementations for browser APIs
- Test data for identities, routines, words, and sentences
- Helper functions for common test operations
- Custom matchers for accessibility testing

### Test Runner (`runRandomlyReadTests.js`)
- Automated test execution for all RandomlyRead tests
- Coverage analysis and reporting
- Test result aggregation
- Performance metrics collection

## Running Tests

### Individual Test Suites
```bash
# Run all RandomlyRead tests
npm run test:randomly-read

# Run with coverage
npm run test:randomly-read-coverage

# Run comprehensive test suite with reporting
npm run test:routes
```

### Specific Test Files
```bash
# Route tests only
npm test -- --testPathPattern=RandomlyRead.routes.test.js

# Component tests only
npm test -- --testPathPattern=RandomlyRead.components.test.js

# Practice functionality tests
npm test -- --testPathPattern=RandomlyRead.practice.test.js

# End-to-end tests
npm test -- --testPathPattern=RandomlyRead.e2e.test.js
```

### Watch Mode for Development
```bash
# Watch all RandomlyRead tests
npm test -- --testPathPattern=RandomlyRead --watch

# Watch specific test file
npm test -- --testPathPattern=RandomlyRead.routes.test.js --watch
```

## Coverage Targets

The test suite aims for comprehensive coverage across all areas:

### Code Coverage Targets
- **Statements**: 80%+
- **Branches**: 80%+
- **Functions**: 80%+
- **Lines**: 80%+

### Functional Coverage
- ✅ All 9 therapy routes tested
- ✅ All 3 difficulty levels covered
- ✅ All 3 sections per level (Introduction, Techniques, Practice)
- ✅ Complete user workflows from start to finish
- ✅ Error scenarios and edge cases
- ✅ Accessibility compliance (WCAG 2.1 AA)
- ✅ Cross-browser compatibility considerations
- ✅ Mobile and desktop responsive behavior

## Test Data and Mocks

### Mock Data Includes
- **Identities**: 3 therapy levels with authentic tokens and user data
- **Routines**: Level-appropriate exercise routines with realistic parameters
- **Words**: Sample vocabulary for practice sessions
- **Sentences**: Multi-word combinations for advanced practice
- **GraphQL Responses**: Realistic API responses for all queries

### Mock Implementations
- **Apollo Client**: GraphQL query/mutation mocking
- **React Router**: Navigation and routing simulation
- **Redux Store**: State management testing
- **Browser APIs**: localStorage, sessionStorage, scrollTo, etc.
- **Timers**: Controlled timer functionality for practice sessions

## Accessibility Testing

### ARIA Compliance
- Tab navigation with proper ARIA attributes
- Screen reader announcements
- Keyboard accessibility
- Focus management
- Semantic HTML structure

### User Experience Testing
- Keyboard-only navigation
- Screen reader compatibility
- High contrast mode support
- Reduced motion preferences
- Touch/mobile interaction patterns

## Performance Testing

### Metrics Tracked
- Component render times
- Route transition performance
- Memory usage during long sessions
- GraphQL query response times
- Bundle size impact

### Performance Targets
- Initial route load: < 2 seconds
- Tab switching: < 500ms
- Component rendering: < 100ms
- Memory usage: Stable over extended sessions

## Error Scenarios Tested

### Network Issues
- GraphQL query failures
- Timeout handling
- Retry mechanisms
- Offline functionality

### User Input Edge Cases
- Rapid navigation changes
- Invalid route access
- Missing authentication
- Corrupted session state

### Browser Compatibility
- Different viewport sizes
- Touch vs. mouse interaction
- Keyboard navigation variations
- Browser-specific API differences

## Continuous Integration

### Automated Testing
- All tests run on every commit
- Coverage reports generated automatically
- Performance regression detection
- Accessibility audit integration

### Quality Gates
- All tests must pass before merge
- Coverage thresholds must be met
- No accessibility violations allowed
- Performance budgets enforced

## Maintenance and Updates

### Adding New Tests
1. Follow existing test file patterns
2. Use shared test configuration and helpers
3. Include accessibility and performance checks
4. Update documentation

### Updating Existing Tests
1. Maintain backward compatibility
2. Update mock data as needed
3. Preserve coverage levels
4. Test across all supported routes

### Test Data Management
1. Keep mock data realistic and current
2. Update tokens and user data as needed
3. Maintain consistency across test files
4. Document any test data dependencies

## Troubleshooting

### Common Issues
- **Mock data outdated**: Update test configuration
- **GraphQL schema changes**: Update mock responses
- **Route configuration changes**: Update Identities mock data
- **Component API changes**: Update component test props

### Debug Mode
```bash
# Run tests with detailed output
npm test -- --testPathPattern=RandomlyRead --verbose

# Run single test with debugging
npm test -- --testPathPattern=RandomlyRead.routes.test.js --verbose --no-cache
```

### Test Isolation
Each test file is designed to run independently with proper setup and teardown to avoid test interference.

## Contributing

When adding new features to RandomlyRead components:

1. **Add corresponding tests** for new functionality
2. **Update existing tests** if component APIs change
3. **Maintain coverage levels** above established thresholds
4. **Include accessibility tests** for new interactive elements
5. **Document test changes** in this file
6. **Run full test suite** before submitting changes

## Conclusion

This comprehensive test suite ensures the RandomlyRead therapy application provides a reliable, accessible, and performant experience across all supported routes and user workflows. The tests serve as both quality assurance and documentation for the expected behavior of the application.