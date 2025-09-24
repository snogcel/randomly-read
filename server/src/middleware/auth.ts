import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export interface AuthenticatedRequest extends Request {
  user?: any;
}

/**
 * No-op authentication middleware (auth removed)
 */
export async function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  // No authentication - all requests pass through
  req.user = null;
  next();
}

/**
 * No-op require authentication middleware (auth removed)
 */
export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  // No authentication required - all requests pass through
  req.user = null;
  next();
}

/**
 * No-op optional authentication middleware (auth removed)
 */
export async function optionalAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  // No authentication - all requests pass through
  req.user = null;
  next();
}