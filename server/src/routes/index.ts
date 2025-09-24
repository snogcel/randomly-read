import { Router } from 'express';
import { authRoutes } from './auth';
import { userRoutes } from './users';
import { routineRoutes } from './routines';
import { progressRoutes } from './progress';
import { adminRoutes } from './admin';

const router = Router();

// Mount route modules
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/routines', routineRoutes);
router.use('/progress', progressRoutes);
router.use('/admin', adminRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

export { router as routes };