import { Routine } from '../../src/models/Routine';
import { User } from '../../src/models/User';
import { createTestRoutine, createTestUser, createTestSubroutineStep } from '../helpers/testData';
import { createUserInDB } from '../helpers/testUtils';

describe('Routine Model', () => {
  let testUser: any;

  beforeEach(async () => {
    testUser = await createUserInDB();
  });

  describe('Routine Creation', () => {
    it('should create a valid routine', async () => {
      const routineData = createTestRoutine(testUser._id);
      const routine = new Routine(routineData);
      const savedRoutine = await routine.save();

      expect(savedRoutine._id).toBeDefined();
      expect(savedRoutine.name).toBe(routineData.name);
      expect(savedRoutine.description).toBe(routineData.description);
      expect(savedRoutine.gradeLevel).toBe(routineData.gradeLevel);
      expect(savedRoutine.createdBy).toEqual(testUser._id);
      expect(savedRoutine.isActive).toBe(true);
      expect(savedRoutine.subroutine).toHaveLength(1);
      expect(savedRoutine.createdAt).toBeDefined();
      expect(savedRoutine.updatedAt).toBeDefined();
    });

    it('should create routine with multiple steps', async () => {
      const step1 = createTestSubroutineStep({ id: 'step-1', type: 'word' });
      const step2 = createTestSubroutineStep({ id: 'step-2', type: 'sentence' });
      const step3 = createTestSubroutineStep({ 
        id: 'step-3', 
        type: 'intermission',
        phoneticConfig: undefined,
        intermissionText: 'Take a break'
      });

      const routineData = createTestRoutine(testUser._id, {
        subroutine: [step1, step2, step3]
      });

      const routine = new Routine(routineData);
      const savedRoutine = await routine.save();

      expect(savedRoutine.subroutine).toHaveLength(3);
      expect(savedRoutine.subroutine[0].type).toBe('word');
      expect(savedRoutine.subroutine[1].type).toBe('sentence');
      expect(savedRoutine.subroutine[2].type).toBe('intermission');
      expect(savedRoutine.subroutine[2].intermissionText).toBe('Take a break');
    });
  });

  describe('Validation', () => {
    it('should require name', async () => {
      const routineData = createTestRoutine(testUser._id, { name: undefined });
      const routine = new Routine(routineData);
      
      await expect(routine.save()).rejects.toThrow();
    });

    it('should require createdBy', async () => {
      const routineData = createTestRoutine(undefined as any);
      const routine = new Routine(routineData);
      
      await expect(routine.save()).rejects.toThrow();
    });

    it('should require subroutine array', async () => {
      const routineData = createTestRoutine(testUser._id, { subroutine: undefined });
      const routine = new Routine(routineData);
      
      await expect(routine.save()).rejects.toThrow();
    });

    it('should validate name length', async () => {
      const longName = 'a'.repeat(101);
      const routineData = createTestRoutine(testUser._id, { name: longName });
      const routine = new Routine(routineData);
      
      await expect(routine.save()).rejects.toThrow();
    });

    it('should validate description length', async () => {
      const longDescription = 'a'.repeat(501);
      const routineData = createTestRoutine(testUser._id, { description: longDescription });
      const routine = new Routine(routineData);
      
      await expect(routine.save()).rejects.toThrow();
    });

    it('should validate grade level enum', async () => {
      const invalidGrade = createTestRoutine(testUser._id, { gradeLevel: 'invalid' });
      const routine = new Routine(invalidGrade);
      
      await expect(routine.save()).rejects.toThrow();
    });

    it('should validate subroutine step count', async () => {
      const tooManySteps = Array(51).fill(null).map((_, i) => 
        createTestSubroutineStep({ id: `step-${i}` })
      );
      
      const routineData = createTestRoutine(testUser._id, { subroutine: tooManySteps });
      const routine = new Routine(routineData);
      
      await expect(routine.save()).rejects.toThrow();
    });
  });

  describe('Subroutine Step Validation', () => {
    it('should validate step type enum', async () => {
      const invalidStep = createTestSubroutineStep({ type: 'invalid' as any });
      const routineData = createTestRoutine(testUser._id, { subroutine: [invalidStep] });
      const routine = new Routine(routineData);
      
      await expect(routine.save()).rejects.toThrow();
    });

    it('should validate duration range', async () => {
      const invalidDuration = createTestSubroutineStep({ duration: 0 });
      const routineData = createTestRoutine(testUser._id, { subroutine: [invalidDuration] });
      const routine = new Routine(routineData);
      
      await expect(routine.save()).rejects.toThrow();
    });

    it('should validate repetitions range', async () => {
      const invalidReps = createTestSubroutineStep({ repetitions: 0 });
      const routineData = createTestRoutine(testUser._id, { subroutine: [invalidReps] });
      const routine = new Routine(routineData);
      
      await expect(routine.save()).rejects.toThrow();
    });

    it('should require phoneticConfig for word/sentence steps', async () => {
      const stepWithoutConfig = createTestSubroutineStep({ 
        type: 'word',
        phoneticConfig: undefined 
      });
      const routineData = createTestRoutine(testUser._id, { subroutine: [stepWithoutConfig] });
      const routine = new Routine(routineData);
      
      await expect(routine.save()).rejects.toThrow();
    });

    it('should require intermissionText for intermission steps', async () => {
      const stepWithoutText = createTestSubroutineStep({ 
        type: 'intermission',
        phoneticConfig: undefined,
        intermissionText: undefined 
      });
      const routineData = createTestRoutine(testUser._id, { subroutine: [stepWithoutText] });
      const routine = new Routine(routineData);
      
      await expect(routine.save()).rejects.toThrow();
    });
  });

  describe('Phonetic Configuration Validation', () => {
    it('should validate vowel enum values', async () => {
      const invalidVowels = createTestSubroutineStep({
        phoneticConfig: {
          vowels: ['INVALID'],
          consonants: ['B'],
          position: 'initial',
          syllables: [1],
          gradeLevel: 'K'
        }
      });
      const routineData = createTestRoutine(testUser._id, { subroutine: [invalidVowels] });
      const routine = new Routine(routineData);
      
      await expect(routine.save()).rejects.toThrow();
    });

    it('should validate consonant enum values', async () => {
      const invalidConsonants = createTestSubroutineStep({
        phoneticConfig: {
          vowels: ['AA'],
          consonants: ['INVALID'],
          position: 'initial',
          syllables: [1],
          gradeLevel: 'K'
        }
      });
      const routineData = createTestRoutine(testUser._id, { subroutine: [invalidConsonants] });
      const routine = new Routine(routineData);
      
      await expect(routine.save()).rejects.toThrow();
    });

    it('should validate position enum', async () => {
      const invalidPosition = createTestSubroutineStep({
        phoneticConfig: {
          vowels: ['AA'],
          consonants: ['B'],
          position: 'invalid' as any,
          syllables: [1],
          gradeLevel: 'K'
        }
      });
      const routineData = createTestRoutine(testUser._id, { subroutine: [invalidPosition] });
      const routine = new Routine(routineData);
      
      await expect(routine.save()).rejects.toThrow();
    });

    it('should validate syllable range', async () => {
      const invalidSyllables = createTestSubroutineStep({
        phoneticConfig: {
          vowels: ['AA'],
          consonants: ['B'],
          position: 'initial',
          syllables: [0, 11], // Invalid range
          gradeLevel: 'K'
        }
      });
      const routineData = createTestRoutine(testUser._id, { subroutine: [invalidSyllables] });
      const routine = new Routine(routineData);
      
      await expect(routine.save()).rejects.toThrow();
    });
  });

  describe('Instance Methods', () => {
    let routine: any;

    beforeEach(async () => {
      const step1 = createTestSubroutineStep({ duration: 30, repetitions: 5 });
      const step2 = createTestSubroutineStep({ duration: 45, repetitions: 3 });
      
      const routineData = createTestRoutine(testUser._id, {
        subroutine: [step1, step2]
      });
      
      routine = new Routine(routineData);
      await routine.save();
    });

    it('should calculate total duration correctly', () => {
      const totalDuration = routine.getTotalDuration();
      // (30 * 5) + (45 * 3) = 150 + 135 = 285
      expect(totalDuration).toBe(285);
    });

    it('should return correct step count', () => {
      const stepCount = routine.getStepCount();
      expect(stepCount).toBe(2);
    });

    it('should validate steps correctly', () => {
      const isValid = routine.validateSteps();
      expect(isValid).toBe(true);
    });

    it('should detect invalid steps', async () => {
      const invalidStep = createTestSubroutineStep({ 
        type: 'intermission',
        phoneticConfig: undefined,
        intermissionText: undefined 
      });
      
      routine.subroutine.push(invalidStep);
      
      const isValid = routine.validateSteps();
      expect(isValid).toBe(false);
    });
  });

  describe('JSON Transformation', () => {
    it('should exclude internal fields from JSON output', async () => {
      const routineData = createTestRoutine(testUser._id);
      const routine = new Routine(routineData);
      const savedRoutine = await routine.save();
      
      const json = savedRoutine.toJSON();
      
      expect(json._id).toBeUndefined();
      expect(json.__v).toBeUndefined();
      expect(json.id).toBeDefined();
      expect(json.name).toBe(routineData.name);
      expect(json.subroutine).toBeDefined();
    });
  });

  describe('Population', () => {
    it('should populate createdBy user', async () => {
      const routineData = createTestRoutine(testUser._id);
      const routine = new Routine(routineData);
      const savedRoutine = await routine.save();
      
      const populatedRoutine = await Routine.findById(savedRoutine._id)
        .populate('createdBy', 'username firstName lastName');
      
      expect(populatedRoutine?.createdBy).toBeDefined();
      expect((populatedRoutine?.createdBy as any).username).toBe(testUser.username);
    });

    it('should populate assignedUsers', async () => {
      const assignedUser = await createUserInDB({ username: 'assigned' });
      
      const routineData = createTestRoutine(testUser._id, {
        assignedUsers: [assignedUser._id]
      });
      
      const routine = new Routine(routineData);
      const savedRoutine = await routine.save();
      
      const populatedRoutine = await Routine.findById(savedRoutine._id)
        .populate('assignedUsers', 'username firstName lastName');
      
      expect(populatedRoutine?.assignedUsers).toHaveLength(1);
      expect((populatedRoutine?.assignedUsers[0] as any).username).toBe('assigned');
    });
  });
});