"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const UserService_1 = require("../services/UserService");
const errorHandler_1 = require("../middleware/errorHandler");
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
                user: result.user
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
                message: `Login failed: ${error.message}`
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
        logger_1.logger.info(`User registered: ${username}`);
        res.status(201).json({
            success: true,
            data: {
                user
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
//# sourceMappingURL=auth.js.map