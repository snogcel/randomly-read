import jwt from 'jsonwebtoken';
import { User } from '../../src/models/User';
import { Routine } from '../../src/models/Routine';
import { Word } from '../../src/models/Word';
import { ExerciseSession } from '../../src/models/Progress';
import { createTestUser, createTestRoutine, createTestWord, createTestExerciseSession } from './testData';

export const generateTestJWT = (payload: any): string => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'test_secret', { expiresIn: '1h' });
};

export const createUserInDB = async (userData: any = {}) => {
  const user = new User(createTestUser(userData));
  return await user.save();
};

export const createRoutineInDB = async (createdBy: string, routineData: any = {}) => {
  const routine = new Routine(createTestRoutine(createdBy, routineData));
  return await routine.save();
};

export const createWordInDB = async (wordData: any = {}) => {
  const word = new Word(createTestWord(wordData));
  return await word.save();
};

export const createExerciseSessionInDB = async (userId: string, routineId: string, sessionData: any = {}) => {
  const session = new ExerciseSession(createTestExerciseSession(userId, routineId, sessionData));
  return await session.save();
};

export const expectValidationError = (error: any, field?: string) => {
  expect(error.name).toBe('ValidationError');
  if (field) {
    expect(error.errors[field]).toBeDefined();
  }
};

export const expectMongoError = (error: any, code?: number) => {
  expect(error.name).toMatch(/Mongo/);
  if (code) {
    expect(error.code).toBe(code);
  }
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const mockConsole = () => {
  const originalConsole = { ...console };
  
  beforeEach(() => {
    console.log = jest.fn();
    console.error = jest.fn();
    console.warn = jest.fn();
    console.info = jest.fn();
  });
  
  afterEach(() => {
    Object.assign(console, originalConsole);
  });
};

export const expectToThrowAsync = async (fn: () => Promise<any>, errorMessage?: string) => {
  let error: Error | null = null;
  
  try {
    await fn();
  } catch (e) {
    error = e as Error;
  }
  
  expect(error).not.toBeNull();
  if (errorMessage) {
    expect(error?.message).toContain(errorMessage);
  }
  
  return error;
};