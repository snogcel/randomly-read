import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { UserService } from '../services/UserService';
import { asyncHandler, createValidationError } from '../middleware/errorHandler';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth';
import { logger } from '../utils/logger';

const router = Router();
const userService = UserService.getInstance();

/**
 * POST /api/auth/login
 * Authenticate user and return JWT token
 */
router.post('/login', [
  body('username')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Username must be between 3 and 50 characters'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
], asyncHandler(async (req: any, res: any) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw createValidationError('Validation failed', errors.array());
  }

  const { username, password } = req.body;

  try {
    const result = await userService.login({ username, password });
    
    logger.info(`User logged in: ${username}`);
    
    res.json({
      success: true,
      data: {
        user: result.user,
        token: result.token
      },
      message: 'Login successful'
    });
  } catch (error) {
    logger.warn(`Login failed for username: ${username}`);
    res.status(401).json({
      success: false,
      error: {
        code: 'LOGIN_FAILED',
        message: (error as Error).message
      }
    });
  }
}));

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post('/register', [
  body('username')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Username must be between 3 and 50 characters')
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('Username can only contain letters, numbers, underscores, and hyphens'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('firstName')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('First name must be less than 50 characters'),
  body('lastName')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Last name must be less than 50 characters'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Must be a valid email address')
], asyncHandler(async (req: any, res: any) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw createValidationError('Validation failed', errors.array());
  }

  const { username, password, firstName, lastName, email } = req.body;

  try {
    const user = await userService.createUser({
      username,
      password,
      firstName,
      lastName,
      email
    });

    // Log in the newly created user
    const loginResult = await userService.login({ username, password });
    
    logger.info(`User registered and logged in: ${username}`);
    
    res.status(201).json({
      success: true,
      data: {
        user: loginResult.user,
        token: loginResult.token
      },
      message: 'Registration successful'
    });
  } catch (error) {
    logger.warn(`Registration failed for username: ${username}`);
    res.status(400).json({
      success: false,
      error: {
        code: 'REGISTRATION_FAILED',
        message: (error as Error).message
      }
    });
  }
}));

/**
 * POST /api/auth/change-password
 * Change user password
 */
router.post('/change-password', requireAuth, [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters')
], asyncHandler(async (req: AuthenticatedRequest, res: any) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw createValidationError('Validation failed', errors.array());
  }

  const { currentPassword, newPassword } = req.body;

  try {
    await userService.changePassword(req.user.id, currentPassword, newPassword);
    
    logger.info(`Password changed for user: ${req.user.username}`);
    
    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    logger.warn(`Password change failed for user: ${req.user.username}`);
    res.status(400).json({
      success: false,
      error: {
        code: 'PASSWORD_CHANGE_FAILED',
        message: (error as Error).message
      }
    });
  }
}));

/**
 * POST /api/auth/verify
 * Verify JWT token and return user info
 */
router.post('/verify', asyncHandler(async (req: any, res: any) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'TOKEN_REQUIRED',
        message: 'Token is required'
      }
    });
  }

  try {
    const user = await userService.verifyToken(token);
    
    if (user) {
      res.json({
        success: true,
        data: { user },
        message: 'Token is valid'
      });
    } else {
      res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Token is invalid or expired'
        }
      });
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      error: {
        code: 'TOKEN_VERIFICATION_FAILED',
        message: 'Token verification failed'
      }
    });
  }
}));

/**
 * GET /api/auth/me
 * Get current user profile
 */
router.get('/me', requireAuth, asyncHandler(async (req: AuthenticatedRequest, res: any) => {
  res.json({
    success: true,
    data: { user: req.user },
    message: 'User profile retrieved successfully'
  });
}));

export { router as authRoutes };