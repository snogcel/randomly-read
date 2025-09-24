import request from 'supertest';
import express from 'express';
import { authRoutes } from '../../src/routes/auth';
import { UserService } from '../../src/services/UserService';
import { createTestUser } from '../helpers/testData';
import { createUserInDB } from '../helpers/testUtils';

// Mock UserService
jest.mock('../../src/services/UserService');

describe('Auth Routes', () => {
  let app: express.Application;
  let mockUserService: jest.Mocked<UserService>;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/auth', authRoutes);

    // Setup UserService mock
    mockUserService = {
      login: jest.fn(),
      createUser: jest.fn(),
      changePassword: jest.fn(),
      verifyToken: jest.fn(),
      updateUser: jest.fn()
    } as any;

    (UserService.getInstance as jest.Mock).mockReturnValue(mockUserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /auth/login', () => {
    const validCredentials = {
      username: 'testuser',
      password: 'password123'
    };

    it('should login successfully with valid credentials', async () => {
      const mockResult = {
        user: createTestUser(),
        token: 'mock-jwt-token'
      };
      mockUserService.login.mockResolvedValue(mockResult);

      const response = await request(app)
        .post('/auth/login')
        .send(validCredentials)
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        data: mockResult,
        message: 'Login successful'
      });

      expect(mockUserService.login).toHaveBeenCalledWith(validCredentials);
    });

    it('should return 401 for invalid credentials', async () => {
      mockUserService.login.mockRejectedValue(new Error('Invalid username or password'));

      const response = await request(app)
        .post('/auth/login')
        .send(validCredentials)
        .expect(401);

      expect(response.body).toEqual({
        success: false,
        error: {
          code: 'LOGIN_FAILED',
          message: 'Invalid username or password'
        }
      });
    });

    it('should validate username length', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          username: 'ab', // Too short
          password: 'password123'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should validate password length', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          username: 'testuser',
          password: '12345' // Too short
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should require username and password', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({})
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('POST /auth/register', () => {
    const validRegistration = {
      username: 'newuser',
      password: 'password123',
      firstName: 'New',
      lastName: 'User',
      email: 'new@example.com'
    };

    it('should register successfully with valid data', async () => {
      const mockUser = createTestUser(validRegistration);
      const mockLoginResult = {
        user: mockUser,
        token: 'mock-jwt-token'
      };

      mockUserService.createUser.mockResolvedValue(mockUser as any);
      mockUserService.login.mockResolvedValue(mockLoginResult);

      const response = await request(app)
        .post('/auth/register')
        .send(validRegistration)
        .expect(201);

      expect(response.body).toEqual({
        success: true,
        data: mockLoginResult,
        message: 'Registration successful'
      });

      expect(mockUserService.createUser).toHaveBeenCalledWith(validRegistration);
      expect(mockUserService.login).toHaveBeenCalledWith({
        username: validRegistration.username,
        password: validRegistration.password
      });
    });

    it('should return 400 for duplicate username', async () => {
      mockUserService.createUser.mockRejectedValue(new Error('Username already exists'));

      const response = await request(app)
        .post('/auth/register')
        .send(validRegistration)
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        error: {
          code: 'REGISTRATION_FAILED',
          message: 'Username already exists'
        }
      });
    });

    it('should validate username format', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          ...validRegistration,
          username: 'invalid@username' // Contains invalid character
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should validate email format', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          ...validRegistration,
          email: 'invalid-email'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should allow registration without optional fields', async () => {
      const minimalRegistration = {
        username: 'minimal',
        password: 'password123'
      };

      const mockUser = createTestUser(minimalRegistration);
      const mockLoginResult = {
        user: mockUser,
        token: 'mock-jwt-token'
      };

      mockUserService.createUser.mockResolvedValue(mockUser as any);
      mockUserService.login.mockResolvedValue(mockLoginResult);

      const response = await request(app)
        .post('/auth/register')
        .send(minimalRegistration)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(mockUserService.createUser).toHaveBeenCalledWith(minimalRegistration);
    });
  });

  describe('POST /auth/change-password', () => {
    const mockUser = createTestUser();
    const passwordChangeData = {
      currentPassword: 'oldpassword123',
      newPassword: 'newpassword123'
    };

    beforeEach(() => {
      // Mock authentication middleware
      app.use((req: any, res, next) => {
        req.user = mockUser;
        next();
      });
    });

    it('should change password successfully', async () => {
      mockUserService.changePassword.mockResolvedValue(undefined);

      const response = await request(app)
        .post('/auth/change-password')
        .send(passwordChangeData)
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        message: 'Password changed successfully'
      });

      expect(mockUserService.changePassword).toHaveBeenCalledWith(
        mockUser.id,
        passwordChangeData.currentPassword,
        passwordChangeData.newPassword
      );
    });

    it('should return 400 for incorrect current password', async () => {
      mockUserService.changePassword.mockRejectedValue(new Error('Current password is incorrect'));

      const response = await request(app)
        .post('/auth/change-password')
        .send(passwordChangeData)
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        error: {
          code: 'PASSWORD_CHANGE_FAILED',
          message: 'Current password is incorrect'
        }
      });
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/auth/change-password')
        .send({
          currentPassword: 'oldpassword123'
          // Missing newPassword
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should validate new password length', async () => {
      const response = await request(app)
        .post('/auth/change-password')
        .send({
          currentPassword: 'oldpassword123',
          newPassword: '12345' // Too short
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('POST /auth/verify', () => {
    it('should verify valid token', async () => {
      const mockUser = createTestUser();
      const token = 'valid-jwt-token';

      mockUserService.verifyToken.mockResolvedValue(mockUser as any);

      const response = await request(app)
        .post('/auth/verify')
        .send({ token })
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        data: { user: mockUser },
        message: 'Token is valid'
      });

      expect(mockUserService.verifyToken).toHaveBeenCalledWith(token);
    });

    it('should return 401 for invalid token', async () => {
      const token = 'invalid-token';

      mockUserService.verifyToken.mockResolvedValue(null);

      const response = await request(app)
        .post('/auth/verify')
        .send({ token })
        .expect(401);

      expect(response.body).toEqual({
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Token is invalid or expired'
        }
      });
    });

    it('should return 400 when token is missing', async () => {
      const response = await request(app)
        .post('/auth/verify')
        .send({})
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        error: {
          code: 'TOKEN_REQUIRED',
          message: 'Token is required'
        }
      });
    });

    it('should handle verification errors', async () => {
      const token = 'error-token';

      mockUserService.verifyToken.mockRejectedValue(new Error('Verification failed'));

      const response = await request(app)
        .post('/auth/verify')
        .send({ token })
        .expect(401);

      expect(response.body).toEqual({
        success: false,
        error: {
          code: 'TOKEN_VERIFICATION_FAILED',
          message: 'Token verification failed'
        }
      });
    });
  });

  describe('GET /auth/me', () => {
    it('should return current user profile', async () => {
      const mockUser = createTestUser();

      // Mock authentication middleware
      app.use((req: any, res, next) => {
        req.user = mockUser;
        next();
      });

      const response = await request(app)
        .get('/auth/me')
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        data: { user: mockUser },
        message: 'User profile retrieved successfully'
      });
    });

    it('should return 401 when not authenticated', async () => {
      // Mock authentication middleware that doesn't set user
      app.use((req: any, res, next) => {
        // No user set
        next();
      });

      const response = await request(app)
        .get('/auth/me')
        .expect(401);

      expect(response.body.error.code).toBe('UNAUTHORIZED');
    });
  });

  describe('Input Validation', () => {
    it('should trim whitespace from inputs', async () => {
      const mockResult = {
        user: createTestUser(),
        token: 'mock-jwt-token'
      };
      mockUserService.login.mockResolvedValue(mockResult);

      await request(app)
        .post('/auth/login')
        .send({
          username: '  testuser  ', // With whitespace
          password: 'password123'
        })
        .expect(200);

      expect(mockUserService.login).toHaveBeenCalledWith({
        username: 'testuser', // Trimmed
        password: 'password123'
      });
    });

    it('should normalize email addresses', async () => {
      const mockUser = createTestUser();
      const mockLoginResult = {
        user: mockUser,
        token: 'mock-jwt-token'
      };

      mockUserService.createUser.mockResolvedValue(mockUser as any);
      mockUserService.login.mockResolvedValue(mockLoginResult);

      await request(app)
        .post('/auth/register')
        .send({
          username: 'testuser',
          password: 'password123',
          email: 'Test@Example.COM' // Mixed case
        })
        .expect(201);

      expect(mockUserService.createUser).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'password123',
        email: 'test@example.com' // Normalized
      });
    });
  });
});