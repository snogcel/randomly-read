import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { createContext } from './graphql/context';
import { authMiddleware } from './middleware/auth';
import { errorHandler } from './middleware/errorHandler';
import { routes } from './routes';
import { config } from './config';
import { logger } from './utils/logger';
import { connectDatabase } from './database/connection';

async function startServer() {
  try {
    // Create Express app
    const app = express();
    const httpServer = http.createServer(app);

    // Connect to database
    await connectDatabase();

    // Create Apollo Server
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
      formatError: (error) => {
        logger.error('GraphQL Error:', error);
        return {
          message: error.message,
          code: error.extensions?.code || 'INTERNAL_ERROR',
          path: error.path,
        };
      },
    });

    await server.start();

    // Middleware
    app.use(cors());
    app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true }));

    // GraphQL endpoint
    app.use(
      '/graphql',
      authMiddleware,
      expressMiddleware(server, {
        context: createContext,
      })
    );

    // REST API routes
    app.use('/api', routes);

    // Error handling
    app.use(errorHandler);

    // Health check
    app.get('/health', (req, res) => {
      res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || '1.0.0'
      });
    });

    // Start server
    const port = config.port;
    httpServer.listen(port, () => {
      logger.info(`🚀 Server ready at http://localhost:${port}`);
      logger.info(`📊 GraphQL endpoint: http://localhost:${port}/graphql`);
      logger.info(`🏥 Health check: http://localhost:${port}/health`);
    });

    // Graceful shutdown
    process.on('SIGTERM', async () => {
      logger.info('SIGTERM received, shutting down gracefully');
      await server.stop();
      await mongoose.connection.close();
      httpServer.close(() => {
        logger.info('Server closed');
        process.exit(0);
      });
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();