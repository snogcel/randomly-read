"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const UserService_1 = require("../services/UserService");
const errorHandler_1 = require("../middleware/errorHandler");
const auth_1 = require("../middleware/auth");
const logger_1 = require("../utils/logger");
const router = (0, express_1.Router)();
exports.authRoutes = router;
const userService = UserService_1.UserService.getInstance();
router.post('/login', [
    (0, express_validator_1.body)('username')
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage('Username must be between 3 and 50 characters'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
], (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw (0, errorHandler_1.createValidationError)('Validation failed', errors.array());
    }
    const { username, password } = req.body;
    try {
        const result = await userService.login({ username, password });
        logger_1.logger.info(`User logged in: ${username}`);
        res.json({
            success: true,
            data: {
                user: result.user,
                token: result.token
            },
            message: 'Login successful'
        });
    }
    catch (error) {
        logger_1.logger.warn(`Login failed for username: ${username}`);
        res.status(401).json({
            success: false,
            error: {
                code: 'LOGIN_FAILED',
                message: error.message
            }
        });
    }
}));
router.post('/register', [
    (0, express_validator_1.body)('username')
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage('Username must be between 3 and 50 characters')
        .matches(/^[a-zA-Z0-9_-]+$/)
        .withMessage('Username can only contain letters, numbers, underscores, and hyphens'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
    (0, express_validator_1.body)('firstName')
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('First name must be less than 50 characters'),
    (0, express_validator_1.body)('lastName')
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('Last name must be less than 50 characters'),
    (0, express_validator_1.body)('email')
        .optional()
        .isEmail()
        .normalizeEmail()
        .withMessage('Must be a valid email address')
], (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw (0, errorHandler_1.createValidationError)('Validation failed', errors.array());
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
        const loginResult = await userService.login({ username, password });
        logger_1.logger.info(`User registered and logged in: ${username}`);
        res.status(201).json({
            success: true,
            data: {
                user: loginResult.user,
                token: loginResult.token
            },
            message: 'Registration successful'
        });
    }
    catch (error) {
        logger_1.logger.warn(`Registration failed for username: ${username}`);
        res.status(400).json({
            success: false,
            error: {
                code: 'REGISTRATION_FAILED',
                message: error.message
            }
        });
    }
}));
router.post('/change-password', auth_1.requireAuth, [
    (0, express_validator_1.body)('currentPassword')
        .notEmpty()
        .withMessage('Current password is required'),
    (0, express_validator_1.body)('newPassword')
        .isLength({ min: 6 })
        .withMessage('New password must be at least 6 characters')
], (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw (0, errorHandler_1.createValidationError)('Validation failed', errors.array());
    }
    const { currentPassword, newPassword } = req.body;
    try {
        await userService.changePassword(req.user.id, currentPassword, newPassword);
        logger_1.logger.info(`Password changed for user: ${req.user.username}`);
        res.json({
            success: true,
            message: 'Password changed successfully'
        });
    }
    catch (error) {
        logger_1.logger.warn(`Password change failed for user: ${req.user.username}`);
        res.status(400).json({
            success: false,
            error: {
                code: 'PASSWORD_CHANGE_FAILED',
                message: error.message
            }
        });
    }
}));
router.post('/verify', (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({
            success: false,
            error: {
                code: 'TOKEN_REQUIRED',
                message: 'Token is required'
            }
        });
    }
    try {
        const user = await userService.verifyToken(token);
        if (user) {
            res.json({
                success: true,
                data: { user },
                message: 'Token is valid'
            });
        }
        else {
            res.status(401).json({
                success: false,
                error: {
                    code: 'INVALID_TOKEN',
                    message: 'Token is invalid or expired'
                }
            });
        }
    }
    catch (error) {
        res.status(401).json({
            success: false,
            error: {
                code: 'TOKEN_VERIFICATION_FAILED',
                message: 'Token verification failed'
            }
        });
    }
}));
router.get('/me', auth_1.requireAuth, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    res.json({
        success: true,
        data: { user: req.user },
        message: 'User profile retrieved successfully'
    });
}));
//# sourceMappingURL=auth.js.map