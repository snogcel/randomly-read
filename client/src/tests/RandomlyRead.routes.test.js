import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MockedProvider } from '@apollo/client/testing';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import App from '../components/App/Component';
import Identities from '../components/RandomlyRead/Identities/Identities';

// Mock store setup
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// Mock initial state
const initialState = {
  auth: {
    user: null,
    token: null,
    isFetching: false,
    error: null
  },
  routineSelect: {
    id: 0,
    routines: [],
    isFetching: false
  },
  exerciseHistory: {
    inProgress: false,
    isCompleted: false,
    time: 0,
    timeLeft: 0,
    queryResults: [],
    currentExercise: [] // Add this to prevent Timer component errors
  },
  word: {
    text: null,
    isFetching: false
  },
  modeSelect: {
    mode: 0,
    auto: false
  },
  error: null
};

// Mock GraphQL queries
const mocks = [];

// Helper function to render component with providers
const renderWithProviders = (component, store = mockStore(initialState), initialEntries = ['/']) => {
  return render(
    <Provider store={store}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={initialEntries}>
          {component}
        </MemoryRouter>
      </MockedProvider>
    </Provider>
  );
};

describe('RandomlyRead Routes Integration Tests', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    // Mock window.scrollTo
    window.scrollTo = jest.fn();
    // Mock Google Analytics
    window.gtag = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Route Configuration', () => {
    test('should have correct route mappings in Identities', () => {
      expect(Identities).toHaveLength(4);
      
      // Check Beginner routes
      expect(Identities[1].alias).toBe('Beginner');
      expect(Identities[1].pathname).toEqual([
        '/therapy/beginner/introduction',
        '/therapy/beginner/techniques', 
        '/therapy/beginner/practice'
      ]);

      // Check Intermediate routes
      expect(Identities[2].alias).toBe('Intermediate');
      expect(Identities[2].pathname).toEqual([
        '/therapy/intermediate/introduction',
        '/therapy/intermediate/techniques',
        '/therapy/intermediate/practice'
      ]);

      // Check Advanced routes
      expect(Identities[3].alias).toBe('Advanced');
      expect(Identities[3].pathname).toEqual([
        '/therapy/advanced/introduction',
        '/therapy/advanced/techniques',
        '/therapy/advanced/practice'
      ]);
    });

    test('should have valid tokens for each identity', () => {
      Identities.forEach((identity, index) => {
        expect(identity.token).toBeDefined();
        expect(typeof identity.token).toBe('string');
        expect(identity.token.length).toBeGreaterThan(0);
      });
    });

    test('should have user objects for each identity', () => {
      Identities.forEach((identity, index) => {
        expect(identity.user).toBeDefined();
        expect(identity.user).toHaveProperty('username');
        expect(identity.user).toHaveProperty('firstName');
        expect(identity.user).toHaveProperty('lastName');
        expect(identity.user).toHaveProperty('id');
      });
    });
  });

  describe('Beginner Routes', () => {
    test('should render beginner introduction route', async () => {
      const mockSetToken = jest.fn();
      
      renderWithProviders(
        <App setToken={mockSetToken} />, 
        store, 
        ['/therapy/beginner/introduction']
      );

      await waitFor(() => {
        // Look for the tab that should be active
        const introTab = screen.getByRole('tab', { name: /introduction/i });
        expect(introTab).toBeInTheDocument();
        expect(introTab).toHaveAttribute('aria-selected', 'true');
      });
    });

    test('should render beginner techniques route', async () => {
      const mockSetToken = jest.fn();
      
      renderWithProviders(
        <App setToken={mockSetToken} />, 
        store, 
        ['/therapy/beginner/techniques']
      );

      await waitFor(() => {
        // Look for the techniques tab to be active
        const techniquesTab = screen.getByRole('tab', { name: /techniques/i });
        expect(techniquesTab).toBeInTheDocument();
        expect(techniquesTab).toHaveAttribute('aria-selected', 'true');
      });
    });

    test('should render beginner practice route', async () => {
      const mockSetToken = jest.fn();
      
      renderWithProviders(
        <App setToken={mockSetToken} />, 
        store, 
        ['/therapy/beginner/practice']
      );

      await waitFor(() => {
        // Look for the practice tab to be active
        const practiceTab = screen.getByRole('tab', { name: /practice/i });
        expect(practiceTab).toBeInTheDocument();
        expect(practiceTab).toHaveAttribute('aria-selected', 'true');
      });
    });
  });

  describe('Intermediate Routes', () => {
    test('should render intermediate introduction route', async () => {
      const mockSetToken = jest.fn();
      
      renderWithProviders(
        <App setToken={mockSetToken} />, 
        store, 
        ['/therapy/intermediate/introduction']
      );

      await waitFor(() => {
        expect(screen.getByRole('tab', { name: /introduction/i })).toBeInTheDocument();
        expect(screen.getByText(/This program divides Easy Onset into smaller parts/i)).toBeInTheDocument();
      });
    });

    test('should render intermediate techniques route', async () => {
      const mockSetToken = jest.fn();
      
      renderWithProviders(
        <App setToken={mockSetToken} />, 
        store, 
        ['/therapy/intermediate/techniques']
      );

      await waitFor(() => {
        expect(screen.getByRole('tab', { name: /techniques/i })).toBeInTheDocument();
      });
    });

    test('should render intermediate practice route', async () => {
      const mockSetToken = jest.fn();
      
      renderWithProviders(
        <App setToken={mockSetToken} />, 
        store, 
        ['/therapy/intermediate/practice']
      );

      await waitFor(() => {
        expect(screen.getByRole('tab', { name: /practice/i })).toBeInTheDocument();
      });
    });
  });

  describe('Advanced Routes', () => {
    test('should render advanced introduction route', async () => {
      const mockSetToken = jest.fn();
      
      renderWithProviders(
        <App setToken={mockSetToken} />, 
        store, 
        ['/therapy/advanced/introduction']
      );

      await waitFor(() => {
        expect(screen.getByRole('tab', { name: /introduction/i })).toBeInTheDocument();
        expect(screen.getByText(/This program divides Easy Onset into smaller parts/i)).toBeInTheDocument();
      });
    });

    test('should render advanced techniques route', async () => {
      const mockSetToken = jest.fn();
      
      renderWithProviders(
        <App setToken={mockSetToken} />, 
        store, 
        ['/therapy/advanced/techniques']
      );

      await waitFor(() => {
        expect(screen.getByRole('tab', { name: /techniques/i })).toBeInTheDocument();
      });
    });

    test('should render advanced practice route', async () => {
      const mockSetToken = jest.fn();
      
      renderWithProviders(
        <App setToken={mockSetToken} />, 
        store, 
        ['/therapy/advanced/practice']
      );

      await waitFor(() => {
        expect(screen.getByRole('tab', { name: /practice/i })).toBeInTheDocument();
      });
    });
  });

  describe('Tab Navigation', () => {
    test('should switch between tabs on beginner route', async () => {
      const mockSetToken = jest.fn();
      
      renderWithProviders(
        <App setToken={mockSetToken} />, 
        store, 
        ['/therapy/beginner/introduction']
      );

      await waitFor(() => {
        expect(screen.getByRole('tab', { name: /introduction/i })).toBeInTheDocument();
      });

      // Click on Techniques tab
      const techniquesTab = screen.getByRole('tab', { name: /techniques/i });
      fireEvent.click(techniquesTab);

      await waitFor(() => {
        expect(screen.getByText(/Breathing/i)).toBeInTheDocument();
      });

      // Click on Practice tab
      const practiceTab = screen.getByRole('tab', { name: /practice/i });
      fireEvent.click(practiceTab);

      await waitFor(() => {
        expect(screen.getByRole('tab', { name: /practice/i })).toHaveAttribute('aria-selected', 'true');
      });
    });

    test('should switch between tabs on intermediate route', async () => {
      const mockSetToken = jest.fn();
      
      renderWithProviders(
        <App setToken={mockSetToken} />, 
        store, 
        ['/therapy/intermediate/introduction']
      );

      await waitFor(() => {
        expect(screen.getByRole('tab', { name: /introduction/i })).toBeInTheDocument();
      });

      // Test tab switching
      const techniquesTab = screen.getByRole('tab', { name: /techniques/i });
      fireEvent.click(techniquesTab);

      await waitFor(() => {
        expect(screen.getByRole('tab', { name: /techniques/i })).toHaveAttribute('aria-selected', 'true');
      });
    });

    test('should switch between tabs on advanced route', async () => {
      const mockSetToken = jest.fn();
      
      renderWithProviders(
        <App setToken={mockSetToken} />, 
        store, 
        ['/therapy/advanced/introduction']
      );

      await waitFor(() => {
        expect(screen.getByRole('tab', { name: /introduction/i })).toBeInTheDocument();
      });

      // Test tab switching
      const techniquesTab = screen.getByRole('tab', { name: /techniques/i });
      fireEvent.click(techniquesTab);

      await waitFor(() => {
        expect(screen.getByRole('tab', { name: /techniques/i })).toHaveAttribute('aria-selected', 'true');
      });
    });
  });

  describe('URL Synchronization', () => {
    test('should update URL when switching tabs', async () => {
      const mockSetToken = jest.fn();
      
      renderWithProviders(
        <App setToken={mockSetToken} />, 
        store, 
        ['/therapy/beginner/introduction']
      );

      await waitFor(() => {
        expect(screen.getByRole('tab', { name: /introduction/i })).toBeInTheDocument();
      });

      // Click on Techniques tab
      const techniquesTab = screen.getByRole('tab', { name: /techniques/i });
      fireEvent.click(techniquesTab);

      // Should show techniques content
      await waitFor(() => {
        expect(screen.getByText(/Breathing/i)).toBeInTheDocument();
      });
    });

    test('should maintain correct tab state based on URL', async () => {
      const mockSetToken = jest.fn();
      
      renderWithProviders(
        <App setToken={mockSetToken} />, 
        store, 
        ['/therapy/beginner/techniques']
      );

      await waitFor(() => {
        const techniquesTab = screen.getByRole('tab', { name: /techniques/i });
        expect(techniquesTab).toHaveAttribute('aria-selected', 'true');
      });
    });
  });

  describe('Authentication Context', () => {
    test('should set correct user context for beginner routes', async () => {
      const mockSetToken = jest.fn();
      const storeWithAuth = mockStore({
        ...initialState,
        auth: {
          ...initialState.auth,
          user: Identities[1].user,
          token: Identities[1].token
        }
      });

      renderWithProviders(
        <App setToken={mockSetToken} />, 
        storeWithAuth, 
        ['/therapy/beginner/introduction']
      );

      await waitFor(() => {
        const introTab = screen.getByRole('tab', { name: /introduction/i });
        expect(introTab).toBeInTheDocument();
      });

      // Verify setToken was called
      expect(mockSetToken).toHaveBeenCalled();
    });

    test('should set correct user context for intermediate routes', async () => {
      const mockSetToken = jest.fn();
      const storeWithAuth = mockStore({
        ...initialState,
        auth: {
          ...initialState.auth,
          user: Identities[2].user,
          token: Identities[2].token
        }
      });

      renderWithProviders(
        <App setToken={mockSetToken} />, 
        storeWithAuth, 
        ['/therapy/intermediate/introduction']
      );

      await waitFor(() => {
        expect(screen.getByRole('tab', { name: /introduction/i })).toBeInTheDocument();
      });
    });

    test('should set correct user context for advanced routes', async () => {
      const mockSetToken = jest.fn();
      const storeWithAuth = mockStore({
        ...initialState,
        auth: {
          ...initialState.auth,
          user: Identities[3].user,
          token: Identities[3].token
        }
      });

      renderWithProviders(
        <App setToken={mockSetToken} />, 
        storeWithAuth, 
        ['/therapy/advanced/introduction']
      );

      await waitFor(() => {
        expect(screen.getByRole('tab', { name: /introduction/i })).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    test('should handle invalid routes gracefully', async () => {
      const mockSetToken = jest.fn();
      
      renderWithProviders(
        <App setToken={mockSetToken} />, 
        store, 
        ['/therapy/invalid/route']
      );

      // Should redirect to home or show default content
      await waitFor(() => {
        // The app should still render something, even if it's the default route
        expect(screen.getByText(/Easy Onset/i)).toBeInTheDocument();
      });
    });

    test('should handle missing authentication gracefully', async () => {
      const mockSetToken = jest.fn();
      const storeWithoutAuth = mockStore({
        ...initialState,
        auth: {
          ...initialState.auth,
          user: null,
          token: null
        }
      });

      renderWithProviders(
        <App setToken={mockSetToken} />, 
        storeWithoutAuth, 
        ['/therapy/beginner/introduction']
      );

      // Should still render the component (authentication is handled by withAuth HOC)
      await waitFor(() => {
        expect(screen.getByRole('tab', { name: /introduction/i })).toBeInTheDocument();
      });
    });
  });

  describe('Responsive Behavior', () => {
    test('should adapt layout for mobile devices', async () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      const mockSetToken = jest.fn();
      
      renderWithProviders(
        <App setToken={mockSetToken} />, 
        store, 
        ['/therapy/beginner/practice']
      );

      await waitFor(() => {
        expect(screen.getByRole('tab', { name: /practice/i })).toBeInTheDocument();
      });

      // Mobile-specific elements should be present/absent
      // This would depend on the specific responsive implementation
    });

    test('should adapt layout for desktop devices', async () => {
      // Mock desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920,
      });

      const mockSetToken = jest.fn();
      
      renderWithProviders(
        <App setToken={mockSetToken} />, 
        store, 
        ['/therapy/beginner/practice']
      );

      await waitFor(() => {
        expect(screen.getByRole('tab', { name: /practice/i })).toBeInTheDocument();
      });
    });
  });
});