"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const schema_1 = require("./graphql/schema");
const resolvers_1 = require("./graphql/resolvers");
const context_1 = require("./graphql/context");
const auth_1 = require("./middleware/auth");
const errorHandler_1 = require("./middleware/errorHandler");
const routes_1 = require("./routes");
const config_1 = require("./config");
const logger_1 = require("./utils/logger");
const connection_1 = require("./database/connection");
async function startServer() {
    try {
        const app = (0, express_1.default)();
        const httpServer = http_1.default.createServer(app);
        await (0, connection_1.connectDatabase)();
        const server = new server_1.ApolloServer({
            typeDefs: schema_1.typeDefs,
            resolvers: resolvers_1.resolvers,
            plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
            formatError: (error) => {
                logger_1.logger.error('GraphQL Error:', error);
                return {
                    message: error.message,
                    code: error.extensions?.code || 'INTERNAL_ERROR',
                    path: error.path,
                };
            },
        });
        await server.start();
        app.use((0, cors_1.default)());
        app.use((0, morgan_1.default)('combined', { stream: { write: (message) => logger_1.logger.info(message.trim()) } }));
        app.use(express_1.default.json({ limit: '10mb' }));
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use('/graphql', auth_1.authMiddleware, (0, express4_1.expressMiddleware)(server, {
            context: context_1.createContext,
        }));
        app.use('/api', routes_1.routes);
        app.use(errorHandler_1.errorHandler);
        app.get('/health', (req, res) => {
            res.json({
                status: 'healthy',
                timestamp: new Date().toISOString(),
                version: process.env.npm_package_version || '1.0.0'
            });
        });
        const port = config_1.config.port;
        httpServer.listen(port, () => {
            logger_1.logger.info(`🚀 Server ready at http://localhost:${port}`);
            logger_1.logger.info(`📊 GraphQL endpoint: http://localhost:${port}/graphql`);
            logger_1.logger.info(`🏥 Health check: http://localhost:${port}/health`);
        });
        process.on('SIGTERM', async () => {
            logger_1.logger.info('SIGTERM received, shutting down gracefully');
            await server.stop();
            await mongoose_1.default.connection.close();
            httpServer.close(() => {
                logger_1.logger.info('Server closed');
                process.exit(0);
            });
        });
    }
    catch (error) {
        logger_1.logger.error('Failed to start server:', error);
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=index.js.map