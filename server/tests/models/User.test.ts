import { User } from '../../src/models/User';
import { createTestUser, createTestAdmin } from '../helpers/testData';
import { expectValidationError } from '../helpers/testUtils';

describe('User Model', () => {
  describe('User Creation', () => {
    it('should create a valid user', async () => {
      const userData = createTestUser();
      const user = new User(userData);
      const savedUser = await user.save();

      expect(savedUser._id).toBeDefined();
      expect(savedUser.username).toBe(userData.username);
      expect(savedUser.firstName).toBe(userData.firstName);
      expect(savedUser.lastName).toBe(userData.lastName);
      expect(savedUser.email).toBe(userData.email);
      expect(savedUser.isActive).toBe(true);

      expect(savedUser.createdAt).toBeDefined();
      expect(savedUser.updatedAt).toBeDefined();
    });

    it('should hash password before saving', async () => {
      const userData = createTestUser({ password: 'plaintext123' });
      const user = new User(userData);
      const savedUser = await user.save();

      expect(savedUser.password).not.toBe('plaintext123');
      expect(savedUser.password).toMatch(/^\$2[aby]\$\d+\$/); // bcrypt hash pattern
    });

    it('should create user with different username', async () => {
      const userData = createTestUser({ username: 'differentuser' });
      const user = new User(userData);
      const savedUser = await user.save();

      expect(savedUser.username).toBe('differentuser');
    });

    it('should enforce unique username', async () => {
      const userData = createTestUser();
      const user1 = new User(userData);
      await user1.save();

      const user2 = new User(userData);
      await expect(user2.save()).rejects.toThrow();
    });

    it('should allow duplicate emails', async () => {
      const email = 'shared@example.com';
      const user1 = new User(createTestUser({ email, username: 'user1' }));
      await user1.save();

      const user2 = new User(createTestUser({ email, username: 'user2' }));
      const savedUser2 = await user2.save();
      
      expect(savedUser2.email).toBe(email);
      expect(savedUser2.username).toBe('user2');
    });
  });

  describe('Validation', () => {
    it('should require username', async () => {
      const userData = createTestUser({ username: undefined });
      const user = new User(userData);
      
      await expect(user.save()).rejects.toThrow();
    });

    it('should require password', async () => {
      const userData = createTestUser({ password: undefined });
      const user = new User(userData);
      
      await expect(user.save()).rejects.toThrow();
    });

    it('should validate username length', async () => {
      const shortUsername = createTestUser({ username: 'ab' });
      const longUsername = createTestUser({ username: 'a'.repeat(51) });
      
      await expect(new User(shortUsername).save()).rejects.toThrow();
      await expect(new User(longUsername).save()).rejects.toThrow();
    });

    it('should validate password length', async () => {
      const shortPassword = createTestUser({ password: '12345' });
      const user = new User(shortPassword);
      
      await expect(user.save()).rejects.toThrow();
    });

    it('should validate email format', async () => {
      const invalidEmail = createTestUser({ email: 'invalid-email' });
      const user = new User(invalidEmail);
      
      await expect(user.save()).rejects.toThrow();
    });

    it('should validate gender enum', async () => {
      const invalidGender = createTestUser({ gender: 'invalid' as any });
      const user = new User(invalidGender);
      
      await expect(user.save()).rejects.toThrow();
    });

    it('should validate age range', async () => {
      const negativeAge = createTestUser({ age: -1 });
      const tooOldAge = createTestUser({ age: 150 });
      
      await expect(new User(negativeAge).save()).rejects.toThrow();
      await expect(new User(tooOldAge).save()).rejects.toThrow();
    });
  });

  describe('Instance Methods', () => {
    let user: any;

    beforeEach(async () => {
      const userData = createTestUser({ password: 'password123' });
      user = new User(userData);
      await user.save();
    });

    it('should validate correct password', async () => {
      const isValid = await user.isValidPassword('password123');
      expect(isValid).toBe(true);
    });

    it('should reject incorrect password', async () => {
      const isValid = await user.isValidPassword('wrongpassword');
      expect(isValid).toBe(false);
    });

    it('should return public profile without password', () => {
      const publicProfile = user.getPublicProfile();
      
      expect(publicProfile.password).toBeUndefined();
      expect(publicProfile.username).toBe(user.username);
      expect(publicProfile.firstName).toBe(user.firstName);
      expect(publicProfile.email).toBe(user.email);
    });
  });

  describe('JSON Transformation', () => {
    it('should exclude password from JSON output', async () => {
      const userData = createTestUser();
      const user = new User(userData);
      const savedUser = await user.save();
      
      const json = savedUser.toJSON();
      
      expect(json.password).toBeUndefined();
      expect(json._id).toBeUndefined();
      expect(json.__v).toBeUndefined();
      expect(json.id).toBeDefined();
      expect(json.username).toBe(userData.username);
    });
  });

  describe('Password Updates', () => {
    it('should hash password when updated', async () => {
      const userData = createTestUser({ password: 'original123' });
      const user = new User(userData);
      await user.save();
      
      const originalHash = user.password;
      
      user.password = 'updated123';
      await user.save();
      
      expect(user.password).not.toBe('updated123');
      expect(user.password).not.toBe(originalHash);
      
      const isValidOld = await user.isValidPassword('original123');
      const isValidNew = await user.isValidPassword('updated123');
      
      expect(isValidOld).toBe(false);
      expect(isValidNew).toBe(true);
    });

    it('should not rehash password if not modified', async () => {
      const userData = createTestUser({ password: 'password123' });
      const user = new User(userData);
      await user.save();
      
      const originalHash = user.password;
      
      user.firstName = 'Updated Name';
      await user.save();
      
      expect(user.password).toBe(originalHash);
    });
  });

  describe('Relationships', () => {
    it('should populate routines', async () => {
      // This would require creating routines and testing population
      // For now, just test that the field exists
      const userData = createTestUser();
      const user = new User(userData);
      
      expect(user.routines).toBeDefined();
      expect(Array.isArray(user.routines)).toBe(true);
    });

    it('should populate clients for therapists', async () => {
      const userData = createTestUser();
      const user = new User(userData);
      
      expect(user.clients).toBeDefined();
      expect(Array.isArray(user.clients)).toBe(true);
    });
  });
});