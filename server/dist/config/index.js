"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: parseInt(process.env.PORT || '8080', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    database: {
        url: process.env.DATABASE_URL || 'mongodb://localhost:27017/randomly_read',
        options: {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            bufferCommands: false,
        },
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'development_secret_change_in_production',
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    },
    redis: {
        url: process.env.REDIS_URL || 'redis://localhost:6379',
        ttl: parseInt(process.env.REDIS_TTL || '3600', 10),
    },
    wordDatabase: {
        maxQueryLimit: parseInt(process.env.MAX_WORD_QUERY_LIMIT || '1000', 10),
        defaultLimit: parseInt(process.env.DEFAULT_WORD_LIMIT || '1', 10),
        cacheEnabled: process.env.WORD_CACHE_ENABLED === 'true',
        cacheTTL: parseInt(process.env.WORD_CACHE_TTL || '1800', 10),
    },
    exercise: {
        maxSessionDuration: parseInt(process.env.MAX_SESSION_DURATION || '3600', 10),
        timerPrecision: parseInt(process.env.TIMER_PRECISION || '100', 10),
    },
    logging: {
        level: process.env.LOG_LEVEL || 'info',
        format: process.env.LOG_FORMAT || 'combined',
    },
    security: {
        bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '12', 10),
        rateLimitWindow: parseInt(process.env.RATE_LIMIT_WINDOW || '900000', 10),
        rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
    },
    cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        credentials: true,
    },
};
if (exports.config.nodeEnv === 'production') {
    const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET'];
    for (const envVar of requiredEnvVars) {
        if (!process.env[envVar]) {
            throw new Error(`Required environment variable ${envVar} is not set`);
        }
    }
}
//# sourceMappingURL=index.js.map