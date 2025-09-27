import { UserInputError, AuthenticationError, ForbiddenError, ApolloError } from 'apollo-server-express';
import { logger } from './logger';
import { PerformanceMonitor } from './performanceMonitor';

export enum ErrorCode {
  // Word-related errors
  WORD_NOT_FOUND = 'WORD_NOT_FOUND',
  INVALID_WORD_QUERY = 'INVALID_WORD_QUERY',
  WORD_QUERY_TIMEOUT = 'WORD_QUERY_TIMEOUT',
  PHONETIC_FILTER_ERROR = 'PHONETIC_FILTER_ERROR',
  
  // Database errors
  DATABASE_CONNECTION_ERROR = 'DATABASE_CONNECTION_ERROR',
  DATABASE_QUERY_ERROR = 'DATABASE_QUERY_ERROR',
  INDEX_NOT_FOUND = 'INDEX_NOT_FOUND',
  
  // Performance errors
  QUERY_TIMEOUT = 'QUERY_TIMEOUT',
  MEMORY_LIMIT_EXCEEDED = 'MEMORY_LIMIT_EXCEEDED',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  
  // Validation errors
  INVALID_INPUT = 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',
  INVALID_PHONETIC_COMBINATION = 'INVALID_PHONETIC_COMBINATION',
  
  // System errors
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE'
}

export interface ErrorContext {
  operation?: string;
  userId?: string;
  input?: any;
  executionTime?: number;
  additionalInfo?: any;
}

export class GraphQLErrorHandler {
  private static instance: GraphQLErrorHandler;
  private performanceMonitor: PerformanceMonitor;

  private constructor() {
    this.performanceMonitor = PerformanceMonitor.getInstance();
  }

  public static getInstance(): GraphQLErrorHandler {
    if (!GraphQLErrorHandler.instance) {
      GraphQLErrorHandler.instance = new GraphQLErrorHandler();
    }
    return GraphQLErrorHandler.instance;
  }

  /**
   * Handle and format GraphQL errors
   */
  handleError(error: Error, context: ErrorContext = {}): Error {
    const errorId = this.generateErrorId();
    
    // Log the error with context
    logger.error('GraphQL Error', {
      errorId,
      message: error.message,
      stack: error.stack,
      ...context
    });

    // Record performance metrics for errors
    if (context.operation) {
      this.performanceMonitor.recordMetrics({
        operation: context.operation,
        executionTime: context.executionTime || 0,
        errorOccurred: true,
        userId: context.userId
      });
    }

    // Return appropriate error type
    return this.categorizeError(error, errorId, context);
  }

  /**
   * Categorize and format errors
   */
  private categorizeError(error: Error, errorId: string, context: ErrorContext): Error {
    // Preserve existing GraphQL errors
    if (error instanceof UserInputError || 
        error instanceof AuthenticationError || 
        error instanceof ForbiddenError ||
        error instanceof ApolloError) {
      return error;
    }

    // Database connection errors
    if (this.isDatabaseError(error)) {
      return new ApolloError(
        'Database connection error',
        ErrorCode.DATABASE_CONNECTION_ERROR,
        { errorId, retryable: true }
      );
    }

    // Query timeout errors
    if (this.isTimeoutError(error)) {
      return new ApolloError(
        'Query timeout - please try with more specific filters',
        ErrorCode.QUERY_TIMEOUT,
        { errorId, retryable: true }
      );
    }

    // Validation errors
    if (this.isValidationError(error)) {
      return new UserInputError(
        error.message,
        { errorId, code: ErrorCode.INVALID_INPUT }
      );
    }

    // Default to internal server error
    return new ApolloError(
      'An internal server error occurred',
      ErrorCode.INTERNAL_SERVER_ERROR,
      { errorId, retryable: false }
    );
  }

  /**
   * Validate word query input
   */
  validateWordQuery(input: any): void {
    if (!input) {
      throw new UserInputError('Query input is required', {
        code: ErrorCode.MISSING_REQUIRED_FIELD
      });
    }

    // Validate vowel parameter
    if (input.vowel !== undefined) {
      if (!Array.isArray(input.vowel)) {
        throw new UserInputError('Vowel parameter must be an array', {
          code: ErrorCode.INVALID_INPUT
        });
      }
      
      const validVowels = ['AA', 'AE', 'AH', 'AO', 'AW', 'AY', 'EH', 'ER', 'EY', 'IH', 'IY', 'OW', 'OY', 'UH', 'UW'];
      const invalidVowels = input.vowel.filter((v: string) => !validVowels.includes(v));
      if (invalidVowels.length > 0) {
        throw new UserInputError(`Invalid vowel sounds: ${invalidVowels.join(', ')}`, {
          code: ErrorCode.INVALID_PHONETIC_COMBINATION
        });
      }
    }

    // Validate consonant parameter
    if (input.consonant !== undefined) {
      if (!Array.isArray(input.consonant)) {
        throw new UserInputError('Consonant parameter must be an array', {
          code: ErrorCode.INVALID_INPUT
        });
      }
      
      const validConsonants = ['B', 'CH', 'D', 'DH', 'F', 'G', 'HH', 'JH', 'K', 'L', 'M', 'N', 'NG', 'P', 'R', 'S', 'SH', 'T', 'TH', 'V', 'W', 'Y', 'Z', 'ZH'];
      const invalidConsonants = input.consonant.filter((c: string) => !validConsonants.includes(c));
      if (invalidConsonants.length > 0) {
        throw new UserInputError(`Invalid consonant sounds: ${invalidConsonants.join(', ')}`, {
          code: ErrorCode.INVALID_PHONETIC_COMBINATION
        });
      }
    }

    // Validate position
    if (input.position && !['initial', 'medial', 'final'].includes(input.position)) {
      throw new UserInputError('Position must be initial, medial, or final', {
        code: ErrorCode.INVALID_INPUT
      });
    }

    // Validate syllables
    if (input.syllables !== undefined) {
      if (!Array.isArray(input.syllables)) {
        throw new UserInputError('Syllables parameter must be an array', {
          code: ErrorCode.INVALID_INPUT
        });
      }
      
      if (input.syllables.some((s: number) => !Number.isInteger(s) || s < 1 || s > 10)) {
        throw new UserInputError('Syllables must be integers between 1 and 10', {
          code: ErrorCode.INVALID_INPUT
        });
      }
    }

    // Validate limit
    if (input.limit !== undefined) {
      if (!Number.isInteger(input.limit) || input.limit < 1 || input.limit > 1000) {
        throw new UserInputError('Limit must be an integer between 1 and 1000', {
          code: ErrorCode.INVALID_INPUT
        });
      }
    }

    // Validate offset
    if (input.offset !== undefined) {
      if (!Number.isInteger(input.offset) || input.offset < 0) {
        throw new UserInputError('Offset must be a non-negative integer', {
          code: ErrorCode.INVALID_INPUT
        });
      }
    }

    // Validate age
    if (input.age !== undefined) {
      const age = parseInt(input.age, 10);
      if (isNaN(age) || age < 0 || age > 20) {
        throw new UserInputError('Age must be between 0 and 20', {
          code: ErrorCode.INVALID_INPUT
        });
      }
    }
  }

  /**
   * Validate ObjectId format
   */
  validateObjectId(id: string, fieldName: string = 'ID'): void {
    if (!id) {
      throw new UserInputError(`${fieldName} is required`, {
        code: ErrorCode.MISSING_REQUIRED_FIELD
      });
    }

    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      throw new UserInputError(`Invalid ${fieldName} format`, {
        code: ErrorCode.INVALID_INPUT
      });
    }
  }

  /**
   * Create timeout wrapper for queries
   */
  withTimeout<T>(promise: Promise<T>, timeoutMs: number = 30000): Promise<T> {
    return Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        setTimeout(() => {
          reject(new Error('Query timeout'));
        }, timeoutMs);
      })
    ]);
  }

  /**
   * Error type detection methods
   */
  private isDatabaseError(error: Error): boolean {
    return error.message.includes('connection') ||
           error.message.includes('ECONNREFUSED') ||
           error.message.includes('MongoError') ||
           error.message.includes('MongooseError');
  }

  private isTimeoutError(error: Error): boolean {
    return error.message.includes('timeout') ||
           error.message.includes('ETIMEDOUT') ||
           error.message.includes('Query timeout');
  }

  private isValidationError(error: Error): boolean {
    return error.message.includes('validation') ||
           error.message.includes('required') ||
           error.message.includes('invalid') ||
           error.name === 'ValidationError';
  }

  /**
   * Generate unique error ID for tracking
   */
  private generateErrorId(): string {
    return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get error statistics
   */
  getErrorStats(): {
    totalErrors: number;
    errorsByType: { [key: string]: number };
    recentErrors: any[];
  } {
    // This would typically be stored in a database or cache
    // For now, return empty stats
    return {
      totalErrors: 0,
      errorsByType: {},
      recentErrors: []
    };
  }
}

/**
 * Decorator for automatic error handling in resolvers
 */
export function handleErrors(operation: string) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    const errorHandler = GraphQLErrorHandler.getInstance();
    
    descriptor.value = async function (...args: any[]) {
      const startTime = Date.now();
      
      try {
        return await method.apply(this, args);
      } catch (error) {
        const executionTime = Date.now() - startTime;
        const context = args[2]; // GraphQL context is typically the third argument
        
        throw errorHandler.handleError(error as Error, {
          operation: `${operation}.${propertyName}`,
          userId: context?.user?.id,
          input: args[1], // GraphQL args is typically the second argument
          executionTime
        });
      }
    };
  };
}