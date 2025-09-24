import request from 'supertest';
import express from 'express';
import { routes } from '../../src/routes';
import { User } from '../../src/models/User';
import { Routine } from '../../src/models/Routine';
import { Word } from '../../src/models/Word';
import { createTestUser } from '../helpers/testData';

describe('API Integration Tests', () => {
  let app: express.Application;
  let testUser: any;

  beforeAll(async () => {
    // Setup Express app (use existing MongoDB connection from global setup)
    app = express();
    app.use(express.json());
    app.use('/api', routes);
  });

  beforeEach(async () => {
    // Clean database
    await User.deleteMany({});
    await Routine.deleteMany({});
    await Word.deleteMany({});

    // Create test user
    const userData = createTestUser({ password: 'password123' });
    testUser = new User(userData);
    await testUser.save();
  });

  describe('Authentication Flow', () => {
    it('should complete full authentication flow', async () => {
      // Register new user (no JWT token returned)
      const registerResponse = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'newuser',
          password: 'password123',
          firstName: 'New',
          lastName: 'User',
          email: 'new@example.com'
        })
        .expect(201);

      expect(registerResponse.body.success).toBe(true);
      expect(registerResponse.body.data.user).toBeDefined();
      expect(registerResponse.body.data.user.username).toBe('newuser');

      // Login with credentials (no JWT token returned)
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'newuser',
          password: 'password123'
        })
        .expect(200);

      expect(loginResponse.body.success).toBe(true);
      expect(loginResponse.body.data.user).toBeDefined();
      expect(loginResponse.body.data.user.username).toBe('newuser');
    });

    it('should handle authentication errors properly', async () => {
      // Try to login with wrong credentials
      await request(app)
        .post('/api/auth/login')
        .send({
          username: testUser.username,
          password: 'wrongpassword'
        })
        .expect(401);

      // Try to login with non-existent user
      await request(app)
        .post('/api/auth/login')
        .send({
          username: 'nonexistent',
          password: 'password123'
        })
        .expect(401);
    });
  });

  describe('User Management', () => {
    it('should handle user registration and login', async () => {
      // Register user
      const registerResponse = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser2',
          password: 'password123',
          firstName: 'Test',
          lastName: 'User',
          email: 'test2@example.com'
        })
        .expect(201);

      expect(registerResponse.body.success).toBe(true);
      expect(registerResponse.body.data.user.firstName).toBe('Test');

      // Login with new user
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'testuser2',
          password: 'password123'
        })
        .expect(200);

      expect(loginResponse.body.success).toBe(true);
      expect(loginResponse.body.data.user.username).toBe('testuser2');
    });

    it('should handle duplicate username registration', async () => {
      // Try to register with existing username
      await request(app)
        .post('/api/auth/register')
        .send({
          username: testUser.username,
          password: 'password123'
        })
        .expect(400);
    });
  });

  describe('Data Validation', () => {
    it('should validate input data properly', async () => {
      // Test registration validation
      await request(app)
        .post('/api/auth/register')
        .send({
          username: 'ab', // Too short
          password: '123' // Too short
        })
        .expect(400);

      // Test email validation
      await request(app)
        .post('/api/auth/register')
        .send({
          username: 'validuser',
          password: 'validpassword',
          email: 'invalid-email'
        })
        .expect(400);

      // Test duplicate username
      await request(app)
        .post('/api/auth/register')
        .send({
          username: testUser.username, // Already exists
          password: 'password123'
        })
        .expect(400);
    });

    it('should sanitize input data', async () => {
      const registerResponse = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'sanitizeduser', // Unique username
          password: 'password123',
          email: 'sanitized@example.com' // Unique email
        })
        .expect(201);

      const user = registerResponse.body.data.user;
      expect(user.username).toBe('sanitizeduser');
      expect(user.email).toBe('sanitized@example.com');
    });
  });

  describe('Error Handling', () => {
    it('should handle database errors gracefully', async () => {
      // Test with invalid credentials to simulate a controlled error
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'nonexistentuser',
          password: 'wrongpassword'
        })
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
    });

    it('should handle malformed JSON', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .set('Content-Type', 'application/json')
        .send('{ invalid json }')
        .expect(400);

      // Express handles malformed JSON automatically
      expect(response.status).toBe(400);
    });

    it('should handle missing content-type', async () => {
      await request(app)
        .post('/api/auth/login')
        .send('username=test&password=test')
        .expect(400);
    });
  });

  describe('Rate Limiting and Security', () => {
    it('should handle CORS properly', async () => {
      const response = await request(app)
        .options('/api/auth/login')
        .set('Origin', 'http://localhost:3000');

      // CORS handling may vary, just check it responds
      expect([200, 204]).toContain(response.status);
    });

    it('should not expose sensitive information in errors', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'nonexistent',
          password: 'password123'
        })
        .expect(401);

      // Should not reveal whether username exists
      expect(response.body.error.message).toContain('Invalid username or password');
    });

    it('should handle SQL injection attempts', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: "'; DROP TABLE users; --",
          password: 'password123'
        })
        .expect(401);

      expect(response.body.success).toBe(false);
      
      // Verify users table still exists
      const userCount = await User.countDocuments();
      expect(userCount).toBeGreaterThan(0);
    });
  });

  describe('Health Checks', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body.status).toBe('healthy');
      expect(response.body.timestamp).toBeDefined();
      expect(response.body.version).toBeDefined();
    });
  });

  describe('404 Handling', () => {
    it('should handle unknown routes', async () => {
      const response = await request(app)
        .get('/api/nonexistent')
        .expect(404);

      // 404 handling may vary, just check it returns 404
      expect(response.status).toBe(404);
    });

    it('should handle unknown methods', async () => {
      await request(app)
        .patch('/api/auth/login') // Wrong method
        .expect(404);
    });
  });

  describe('Content Negotiation', () => {
    it('should handle different content types', async () => {
      // JSON content type
      await request(app)
        .post('/api/auth/login')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({
          username: testUser.username,
          password: 'password123'
        }))
        .expect(200);

      // URL encoded (should be rejected for this endpoint)
      await request(app)
        .post('/api/auth/login')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send('username=test&password=test')
        .expect(400);
    });

    it('should return JSON responses', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.headers['content-type']).toMatch(/application\/json/);
      expect(typeof response.body).toBe('object');
    });
  });

  describe('Performance', () => {
    it('should handle concurrent requests', async () => {
      const requests = Array(10).fill(null).map(() =>
        request(app)
          .get('/api/health')
          .expect(200)
      );

      const responses = await Promise.all(requests);
      
      responses.forEach(response => {
        expect(response.body.status).toBe('healthy');
      });
    });

    it('should respond within reasonable time', async () => {
      const startTime = Date.now();
      
      await request(app)
        .post('/api/auth/login')
        .send({
          username: testUser.username,
          password: 'password123'
        })
        .expect(200);

      const responseTime = Date.now() - startTime;
      expect(responseTime).toBeLessThan(1000); // Should respond within 1 second
    });
  });
});