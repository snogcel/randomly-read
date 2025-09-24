import { Request, Response, NextFunction } from 'express';
export interface APIError extends Error {
    statusCode?: number;
    code?: string;
    details?: any;
}
export declare function errorHandler(error: APIError, req: Request, res: Response, next: NextFunction): void;
export declare function notFoundHandler(req: Request, res: Response): void;
export declare function asyncHandler(fn: Function): (req: Request, res: Response, next: NextFunction) => void;
export declare function createAPIError(message: string, statusCode?: number, code?: string, details?: any): APIError;
export declare function createValidationError(message: string, details?: any): APIError;
export declare function createNotFoundError(resource: string): APIError;
export declare function createForbiddenError(message?: string): APIError;
export declare function createUnauthorizedError(message?: string): APIError;
//# sourceMappingURL=errorHandler.d.ts.map