"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = connectDatabase;
exports.disconnectDatabase = disconnectDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
const logger_1 = require("../utils/logger");
async function connectDatabase() {
    try {
        mongoose_1.default.set('strictQuery', false);
        await mongoose_1.default.connect(config_1.config.database.url, config_1.config.database.options);
        logger_1.logger.info(`📦 Connected to MongoDB: ${config_1.config.database.url}`);
        mongoose_1.default.connection.on('error', (error) => {
            logger_1.logger.error('MongoDB connection error:', error);
        });
        mongoose_1.default.connection.on('disconnected', () => {
            logger_1.logger.warn('MongoDB disconnected');
        });
        mongoose_1.default.connection.on('reconnected', () => {
            logger_1.logger.info('MongoDB reconnected');
        });
    }
    catch (error) {
        logger_1.logger.error('Failed to connect to MongoDB:', error);
        throw error;
    }
}
async function disconnectDatabase() {
    try {
        await mongoose_1.default.connection.close();
        logger_1.logger.info('MongoDB connection closed');
    }
    catch (error) {
        logger_1.logger.error('Error closing MongoDB connection:', error);
        throw error;
    }
}
//# sourceMappingURL=connection.js.map