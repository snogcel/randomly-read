import { Request } from 'express';
import { UserService } from '../services/UserService';
import { logger } from '../utils/logger';

export interface GraphQLContext {
  user: any | null;
  req: Request;
  userService: UserService;
}

/**
 * Create GraphQL context from request
 */
export async function createContext({ req }: { req: Request }): Promise<GraphQLContext> {
  let user = null;

  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7); // Remove 'Bearer ' prefix
      const userService = UserService.getInstance();
      user = await userService.verifyToken(token);
      
      if (user) {
        logger.debug(`GraphQL context - Authenticated user: ${user.username}`);
      } else {
        logger.debug('GraphQL context - Invalid or expired token');
      }
    } else {
      logger.debug('GraphQL context - No authorization header provided');
    }
  } catch (error) {
    logger.error('Error creating GraphQL context:', error);
    // Continue with null user
  }

  return {
    user,
    req,
    userService: UserService.getInstance()
  };
}