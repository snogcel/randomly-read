import { User, IUser } from '../models/User';
import { logger } from '../utils/logger';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export interface CreateUserData {
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  age?: number;
  gender?: string;
  company?: string;
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  age?: number;
  gender?: string;
  address?: string;
  city?: string;
  stateProvince?: string;
  postalCode?: string;
  country?: string;
  company?: string;
  isActive?: boolean;
}

export interface UserQueryOptions {
  limit?: number;
  offset?: number;
  isActive?: boolean;
  company?: string;
  sortBy?: 'username' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResult {
  user: IUser;
  token: string;
}

export class UserService {
  private static instance: UserService;
  
  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  /**
   * Create a new user
   */
  async createUser(data: CreateUserData): Promise<IUser> {
    try {
      // Check if username already exists
      const existingUser = await User.findOne({ username: data.username });
      if (existingUser) {
        throw new Error('Username already exists');
      }

      // Check if email already exists (if provided)
      if (data.email) {
        const existingEmail = await User.findOne({ email: data.email });
        if (existingEmail) {
          throw new Error('Email already exists');
        }
      }

      const user = new User(data);
      const savedUser = await user.save();
      
      logger.info(`User created: ${savedUser.username}`);
      return savedUser;
      
    } catch (error) {
      logger.error('Error creating user:', error);
      throw new Error(`Failed to create user: ${(error as Error).message}`);
    }
  }

  /**
   * Authenticate user login
   */
  async login(credentials: LoginCredentials): Promise<AuthResult> {
    try {
      // Find user by username
      const user = await User.findOne({ 
        username: credentials.username,
        isActive: { $ne: false }
      });
      
      if (!user) {
        throw new Error('Invalid username or password');
      }

      // Verify password
      const isValidPassword = await user.isValidPassword(credentials.password);
      if (!isValidPassword) {
        throw new Error('Invalid username or password');
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: user._id.toString(),
          username: user.username
        },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn } as jwt.SignOptions
      );

      logger.info(`User logged in: ${user.username}`);
      
      return {
        user,
        token
      };
      
    } catch (error) {
      logger.error('Error during login:', error);
      throw new Error(`Login failed: ${(error as Error).message}`);
    }
  }

  /**
   * Get user by ID
   */
  async getUserById(id: string): Promise<IUser | null> {
    try {
      return await User.findById(id)
        .populate('routines', 'name description')
        .populate('clients', 'username firstName lastName');
    } catch (error) {
      logger.error('Error getting user by ID:', error);
      throw new Error('Failed to get user');
    }
  }

  /**
   * Get user by username
   */
  async getUserByUsername(username: string): Promise<IUser | null> {
    try {
      return await User.findOne({ username, isActive: { $ne: false } });
    } catch (error) {
      logger.error('Error getting user by username:', error);
      throw new Error('Failed to get user');
    }
  }

  /**
   * Update user
   */
  async updateUser(id: string, data: UpdateUserData): Promise<IUser> {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error('User not found');
      }

      // Check if email is being changed and already exists
      if (data.email && data.email !== user.email) {
        const existingEmail = await User.findOne({ 
          email: data.email,
          _id: { $ne: id }
        });
        if (existingEmail) {
          throw new Error('Email already exists');
        }
      }

      Object.assign(user, data);
      const updatedUser = await user.save();
      
      logger.info(`User updated: ${updatedUser.username}`);
      return updatedUser;
      
    } catch (error) {
      logger.error('Error updating user:', error);
      throw new Error(`Failed to update user: ${(error as Error).message}`);
    }
  }

  /**
   * Delete user (soft delete)
   */
  async deleteUser(id: string): Promise<void> {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error('User not found');
      }

      user.isActive = false;
      await user.save();
      
      logger.info(`User deleted: ${user.username}`);
      
    } catch (error) {
      logger.error('Error deleting user:', error);
      throw new Error(`Failed to delete user: ${(error as Error).message}`);
    }
  }

  /**
   * Query users with filters
   */
  async getUsers(options: UserQueryOptions = {}): Promise<{
    users: IUser[];
    totalCount: number;
    hasMore: boolean;
  }> {
    try {
      const filter: any = {};
      
      if (typeof options.isActive === 'boolean') {
        filter.isActive = options.isActive;
      } else {
        filter.isActive = { $ne: false }; // Default to active users
      }
      

      
      if (options.company) {
        filter.company = options.company;
      }

      const limit = options.limit || 20;
      const offset = options.offset || 0;
      const sortBy = options.sortBy || 'createdAt';
      const sortOrder = options.sortOrder === 'asc' ? 1 : -1;

      const totalCount = await User.countDocuments(filter);
      
      const users = await User.find(filter)
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
      
    } catch (error) {
      logger.error('Error querying users:', error);
      throw new Error('Failed to query users');
    }
  }

  /**
   * Assign client to therapist
   */
  async assignClientToTherapist(therapistId: string, clientId: string): Promise<void> {
    try {
      const therapist = await User.findById(therapistId);
      const client = await User.findById(clientId);
      
      if (!therapist) {
        throw new Error('Therapist not found');
      }
      
      if (!client) {
        throw new Error('Client not found');
      }

      // Add client to therapist's clients list
      if (!therapist.clients?.includes(clientId as any)) {
        await User.findByIdAndUpdate(
          therapistId,
          { $addToSet: { clients: clientId } }
        );
      }

      logger.info(`Client ${clientId} assigned to therapist ${therapistId}`);
      
    } catch (error) {
      logger.error('Error assigning client to therapist:', error);
      throw new Error(`Failed to assign client: ${(error as Error).message}`);
    }
  }

  /**
   * Unassign client from therapist
   */
  async unassignClientFromTherapist(therapistId: string, clientId: string): Promise<void> {
    try {
      await User.findByIdAndUpdate(
        therapistId,
        { $pull: { clients: clientId } }
      );

      logger.info(`Client ${clientId} unassigned from therapist ${therapistId}`);
      
    } catch (error) {
      logger.error('Error unassigning client from therapist:', error);
      throw new Error(`Failed to unassign client: ${(error as Error).message}`);
    }
  }

  /**
   * Get therapist's clients
   */
  async getTherapistClients(therapistId: string): Promise<IUser[]> {
    try {
      const therapist = await User.findById(therapistId)
        .populate('clients', 'username firstName lastName email age gender isActive');
      
      if (!therapist) {
        throw new Error('Therapist not found');
      }

      return (therapist.clients as unknown as IUser[]) || [];
      
    } catch (error) {
      logger.error('Error getting therapist clients:', error);
      throw new Error('Failed to get therapist clients');
    }
  }

  /**
   * Change user password
   */
  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Verify current password
      const isValidPassword = await user.isValidPassword(currentPassword);
      if (!isValidPassword) {
        throw new Error('Current password is incorrect');
      }

      // Update password (will be hashed by pre-save hook)
      user.password = newPassword;
      await user.save();
      
      logger.info(`Password changed for user: ${user.username}`);
      
    } catch (error) {
      logger.error('Error changing password:', error);
      throw new Error(`Failed to change password: ${(error as Error).message}`);
    }
  }

  /**
   * Verify JWT token and get user
   */
  async verifyToken(token: string): Promise<IUser | null> {
    try {
      const decoded = jwt.verify(token, config.jwt.secret) as any;
      const user = await User.findById(decoded.userId);
      
      if (!user || user.isActive === false) {
        return null;
      }
      
      return user;
      
    } catch (error) {
      logger.error('Error verifying token:', error);
      return null;
    }
  }
}