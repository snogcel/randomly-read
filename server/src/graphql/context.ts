import { Request } from 'express';
import { UserService } from '../services/UserService';
import { logger } from '../utils/logger';

export interface GraphQLContext {
  user: any | null;
  req: Request;
  userService: UserService;
}

/**
 * Create GraphQL context from request (no authentication)
 */
export async function createContext({ req }: { req: Request }): Promise<GraphQLContext> {
  // No authentication - all users are null
  logger.debug('GraphQL context - No authentication (open access)');

  return {
    user: null,
    req,
    userService: UserService.getInstance()
  };
}