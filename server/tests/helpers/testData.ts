import { IUser } from '../../src/models/User';
import { IRoutine, ISubroutineStep } from '../../src/models/Routine';
import { IWord } from '../../src/models/Word';
import { IExerciseSession, IWordAttempt } from '../../src/models/Progress';

export const createTestUser = (overrides: Partial<IUser> = {}): Partial<IUser> => ({
  username: 'testuser',
  password: 'password123',
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  isActive: true,
  admin: false,
  superuser: false,
  ...overrides
});

export const createTestAdmin = (overrides: Partial<IUser> = {}): Partial<IUser> => ({
  ...createTestUser(),
  username: 'admin',
  admin: true,
  ...overrides
});

export const createTestSuperuser = (overrides: Partial<IUser> = {}): Partial<IUser> => ({
  ...createTestUser(),
  username: 'superuser',
  superuser: true,
  ...overrides
});

export const createTestSubroutineStep = (overrides: Partial<ISubroutineStep> = {}): ISubroutineStep => ({
  id: 'step-1',
  type: 'word',
  duration: 30,
  repetitions: 5,
  phoneticConfig: {
    vowels: ['AA', 'AE'],
    consonants: ['B', 'D'],
    position: 'initial',
    syllables: [1, 2],
    gradeLevel: 'K'
  },
  ...overrides
});

export const createTestRoutine = (createdBy: string, overrides: Partial<IRoutine> = {}): Partial<IRoutine> => ({
  name: 'Test Routine',
  description: 'A test routine for unit testing',
  gradeLevel: 'K',
  subroutine: [createTestSubroutineStep()],
  createdBy,
  assignedUsers: [],
  isActive: true,
  ...overrides
});

export const createTestWord = (overrides: Partial<IWord> = {}): Partial<IWord> => ({
  cmudict_id: 12345,
  wordid: 1,
  lexeme: 'test',
  consonant: 'T',
  vowel: 'EH',
  type: 'noun',
  subtype: 'all',
  stress: 1,
  syllables: 1,
  position: 'initial',
  age_of_acquisition: 5,
  wordsXsensesXsynsets: [{
    synsetid: 1,
    wordid: 1,
    lemma: 'test',
    casedwordid: 1,
    senseid: 1,
    sensenum: 1,
    lexid: 1,
    tagcount: 10,
    sensekey: 'test%1:10:00::',
    pos: 'n',
    lexdomainid: 1,
    definition: 'A procedure for critical evaluation'
  }],
  score: 0,
  votes: [],
  views: 0,
  ...overrides
});

export const createTestWordAttempt = (wordId: string, overrides: Partial<IWordAttempt> = {}): IWordAttempt => ({
  wordId: wordId as any,
  word: 'test',
  timestamp: new Date(),
  accuracy: 85,
  timeSpent: 2500,
  difficulty: 3,
  position: 'initial',
  consonant: 'T',
  vowel: 'EH',
  ...overrides
});

export const createTestExerciseSession = (userId: string, routineId: string, overrides: Partial<IExerciseSession> = {}): Partial<IExerciseSession> => ({
  userId: userId as any,
  routineId: routineId as any,
  sessionId: 'test-session-123',
  startTime: new Date(),
  wordsAttempted: [],
  totalWords: 10,
  completedWords: 0,
  accuracy: 0,
  completionRate: 0,
  difficultWords: [],
  ...overrides
});

export const mockJWTPayload = {
  userId: 'test-user-id',
  username: 'testuser',
  admin: false,
  superuser: false,
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 days
};