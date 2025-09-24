"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
exports.notFoundHandler = notFoundHandler;
exports.asyncHandler = asyncHandler;
exports.createAPIError = createAPIError;
exports.createValidationError = createValidationError;
exports.createNotFoundError = createNotFoundError;
exports.createForbiddenError = createForbiddenError;
exports.createUnauthorizedError = createUnauthorizedError;
const logger_1 = require("../utils/logger");
const config_1 = require("../config");
function errorHandler(error, req, res, next) {
    logger_1.logger.error('API Error:', {
        message: error.message,
        stack: error.stack,
        url: req.url,
        method: req.method,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        userId: req.user?.id
    });
    let statusCode = error.statusCode || 500;
    let message = error.message || 'Internal server error';
    let code = error.code || 'INTERNAL_ERROR';
    let details = error.details;
    if (error.name === 'ValidationError') {
        statusCode = 400;
        code = 'VALIDATION_ERROR';
        message = 'Validation failed';
        details = error.message;
    }
    else if (error.name === 'CastError') {
        statusCode = 400;
        code = 'INVALID_ID';
        message = 'Invalid ID format';
    }
    else if (error.name === 'MongoError' || error.name === 'MongoServerError') {
        statusCode = 500;
        code = 'DATABASE_ERROR';
        message = 'Database operation failed';
        if (error.code === 11000) {
            statusCode = 409;
            code = 'DUPLICATE_KEY';
            message = 'Resource already exists';
        }
    }
    else if (error.name === 'JsonWebTokenError') {
        statusCode = 401;
        code = 'INVALID_TOKEN';
        message = 'Invalid authentication token';
    }
    else if (error.name === 'TokenExpiredError') {
        statusCode = 401;
        code = 'TOKEN_EXPIRED';
        message = 'Authentication token expired';
    }
    if (config_1.config.nodeEnv === 'production' && statusCode === 500) {
        message = 'Internal server error';
        details = undefined;
    }
    res.status(statusCode).json({
        success: false,
        error: {
            code,
            message,
            details,
            timestamp: new Date().toISOString(),
            requestId: req.headers['x-request-id'] || 'unknown'
        }
    });
}
function notFoundHandler(req, res) {
    logger_1.logger.warn(`404 - Route not found: ${req.method} ${req.url}`);
    res.status(404).json({
        success: false,
        error: {
            code: 'NOT_FOUND',
            message: `Route ${req.method} ${req.url} not found`,
            timestamp: new Date().toISOString()
        }
    });
}
function asyncHandler(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
function createAPIError(message, statusCode = 500, code, details) {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.code = code;
    error.details = details;
    return error;
}
function createValidationError(message, details) {
    return createAPIError(message, 400, 'VALIDATION_ERROR', details);
}
function createNotFoundError(resource) {
    return createAPIError(`${resource} not found`, 404, 'NOT_FOUND');
}
function createForbiddenError(message = 'Access denied') {
    return createAPIError(message, 403, 'FORBIDDEN');
}
function createUnauthorizedError(message = 'Authentication required') {
    return createAPIError(message, 401, 'UNAUTHORIZED');
}
//# sourceMappingURL=errorHandler.js.map