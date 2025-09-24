// React Router v6 manages history internally
// This file is kept for backward compatibility but should be gradually phased out
// Use useNavigate hook instead for programmatic navigation

import store from '../store';
import { hideErrorClearTimeout } from '../actions/error';

// Create a simple history-like object for backward compatibility
const history = {
  push: (path) => {
    console.warn('history.push is deprecated. Use useNavigate hook instead.');
    // This will be handled by components using useNavigate
  },
  replace: (path) => {
    console.warn('history.replace is deprecated. Use useNavigate hook instead.');
    // This will be handled by components using useNavigate
  },
  listen: (callback) => {
    console.warn('history.listen is deprecated. Use useLocation hook instead.');
    // For error handling, we'll need to implement this differently
    return () => {}; // Return unsubscribe function
  }
};

// For error handling, we'll need to implement this at the component level
// using useLocation and useEffect

export default history;
