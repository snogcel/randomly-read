import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';
import { logger } from '../utils/logger';

export interface AuthenticatedRequest extends Request {
  user?: any;
}

/**
 * Authentication middleware for REST endpoints
 */
export async function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      req.user = null;
      return next();
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const userService = UserService.getInstance();
    const user = await userService.verifyToken(token);

    if (user) {
      req.user = user;
      logger.debug(`Authenticated user: ${user.username}`);
    } else {
      req.user = null;
      logger.debug('Invalid or expired token');
    }

    next();
  } catch (error) {
    logger.error('Authentication middleware error:', error);
    req.user = null;
    next();
  }
}

/**
 * Require authentication middleware
 */
export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  if (!req.user) {
    res.status(401).json({ 
      error: 'Authentication required',
      code: 'UNAUTHORIZED'
    });
    return;
  }
  next();
}

/**
 * Require admin privileges middleware
 */
export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  if (!req.user) {
    res.status(401).json({ 
      error: 'Authentication required',
      code: 'UNAUTHORIZED'
    });
    return;
  }

  if (!req.user.admin && !req.user.superuser) {
    res.status(403).json({ 
      error: 'Admin privileges required',
      code: 'FORBIDDEN'
    });
    return;
  }

  next();
}

/**
 * Require superuser privileges middleware
 */
export function requireSuperuser(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  if (!req.user) {
    res.status(401).json({ 
      error: 'Authentication required',
      code: 'UNAUTHORIZED'
    });
    return;
  }

  if (!req.user.superuser) {
    res.status(403).json({ 
      error: 'Superuser privileges required',
      code: 'FORBIDDEN'
    });
    return;
  }

  next();
}

/**
 * Optional authentication middleware (doesn't fail if no token)
 */
export async function optionalAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const userService = UserService.getInstance();
      const user = await userService.verifyToken(token);
      
      if (user) {
        req.user = user;
      }
    }

    next();
  } catch (error) {
    logger.error('Optional auth middleware error:', error);
    next(); // Continue without authentication
  }
}