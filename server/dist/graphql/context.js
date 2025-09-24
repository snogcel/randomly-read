"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = createContext;
const UserService_1 = require("../services/UserService");
const logger_1 = require("../utils/logger");
async function createContext({ req }) {
    let user = null;
    try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);
            const userService = UserService_1.UserService.getInstance();
            user = await userService.verifyToken(token);
            if (user) {
                logger_1.logger.debug(`GraphQL context - Authenticated user: ${user.username}`);
            }
            else {
                logger_1.logger.debug('GraphQL context - Invalid or expired token');
            }
        }
        else {
            logger_1.logger.debug('GraphQL context - No authorization header provided');
        }
    }
    catch (error) {
        logger_1.logger.error('Error creating GraphQL context:', error);
    }
    return {
        user,
        req,
        userService: UserService_1.UserService.getInstance()
    };
}
//# sourceMappingURL=context.js.map