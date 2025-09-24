import { UserService } from '../../src/services/UserService';
import { User } from '../../src/models/User';
import { createTestUser, createTestAdmin } from '../helpers/testData';
import { createUserInDB, expectToThrowAsync } from '../helpers/testUtils';
import jwt from 'jsonwebtoken';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = UserService.getInstance();
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = UserService.getInstance();
      const instance2 = UserService.getInstance();
      
      expect(instance1).toBe(instance2);
    });
  });

  describe('createUser', () => {
    it('should create a new user successfully', async () => {
      const userData = createTestUser();
      const user = await userService.createUser(userData);

      expect(user._id).toBeDefined();
      expect(user.username).toBe(userData.username);
      expect(user.firstName).toBe(userData.firstName);
      expect(user.email).toBe(userData.email);
      expect(user.isActive).toBe(true);
    });

    it('should throw error for duplicate username', async () => {
      const userData = createTestUser();
      await userService.createUser(userData);

      await expectToThrowAsync(
        () => userService.createUser(userData),
        'Username already exists'
      );
    });

    it('should throw error for duplicate email', async () => {
      const email = 'duplicate@example.com';
      await userService.createUser(createTestUser({ username: 'user1', email }));

      await expectToThrowAsync(
        () => userService.createUser(createTestUser({ username: 'user2', email })),
        'Email already exists'
      );
    });

    it('should create admin user', async () => {
      const adminData = createTestAdmin();
      const admin = await userService.createUser(adminData);

      expect(admin.admin).toBe(true);
      expect(admin.username).toBe('admin');
    });
  });

  describe('login', () => {
    let testUser: any;

    beforeEach(async () => {
      testUser = await createUserInDB({ password: 'password123' });
    });

    it('should login with valid credentials', async () => {
      const result = await userService.login({
        username: testUser.username,
        password: 'password123'
      });

      expect(result.user).toBeDefined();
      expect(result.token).toBeDefined();
      expect(result.user.username).toBe(testUser.username);
      
      // Verify JWT token
      const decoded = jwt.verify(result.token, process.env.JWT_SECRET!) as any;
      expect(decoded.userId).toBe(testUser._id.toString());
      expect(decoded.username).toBe(testUser.username);
    });

    it('should reject invalid username', async () => {
      await expectToThrowAsync(
        () => userService.login({
          username: 'nonexistent',
          password: 'password123'
        }),
        'Invalid username or password'
      );
    });

    it('should reject invalid password', async () => {
      await expectToThrowAsync(
        () => userService.login({
          username: testUser.username,
          password: 'wrongpassword'
        }),
        'Invalid username or password'
      );
    });

    it('should reject login for inactive user', async () => {
      testUser.isActive = false;
      await testUser.save();

      await expectToThrowAsync(
        () => userService.login({
          username: testUser.username,
          password: 'password123'
        }),
        'Invalid username or password'
      );
    });
  });

  describe('getUserById', () => {
    let testUser: any;

    beforeEach(async () => {
      testUser = await createUserInDB();
    });

    it('should return user by valid ID', async () => {
      const user = await userService.getUserById(testUser._id.toString());

      expect(user).toBeDefined();
      expect(user?._id).toEqual(testUser._id);
      expect(user?.username).toBe(testUser.username);
    });

    it('should return null for invalid ID', async () => {
      const user = await userService.getUserById('507f1f77bcf86cd799439011');
      expect(user).toBeNull();
    });

    it('should throw error for malformed ID', async () => {
      await expectToThrowAsync(
        () => userService.getUserById('invalid-id'),
        'Failed to get user'
      );
    });
  });

  describe('getUserByUsername', () => {
    let testUser: any;

    beforeEach(async () => {
      testUser = await createUserInDB();
    });

    it('should return user by valid username', async () => {
      const user = await userService.getUserByUsername(testUser.username);

      expect(user).toBeDefined();
      expect(user?.username).toBe(testUser.username);
    });

    it('should return null for nonexistent username', async () => {
      const user = await userService.getUserByUsername('nonexistent');
      expect(user).toBeNull();
    });

    it('should not return inactive users', async () => {
      testUser.isActive = false;
      await testUser.save();

      const user = await userService.getUserByUsername(testUser.username);
      expect(user).toBeNull();
    });
  });

  describe('updateUser', () => {
    let testUser: any;

    beforeEach(async () => {
      testUser = await createUserInDB();
    });

    it('should update user successfully', async () => {
      const updateData = {
        firstName: 'Updated',
        lastName: 'Name',
        email: 'updated@example.com'
      };

      const updatedUser = await userService.updateUser(testUser._id.toString(), updateData);

      expect(updatedUser.firstName).toBe('Updated');
      expect(updatedUser.lastName).toBe('Name');
      expect(updatedUser.email).toBe('updated@example.com');
    });

    it('should throw error for nonexistent user', async () => {
      await expectToThrowAsync(
        () => userService.updateUser('507f1f77bcf86cd799439011', { firstName: 'Test' }),
        'User not found'
      );
    });

    it('should throw error for duplicate email', async () => {
      const otherUser = await createUserInDB({ 
        username: 'other', 
        email: 'other@example.com' 
      });

      await expectToThrowAsync(
        () => userService.updateUser(testUser._id.toString(), { email: 'other@example.com' }),
        'Email already exists'
      );
    });

    it('should allow updating to same email', async () => {
      const updatedUser = await userService.updateUser(testUser._id.toString(), {
        email: testUser.email,
        firstName: 'Updated'
      });

      expect(updatedUser.firstName).toBe('Updated');
      expect(updatedUser.email).toBe(testUser.email);
    });
  });

  describe('deleteUser', () => {
    let testUser: any;

    beforeEach(async () => {
      testUser = await createUserInDB();
    });

    it('should soft delete user', async () => {
      await userService.deleteUser(testUser._id.toString());

      const deletedUser = await User.findById(testUser._id);
      expect(deletedUser?.isActive).toBe(false);
    });

    it('should throw error for nonexistent user', async () => {
      await expectToThrowAsync(
        () => userService.deleteUser('507f1f77bcf86cd799439011'),
        'User not found'
      );
    });
  });

  describe('getUsers', () => {
    beforeEach(async () => {
      // Create multiple test users
      await createUserInDB({ username: 'user1' });
      await createUserInDB({ username: 'user2' });
      await createUserInDB({ username: 'user3', isActive: false });
      await createUserInDB({ username: 'admin1', admin: true });
    });

    it('should return active users by default', async () => {
      const result = await userService.getUsers();

      expect(result.users).toHaveLength(3); // Excludes inactive user
      expect(result.totalCount).toBe(3);
      expect(result.hasMore).toBe(false);
    });

    it('should filter by admin status', async () => {
      const result = await userService.getUsers({ admin: true });

      expect(result.users).toHaveLength(1);
      expect(result.users[0].admin).toBe(true);
    });

    it('should include inactive users when specified', async () => {
      const result = await userService.getUsers({ isActive: false });

      expect(result.users).toHaveLength(1);
      expect(result.users[0].isActive).toBe(false);
    });

    it('should handle pagination', async () => {
      const result = await userService.getUsers({ limit: 2, offset: 0 });

      expect(result.users).toHaveLength(2);
      expect(result.hasMore).toBe(true);
    });

    it('should sort users', async () => {
      const result = await userService.getUsers({ 
        sortBy: 'username', 
        sortOrder: 'asc' 
      });

      const usernames = result.users.map(u => u.username);
      expect(usernames).toEqual([...usernames].sort());
    });
  });

  describe('changePassword', () => {
    let testUser: any;

    beforeEach(async () => {
      testUser = await createUserInDB({ password: 'oldpassword123' });
    });

    it('should change password successfully', async () => {
      await userService.changePassword(
        testUser._id.toString(),
        'oldpassword123',
        'newpassword123'
      );

      const updatedUser = await User.findById(testUser._id);
      const isOldValid = await updatedUser!.isValidPassword('oldpassword123');
      const isNewValid = await updatedUser!.isValidPassword('newpassword123');

      expect(isOldValid).toBe(false);
      expect(isNewValid).toBe(true);
    });

    it('should throw error for incorrect current password', async () => {
      await expectToThrowAsync(
        () => userService.changePassword(
          testUser._id.toString(),
          'wrongpassword',
          'newpassword123'
        ),
        'Current password is incorrect'
      );
    });

    it('should throw error for nonexistent user', async () => {
      await expectToThrowAsync(
        () => userService.changePassword(
          '507f1f77bcf86cd799439011',
          'oldpassword123',
          'newpassword123'
        ),
        'User not found'
      );
    });
  });

  describe('verifyToken', () => {
    let testUser: any;
    let validToken: string;

    beforeEach(async () => {
      testUser = await createUserInDB();
      validToken = jwt.sign(
        { userId: testUser._id.toString() },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
      );
    });

    it('should verify valid token', async () => {
      const user = await userService.verifyToken(validToken);

      expect(user).toBeDefined();
      expect(user?._id).toEqual(testUser._id);
    });

    it('should return null for invalid token', async () => {
      const user = await userService.verifyToken('invalid.token.here');
      expect(user).toBeNull();
    });

    it('should return null for expired token', async () => {
      const expiredToken = jwt.sign(
        { userId: testUser._id.toString() },
        process.env.JWT_SECRET!,
        { expiresIn: '-1h' }
      );

      const user = await userService.verifyToken(expiredToken);
      expect(user).toBeNull();
    });

    it('should return null for inactive user', async () => {
      testUser.isActive = false;
      await testUser.save();

      const user = await userService.verifyToken(validToken);
      expect(user).toBeNull();
    });
  });

  describe('Client-Therapist Relationships', () => {
    let therapist: any;
    let client: any;

    beforeEach(async () => {
      therapist = await createUserInDB({ username: 'therapist' });
      client = await createUserInDB({ username: 'client' });
    });

    it('should assign client to therapist', async () => {
      await userService.assignClientToTherapist(
        therapist._id.toString(),
        client._id.toString()
      );

      const updatedTherapist = await User.findById(therapist._id);
      expect(updatedTherapist?.clients).toContain(client._id);
    });

    it('should not duplicate client assignment', async () => {
      await userService.assignClientToTherapist(
        therapist._id.toString(),
        client._id.toString()
      );
      
      await userService.assignClientToTherapist(
        therapist._id.toString(),
        client._id.toString()
      );

      const updatedTherapist = await User.findById(therapist._id);
      const clientCount = updatedTherapist?.clients?.filter(
        id => id.equals(client._id)
      ).length;
      
      expect(clientCount).toBe(1);
    });

    it('should unassign client from therapist', async () => {
      await userService.assignClientToTherapist(
        therapist._id.toString(),
        client._id.toString()
      );

      await userService.unassignClientFromTherapist(
        therapist._id.toString(),
        client._id.toString()
      );

      const updatedTherapist = await User.findById(therapist._id);
      expect(updatedTherapist?.clients).not.toContain(client._id);
    });

    it('should get therapist clients', async () => {
      await userService.assignClientToTherapist(
        therapist._id.toString(),
        client._id.toString()
      );

      const clients = await userService.getTherapistClients(therapist._id.toString());

      expect(clients).toHaveLength(1);
      expect(clients[0]._id).toEqual(client._id);
    });
  });
});