"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const User_1 = require("../models/User");
const logger_1 = require("../utils/logger");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
class UserService {
    static getInstance() {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }
    async createUser(data) {
        try {
            const existingUser = await User_1.User.findOne({ username: data.username });
            if (existingUser) {
                throw new Error('Username already exists');
            }
            if (data.email) {
                const existingEmail = await User_1.User.findOne({ email: data.email });
                if (existingEmail) {
                    throw new Error('Email already exists');
                }
            }
            const user = new User_1.User(data);
            const savedUser = await user.save();
            logger_1.logger.info(`User created: ${savedUser.username}`);
            return savedUser;
        }
        catch (error) {
            logger_1.logger.error('Error creating user:', error);
            throw new Error(`Failed to create user: ${error.message}`);
        }
    }
    async login(credentials) {
        try {
            const user = await User_1.User.findOne({
                username: credentials.username,
                isActive: { $ne: false }
            });
            if (!user) {
                throw new Error('Invalid username or password');
            }
            const isValidPassword = await user.isValidPassword(credentials.password);
            if (!isValidPassword) {
                throw new Error('Invalid username or password');
            }
            const token = jsonwebtoken_1.default.sign({
                userId: user._id.toString(),
                username: user.username
            }, config_1.config.jwt.secret, { expiresIn: config_1.config.jwt.expiresIn });
            logger_1.logger.info(`User logged in: ${user.username}`);
            return {
                user,
                token
            };
        }
        catch (error) {
            logger_1.logger.error('Error during login:', error);
            throw new Error(`Login failed: ${error.message}`);
        }
    }
    async getUserById(id) {
        try {
            return await User_1.User.findById(id)
                .populate('routines', 'name description')
                .populate('clients', 'username firstName lastName');
        }
        catch (error) {
            logger_1.logger.error('Error getting user by ID:', error);
            throw new Error('Failed to get user');
        }
    }
    async getUserByUsername(username) {
        try {
            return await User_1.User.findOne({ username, isActive: { $ne: false } });
        }
        catch (error) {
            logger_1.logger.error('Error getting user by username:', error);
            throw new Error('Failed to get user');
        }
    }
    async updateUser(id, data) {
        try {
            const user = await User_1.User.findById(id);
            if (!user) {
                throw new Error('User not found');
            }
            if (data.email && data.email !== user.email) {
                const existingEmail = await User_1.User.findOne({
                    email: data.email,
                    _id: { $ne: id }
                });
                if (existingEmail) {
                    throw new Error('Email already exists');
                }
            }
            Object.assign(user, data);
            const updatedUser = await user.save();
            logger_1.logger.info(`User updated: ${updatedUser.username}`);
            return updatedUser;
        }
        catch (error) {
            logger_1.logger.error('Error updating user:', error);
            throw new Error(`Failed to update user: ${error.message}`);
        }
    }
    async deleteUser(id) {
        try {
            const user = await User_1.User.findById(id);
            if (!user) {
                throw new Error('User not found');
            }
            user.isActive = false;
            await user.save();
            logger_1.logger.info(`User deleted: ${user.username}`);
        }
        catch (error) {
            logger_1.logger.error('Error deleting user:', error);
            throw new Error(`Failed to delete user: ${error.message}`);
        }
    }
    async getUsers(options = {}) {
        try {
            const filter = {};
            if (typeof options.isActive === 'boolean') {
                filter.isActive = options.isActive;
            }
            else {
                filter.isActive = { $ne: false };
            }
            if (options.company) {
                filter.company = options.company;
            }
            const limit = options.limit || 20;
            const offset = options.offset || 0;
            const sortBy = options.sortBy || 'createdAt';
            const sortOrder = options.sortOrder === 'asc' ? 1 : -1;
            const totalCount = await User_1.User.countDocuments(filter);
            const users = await User_1.User.find(filter)
                .populate('routines', 'name description')
                .populate('clients', 'username firstName lastName')
                .sort({ [sortBy]: sortOrder })
                .skip(offset)
                .limit(limit);
            return {
                users,
                totalCount,
                hasMore: totalCount > offset + limit
            };
        }
        catch (error) {
            logger_1.logger.error('Error querying users:', error);
            throw new Error('Failed to query users');
        }
    }
    async assignClientToTherapist(therapistId, clientId) {
        try {
            const therapist = await User_1.User.findById(therapistId);
            const client = await User_1.User.findById(clientId);
            if (!therapist) {
                throw new Error('Therapist not found');
            }
            if (!client) {
                throw new Error('Client not found');
            }
            if (!therapist.clients?.includes(clientId)) {
                await User_1.User.findByIdAndUpdate(therapistId, { $addToSet: { clients: clientId } });
            }
            logger_1.logger.info(`Client ${clientId} assigned to therapist ${therapistId}`);
        }
        catch (error) {
            logger_1.logger.error('Error assigning client to therapist:', error);
            throw new Error(`Failed to assign client: ${error.message}`);
        }
    }
    async unassignClientFromTherapist(therapistId, clientId) {
        try {
            await User_1.User.findByIdAndUpdate(therapistId, { $pull: { clients: clientId } });
            logger_1.logger.info(`Client ${clientId} unassigned from therapist ${therapistId}`);
        }
        catch (error) {
            logger_1.logger.error('Error unassigning client from therapist:', error);
            throw new Error(`Failed to unassign client: ${error.message}`);
        }
    }
    async getTherapistClients(therapistId) {
        try {
            const therapist = await User_1.User.findById(therapistId)
                .populate('clients', 'username firstName lastName email age gender isActive');
            if (!therapist) {
                throw new Error('Therapist not found');
            }
            return therapist.clients || [];
        }
        catch (error) {
            logger_1.logger.error('Error getting therapist clients:', error);
            throw new Error('Failed to get therapist clients');
        }
    }
    async changePassword(userId, currentPassword, newPassword) {
        try {
            const user = await User_1.User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            const isValidPassword = await user.isValidPassword(currentPassword);
            if (!isValidPassword) {
                throw new Error('Current password is incorrect');
            }
            user.password = newPassword;
            await user.save();
            logger_1.logger.info(`Password changed for user: ${user.username}`);
        }
        catch (error) {
            logger_1.logger.error('Error changing password:', error);
            throw new Error(`Failed to change password: ${error.message}`);
        }
    }
    async verifyToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwt.secret);
            const user = await User_1.User.findById(decoded.userId);
            if (!user || user.isActive === false) {
                return null;
            }
            return user;
        }
        catch (error) {
            logger_1.logger.error('Error verifying token:', error);
            return null;
        }
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map