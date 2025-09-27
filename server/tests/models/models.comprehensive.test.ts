import mongoose from 'mongoose';
import { User, IUser } from '../../src/models/User';
import { Word, IWord } from '../../src/models/Word';
import { Routine, IRoutine } from '../../src/models/Routine';
import { Progress, IProgress } from '../../src/models/Progress';
import { getTestUser, getTestWord, getTestRoutine } from '../setup/testSetup';

describe('Data Models - Comprehensive Test Suite', () => {
  describe('User Model', () => {
    describe('Schema Validation', () => {
      it('should create user with valid data', async () => {
        const userData = {
          username: 'testuser123',
          email: 'testuser@example.com',
          firstName: 'Test',
          lastName: 'User',
          age: 25,
          gender: 'other',
          company: 'Test Company',
          isActive: true
        };

        const user = new User(userData);
        const savedUser = await user.save();

        expect(savedUser._id).toBeDefined();
        expect(savedUser.username).toBe(userData.username);
        expect(savedUser.email).toBe(userData.email);
        expect(savedUser.firstName).toBe(userData.firstName);
        expect(savedUser.lastName).toBe(userData.lastName);
        expect(savedUser.isActive).toBe(true);
        expect(savedUser.createdAt).toBeDefined();
        expect(savedUser.updatedAt).toBeDefined();
      });

      it('should require username and email', async () => {
        const user = new User({});
        
        await expect(user.save()).rejects.toThrow();
      });

      it('should enforce unique username', async () => {
        const userData = {
          username: 'duplicate_user',
          email: 'user1@example.com'
        };

        const user1 = new User(userData);
        await user1.save();

        const user2 = new User({
          ...userData,
          email: 'user2@example.com'
        });

        await expect(user2.save()).rejects.toThrow();
      });

      it('should enforce unique email', async () => {
        const userData = {
          username: 'user1',
          email: 'duplicate@example.com'
        };

        const user1 = new User(userData);
        await user1.save();

        const user2 = new User({
          username: 'user2',
          email: userData.email
        });

        await expect(user2.save()).rejects.toThrow();
      });

      it('should validate email format', async () => {
        const user = new User({
          username: 'testuser',
          email: 'invalid-email'
        });

        await expect(user.save()).rejects.toThrow();
      });

      it('should validate age range', async () => {
        const user = new User({
          username: 'testuser',
          email: 'test@example.com',
          age: -5 // Invalid age
        });

        await expect(user.save()).rejects.toThrow();
      });

      it('should validate gender enum', async () => {
        const user = new User({
          username: 'testuser',
          email: 'test@example.com',
          gender: 'invalid_gender'
        });

        await expect(user.save()).rejects.toThrow();
      });
    });

    describe('Instance Methods', () => {
      it('should get full name', async () => {
        const user = await getTestUser('therapist');
        const fullName = user?.getFullName();
        
        expect(fullName).toBe(`${user?.firstName} ${user?.lastName}`);
      });

      it('should check if user is therapist', async () => {
        const therapist = await getTestUser('therapist');
        const patient = await getTestUser('patient');
        
        expect(therapist?.isTherapist()).toBe(true);
        expect(patient?.isTherapist()).toBe(false);
      });

      it('should check if user is admin', async () => {
        const admin = await getTestUser('admin');
        const patient = await getTestUser('patient');
        
        expect(admin?.isAdmin()).toBe(true);
        expect(patient?.isAdmin()).toBe(false);
      });

      it('should get user age category', async () => {
        const user = new User({
          username: 'child_user',
          email: 'child@example.com',
          age: 8
        });

        expect(user.getAgeCategory()).toBe('child');

        user.age = 16;
        expect(user.getAgeCategory()).toBe('teen');

        user.age = 25;
        expect(user.getAgeCategory()).toBe('adult');

        user.age = 70;
        expect(user.getAgeCategory()).toBe('senior');
      });
    });

    describe('Virtual Fields', () => {
      it('should calculate routine count', async () => {
        const user = await getTestUser('therapist');
        
        // This would require populating routines
        expect(user?.routineCount).toBeDefined();
      });
    });

    describe('Middleware Hooks', () => {
      it('should update timestamps on save', async () => {
        const user = await getTestUser('patient');
        const originalUpdatedAt = user?.updatedAt;
        
        // Wait a bit to ensure timestamp difference
        await new Promise(resolve => setTimeout(resolve, 10));
        
        user!.firstName = 'Updated Name';
        await user?.save();
        
        expect(user?.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt!.getTime());
      });
    });
  });

  describe('Word Model', () => {
    describe('Schema Validation', () => {
      it('should create word with valid phonetic data', async () => {
        const wordData = {
          cmudict_id: 9999,
          wordid: 9999,
          lexeme: 'test',
          consonant: 'T',
          vowel: 'EH',
          type: 'noun',
          subtype: 'other',
          stress: 1,
          syllables: 1,
          position: 'initial',
          age_of_acquisition: 5,
          wordsXsensesXsynsets: [{
            synsetid: 1,
            wordid: 9999,
            lemma: 'test',
            casedwordid: 9999,
            senseid: 1,
            sensenum: 1,
            lexid: 1,
            tagcount: 1,
            sensekey: 'test%1:00:00::',
            pos: 'n',
            lexdomainid: 1,
            definition: 'a test word'
          }],
          score: 0,
          votes: [],
          views: 0
        };

        const word = new Word(wordData);
        const savedWord = await word.save();

        expect(savedWord._id).toBeDefined();
        expect(savedWord.lexeme).toBe('test');
        expect(savedWord.consonant).toBe('T');
        expect(savedWord.vowel).toBe('EH');
        expect(savedWord.syllables).toBe(1);
        expect(savedWord.position).toBe('initial');
      });

      it('should require essential phonetic fields', async () => {
        const word = new Word({
          lexeme: 'incomplete'
          // Missing required fields
        });

        await expect(word.save()).rejects.toThrow();
      });

      it('should validate consonant enum values', async () => {
        const word = new Word({
          cmudict_id: 9998,
          wordid: 9998,
          lexeme: 'invalid',
          consonant: 'INVALID',
          vowel: 'AE',
          type: 'noun',
          stress: 1,
          syllables: 1,
          position: 'initial',
          wordsXsensesXsynsets: []
        });

        await expect(word.save()).rejects.toThrow();
      });

      it('should validate vowel enum values', async () => {
        const word = new Word({
          cmudict_id: 9997,
          wordid: 9997,
          lexeme: 'invalid',
          consonant: 'B',
          vowel: 'INVALID',
          type: 'noun',
          stress: 1,
          syllables: 1,
          position: 'initial',
          wordsXsensesXsynsets: []
        });

        await expect(word.save()).rejects.toThrow();
      });

      it('should validate position enum values', async () => {
        const word = new Word({
          cmudict_id: 9996,
          wordid: 9996,
          lexeme: 'invalid',
          consonant: 'B',
          vowel: 'AE',
          type: 'noun',
          stress: 1,
          syllables: 1,
          position: 'invalid' as any,
          wordsXsensesXsynsets: []
        });

        await expect(word.save()).rejects.toThrow();
      });

      it('should validate syllable range', async () => {
        const word = new Word({
          cmudict_id: 9995,
          wordid: 9995,
          lexeme: 'invalid',
          consonant: 'B',
          vowel: 'AE',
          type: 'noun',
          stress: 1,
          syllables: 15, // Too many syllables
          position: 'initial',
          wordsXsensesXsynsets: []
        });

        await expect(word.save()).rejects.toThrow();
      });

      it('should enforce unique cmudict_id', async () => {
        const existingWord = await getTestWord('apple');
        
        const duplicateWord = new Word({
          cmudict_id: existingWord?.cmudict_id,
          wordid: 9994,
          lexeme: 'duplicate',
          consonant: 'B',
          vowel: 'AE',
          type: 'noun',
          stress: 1,
          syllables: 1,
          position: 'initial',
          wordsXsensesXsynsets: []
        });

        await expect(duplicateWord.save()).rejects.toThrow();
      });
    });

    describe('Instance Methods', () => {
      it('should handle voting correctly', async () => {
        const word = await getTestWord('apple');
        const user = await getTestUser('patient');
        
        const originalScore = word?.score || 0;
        
        // Upvote
        const updatedWord = await word?.vote(user!._id, 1);
        expect(updatedWord?.score).toBe(originalScore + 1);
        expect(updatedWord?.votes).toHaveLength(1);
        expect(updatedWord?.votes[0].vote).toBe(1);
        
        // Change to downvote
        const downvotedWord = await updatedWord?.vote(user!._id, -1);
        expect(downvotedWord?.score).toBe(originalScore - 1);
        expect(downvotedWord?.votes).toHaveLength(1);
        expect(downvotedWord?.votes[0].vote).toBe(-1);
        
        // Remove vote
        const neutralWord = await downvotedWord?.vote(user!._id, 0);
        expect(neutralWord?.score).toBe(originalScore);
        expect(neutralWord?.votes).toHaveLength(0);
      });

      it('should calculate upvote percentage correctly', async () => {
        const word = await getTestWord('ball');
        const user1 = await getTestUser('patient');
        const user2 = await getTestUser('therapist');
        
        // Add upvote
        await word?.vote(user1!._id, 1);
        expect(word?.getUpvotePercentage()).toBe(100);
        
        // Add downvote
        await word?.vote(user2!._id, -1);
        expect(word?.getUpvotePercentage()).toBe(50);
      });

      it('should increment views correctly', async () => {
        const word = await getTestWord('cat');
        const originalViews = word?.views || 0;
        
        const updatedWord = await word?.incrementViews();
        expect(updatedWord?.views).toBe(originalViews + 1);
      });

      it('should check therapeutic suitability', async () => {
        const word = await getTestWord('apple');
        
        // Test age appropriateness
        expect(word?.isAgeAppropriate(5)).toBe(true);
        expect(word?.isAgeAppropriate(2)).toBe(false);
        
        // Test phonetic difficulty
        expect(word?.getPhoneticDifficulty()).toBeGreaterThan(0);
      });
    });

    describe('Virtual Fields', () => {
      it('should calculate upvote percentage virtual field', async () => {
        const word = await getTestWord('apple');
        
        // Virtual field should match method result
        expect(word?.upvotePercentage).toBe(word?.getUpvotePercentage());
      });
    });

    describe('Indexes and Performance', () => {
      it('should use phonetic indexes for queries', async () => {
        // Test that phonetic queries use appropriate indexes
        const query = Word.find({
          consonant: 'B',
          vowel: 'AE',
          position: 'initial',
          syllables: 1
        });

        const explanation = await query.explain();
        
        // Should use index, not collection scan
        expect(explanation.executionStats.executionStages.stage).not.toBe('COLLSCAN');
      });
    });
  });

  describe('Routine Model', () => {
    describe('Schema Validation', () => {
      it('should create routine with valid structure', async () => {
        const therapist = await getTestUser('therapist');
        const patient = await getTestUser('patient');
        
        const routineData = {
          name: 'Test Routine',
          description: 'A test routine for validation',
          gradeLevel: '3-5',
          createdBy: therapist!._id,
          assignedUsers: [patient!._id],
          isActive: true,
          subroutine: [
            {
              id: '1',
              type: 'word_practice',
              duration: 300,
              repetitions: 10,
              phoneticConfig: {
                vowels: ['AE', 'IY'],
                consonants: ['B', 'T'],
                position: 'initial',
                syllables: [1, 2],
                gradeLevel: '3-5'
              }
            }
          ]
        };

        const routine = new Routine(routineData);
        const savedRoutine = await routine.save();

        expect(savedRoutine._id).toBeDefined();
        expect(savedRoutine.name).toBe('Test Routine');
        expect(savedRoutine.subroutine).toHaveLength(1);
        expect(savedRoutine.subroutine[0].phoneticConfig.vowels).toEqual(['AE', 'IY']);
      });

      it('should require essential fields', async () => {
        const routine = new Routine({
          description: 'Incomplete routine'
          // Missing required fields
        });

        await expect(routine.save()).rejects.toThrow();
      });

      it('should validate subroutine step structure', async () => {
        const therapist = await getTestUser('therapist');
        
        const routine = new Routine({
          name: 'Invalid Routine',
          createdBy: therapist!._id,
          subroutine: [
            {
              // Missing required fields
              type: 'word_practice'
            }
          ]
        });

        await expect(routine.save()).rejects.toThrow();
      });

      it('should validate phonetic configuration', async () => {
        const therapist = await getTestUser('therapist');
        
        const routine = new Routine({
          name: 'Invalid Phonetic Routine',
          createdBy: therapist!._id,
          subroutine: [
            {
              id: '1',
              type: 'word_practice',
              duration: 300,
              repetitions: 10,
              phoneticConfig: {
                vowels: ['INVALID_VOWEL'],
                consonants: ['B'],
                position: 'initial',
                syllables: [1],
                gradeLevel: 'K-2'
              }
            }
          ]
        });

        await expect(routine.save()).rejects.toThrow();
      });
    });

    describe('Instance Methods', () => {
      it('should calculate total duration correctly', async () => {
        const routine = await getTestRoutine('Beginner Easy Onset');
        
        const totalDuration = routine?.getTotalDuration();
        const expectedDuration = routine?.subroutine.reduce((total, step) => {
          return total + (step.duration * step.repetitions);
        }, 0);
        
        expect(totalDuration).toBe(expectedDuration);
      });

      it('should calculate step count correctly', async () => {
        const routine = await getTestRoutine('Beginner Easy Onset');
        
        const stepCount = routine?.getStepCount();
        expect(stepCount).toBe(routine?.subroutine.length);
      });

      it('should validate phonetic configuration', async () => {
        const routine = await getTestRoutine('Beginner Easy Onset');
        
        const isValid = routine?.validatePhoneticConfig();
        expect(isValid).toBe(true);
      });

      it('should get difficulty level', async () => {
        const routine = await getTestRoutine('Beginner Easy Onset');
        
        const difficulty = routine?.getDifficultyLevel();
        expect(['beginner', 'intermediate', 'advanced']).toContain(difficulty);
      });

      it('should check age appropriateness', async () => {
        const routine = await getTestRoutine('Beginner Easy Onset');
        
        expect(routine?.isAgeAppropriate(6)).toBe(true);
        expect(routine?.isAgeAppropriate(15)).toBe(false);
      });
    });

    describe('Population and References', () => {
      it('should populate created by user', async () => {
        const routine = await Routine.findOne({ name: 'Beginner Easy Onset' })
          .populate('createdBy');
        
        expect(routine?.createdBy).toBeDefined();
        expect((routine?.createdBy as any).username).toBeDefined();
      });

      it('should populate assigned users', async () => {
        const routine = await Routine.findOne({ name: 'Beginner Easy Onset' })
          .populate('assignedUsers');
        
        expect(routine?.assignedUsers).toBeDefined();
        expect(routine?.assignedUsers.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Progress Model', () => {
    describe('Schema Validation', () => {
      it('should create progress record with valid data', async () => {
        const user = await getTestUser('patient');
        const routine = await getTestRoutine('Beginner Easy Onset');
        
        const progressData = {
          userId: user!._id,
          routineId: routine!._id,
          sessionId: 'test_session_123',
          wordId: new mongoose.Types.ObjectId(),
          timestamp: new Date(),
          accuracy: 85,
          timeSpent: 3000,
          difficulty: 2,
          position: 'initial',
          consonant: 'B',
          vowel: 'AE',
          syllables: 1
        };

        const progress = new Progress(progressData);
        const savedProgress = await progress.save();

        expect(savedProgress._id).toBeDefined();
        expect(savedProgress.accuracy).toBe(85);
        expect(savedProgress.timeSpent).toBe(3000);
        expect(savedProgress.difficulty).toBe(2);
      });

      it('should require essential tracking fields', async () => {
        const progress = new Progress({
          accuracy: 85
          // Missing required fields
        });

        await expect(progress.save()).rejects.toThrow();
      });

      it('should validate accuracy range', async () => {
        const user = await getTestUser('patient');
        const routine = await getTestRoutine('Beginner Easy Onset');
        
        const progress = new Progress({
          userId: user!._id,
          routineId: routine!._id,
          sessionId: 'test_session',
          wordId: new mongoose.Types.ObjectId(),
          accuracy: 150, // Invalid accuracy > 100
          timeSpent: 1000,
          difficulty: 1
        });

        await expect(progress.save()).rejects.toThrow();
      });

      it('should validate difficulty range', async () => {
        const user = await getTestUser('patient');
        const routine = await getTestRoutine('Beginner Easy Onset');
        
        const progress = new Progress({
          userId: user!._id,
          routineId: routine!._id,
          sessionId: 'test_session',
          wordId: new mongoose.Types.ObjectId(),
          accuracy: 85,
          timeSpent: 1000,
          difficulty: 6 // Invalid difficulty > 5
        });

        await expect(progress.save()).rejects.toThrow();
      });
    });

    describe('Aggregation and Analytics', () => {
      it('should calculate user progress statistics', async () => {
        const user = await getTestUser('patient');
        
        // This would typically involve aggregation queries
        const stats = await Progress.aggregate([
          { $match: { userId: user!._id } },
          {
            $group: {
              _id: '$userId',
              averageAccuracy: { $avg: '$accuracy' },
              totalSessions: { $addToSet: '$sessionId' },
              totalWords: { $sum: 1 },
              averageTimeSpent: { $avg: '$timeSpent' }
            }
          }
        ]);

        if (stats.length > 0) {
          expect(stats[0].averageAccuracy).toBeGreaterThanOrEqual(0);
          expect(stats[0].totalWords).toBeGreaterThan(0);
        }
      });

      it('should analyze phonetic performance', async () => {
        const user = await getTestUser('patient');
        
        const phoneticStats = await Progress.aggregate([
          { $match: { userId: user!._id } },
          {
            $group: {
              _id: {
                consonant: '$consonant',
                vowel: '$vowel',
                position: '$position'
              },
              averageAccuracy: { $avg: '$accuracy' },
              frequency: { $sum: 1 }
            }
          },
          { $sort: { averageAccuracy: 1 } } // Lowest accuracy first (most difficult)
        ]);

        expect(phoneticStats).toBeInstanceOf(Array);
      });
    });
  });

  describe('Model Relationships and Integrity', () => {
    it('should maintain referential integrity', async () => {
      const therapist = await getTestUser('therapist');
      const patient = await getTestUser('patient');
      
      // Create routine
      const routine = new Routine({
        name: 'Integrity Test Routine',
        createdBy: therapist!._id,
        assignedUsers: [patient!._id],
        subroutine: [
          {
            id: '1',
            type: 'word_practice',
            duration: 300,
            repetitions: 10,
            phoneticConfig: {
              vowels: ['AE'],
              consonants: ['B'],
              position: 'initial',
              syllables: [1],
              gradeLevel: 'K-2'
            }
          }
        ]
      });

      await routine.save();

      // Verify relationships
      const savedRoutine = await Routine.findById(routine._id)
        .populate('createdBy')
        .populate('assignedUsers');

      expect((savedRoutine?.createdBy as any)._id.toString()).toBe(therapist!._id.toString());
      expect(savedRoutine?.assignedUsers).toHaveLength(1);
      expect((savedRoutine?.assignedUsers[0] as any)._id.toString()).toBe(patient!._id.toString());
    });

    it('should handle cascade operations properly', async () => {
      // This would test what happens when referenced documents are deleted
      // Implementation depends on your cascade strategy
      const user = await getTestUser('patient');
      const routineCount = await Routine.countDocuments({ assignedUsers: user!._id });
      
      expect(routineCount).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Performance and Indexing', () => {
    it('should use appropriate indexes for common queries', async () => {
      // Test user queries
      const userQuery = User.find({ username: 'therapist1' });
      const userExplanation = await userQuery.explain();
      expect(userExplanation.executionStats.executionStages.stage).not.toBe('COLLSCAN');

      // Test word phonetic queries
      const wordQuery = Word.find({ consonant: 'B', vowel: 'AE' });
      const wordExplanation = await wordQuery.explain();
      expect(wordExplanation.executionStats.executionStages.stage).not.toBe('COLLSCAN');

      // Test routine queries
      const routineQuery = Routine.find({ isActive: true });
      const routineExplanation = await routineQuery.explain();
      expect(routineExplanation.executionStats.executionStages.stage).not.toBe('COLLSCAN');
    });

    it('should handle large datasets efficiently', async () => {
      // Test query performance with limits
      const startTime = Date.now();
      
      const words = await Word.find({ syllables: { $in: [1, 2] } })
        .limit(100)
        .sort({ score: -1 });
      
      const executionTime = Date.now() - startTime;
      
      expect(executionTime).toBeLessThan(1000); // Should complete within 1 second
      expect(words.length).toBeLessThanOrEqual(100);
    });
  });
});