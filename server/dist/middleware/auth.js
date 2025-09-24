"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
exports.requireAuth = requireAuth;
exports.requireSuperuser = requireSuperuser;
exports.optionalAuth = optionalAuth;
const UserService_1 = require("../services/UserService");
const logger_1 = require("../utils/logger");
async function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            req.user = null;
            return next();
        }
        const token = authHeader.substring(7);
        const userService = UserService_1.UserService.getInstance();
        const user = await userService.verifyToken(token);
        if (user) {
            req.user = user;
            logger_1.logger.debug(`Authenticated user: ${user.username}`);
        }
        else {
            req.user = null;
            logger_1.logger.debug('Invalid or expired token');
        }
        next();
    }
    catch (error) {
        logger_1.logger.error('Authentication middleware error:', error);
        req.user = null;
        next();
    }
}
function requireAuth(req, res, next) {
    if (!req.user) {
        res.status(401).json({
            error: 'Authentication required',
            code: 'UNAUTHORIZED'
        });
        return;
    }
    next();
}
function requireSuperuser(req, res, next) {
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
async function optionalAuth(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);
            const userService = UserService_1.UserService.getInstance();
            const user = await userService.verifyToken(token);
            if (user) {
                req.user = user;
            }
        }
        next();
    }
    catch (error) {
        logger_1.logger.error('Optional auth middleware error:', error);
        next();
    }
}
//# sourceMappingURL=auth.js.map