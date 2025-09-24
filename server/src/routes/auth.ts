import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { UserService } from '../services/UserService';
import { asyncHandler, createValidationError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

const router = Router();
const userService = UserService.getInstance();

/**
 * POST /api/auth/login
 * Authenticate user (no JWT token returned)
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
        user: result.user
      },
      message: 'Login successful'
    });
  } catch (error) {
    logger.warn(`Login failed for username: ${username}`);
    res.status(401).json({
      success: false,
      error: {
        code: 'LOGIN_FAILED',
        message: `Login failed: ${(error as Error).message}`
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

    logger.info(`User registered: ${username}`);
    
    res.status(201).json({
      success: true,
      data: {
        user
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

export { router as authRoutes };