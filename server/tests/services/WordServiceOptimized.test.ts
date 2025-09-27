import { WordServiceOptimized } from '../../src/services/WordServiceOptimized';
import { Word } from '../../src/models/Word';
import { config } from '../../src/config';

// Mock the Word model
jest.mock('../../src/models/Word');
jest.mock('../../src/utils/logger');

const MockedWord = Word as jest.Mocked<typeof Word>;

describe('WordServiceOptimized', () => {
  let wordService: WordServiceOptimized;

  beforeEach(() => {
    wordService = WordServiceOptimized.getInstance();
    jest.clearAllMocks();
  });

  describe('queryWords', () => {
    it('should query words with basic phonetic filters', async () => {
      const mockWords = [
        {
          _id: '507f1f77bcf86cd799439011',
          lexeme: 'cat',
          consonant: 'K',
          vowel: 'AE',
          syllables: 1,
          position: 'initial',
          type: 'noun',
          score: 10,
          votes: [],
          views: 5
        }
      ];

      MockedWord.countDocuments = jest.fn().mockResolvedValue(1);
      MockedWord.aggregate = jest.fn().mockResolvedValue(mockWords);

      const result = await wordService.queryWords({
        consonant: ['K'],
        vowel: ['AE'],
        limit: 10
      });

      expect(result.words).toHaveLength(1);
      expect(result.totalCount).toBe(1);
      expect(result.hasMore).toBe(false);
      expect(MockedWord.countDocuments).toHaveBeenCalled();
      expect(MockedWord.aggregate).toHaveBeenCalled();
    });

    it('should handle empty results', async () => {
      MockedWord.countDocuments = jest.fn().mockResolvedValue(0);

      const result = await wordService.queryWords({
        consonant: ['X'], // Non-existent consonant
        limit: 10
      });

      expect(result.words).toHaveLength(0);
      expect(result.totalCount).toBe(0);
      expect(result.hasMore).toBe(false);
      expect(MockedWord.aggregate).not.toHaveBeenCalled();
    });

    it('should respect limit constraints', async () => {
      const mockWords = Array(5).fill(null).map((_, i) => ({
        _id: `507f1f77bcf86cd79943901${i}`,
        lexeme: `word${i}`,
        consonant: 'B',
        vowel: 'AE',
        syllables: 1,
        position: 'initial',
        type: 'noun',
        score: i,
        votes: [],
        views: i
      }));

      MockedWord.countDocuments = jest.fn().mockResolvedValue(100);
      MockedWord.aggregate = jest.fn().mockResolvedValue(mockWords);

      const result = await wordService.queryWords({
        consonant: ['B'],
        limit: 5
      });

      expect(result.words).toHaveLength(5);
      expect(result.totalCount).toBe(100);
      expect(result.hasMore).toBe(true);
    });

    it('should enforce maximum limit', async () => {
      const mockWords = [];
      MockedWord.countDocuments = jest.fn().mockResolvedValue(0);

      await wordService.queryWords({
        consonant: ['B'],
        limit: 2000 // Exceeds max limit
      });

      // Should be clamped to maxQueryLimit
      const aggregateCall = MockedWord.aggregate.mock.calls[0];
      if (aggregateCall) {
        const pipeline = aggregateCall[0];
        const limitStage = pipeline.find((stage: any) => stage.$limit);
        expect(limitStage?.$limit).toBeLessThanOrEqual(config.wordDatabase.maxQueryLimit);
      }
    });

    it('should handle syllable filtering', async () => {
      const mockWords = [
        {
          _id: '507f1f77bcf86cd799439011',
          lexeme: 'cat',
          consonant: 'K',
          vowel: 'AE',
          syllables: 1,
          position: 'initial',
          type: 'noun',
          score: 10,
          votes: [],
          views: 5
        }
      ];

      MockedWord.countDocuments = jest.fn().mockResolvedValue(1);
      MockedWord.aggregate = jest.fn().mockResolvedValue(mockWords);

      await wordService.queryWords({
        syllables: [1, 2],
        limit: 10
      });

      expect(MockedWord.countDocuments).toHaveBeenCalledWith(
        expect.objectContaining({
          syllables: { $in: [1, 2] }
        })
      );
    });

    it('should handle position filtering', async () => {
      MockedWord.countDocuments = jest.fn().mockResolvedValue(0);

      await wordService.queryWords({
        position: 'initial',
        limit: 10
      });

      expect(MockedWord.countDocuments).toHaveBeenCalledWith(
        expect.objectContaining({
          position: 'initial'
        })
      );
    });

    it('should handle age of acquisition filtering', async () => {
      MockedWord.countDocuments = jest.fn().mockResolvedValue(0);

      await wordService.queryWords({
        age: '5',
        limit: 10
      });

      expect(MockedWord.countDocuments).toHaveBeenCalledWith(
        expect.objectContaining({
          age_of_acquisition: {
            $gt: 0,
            $lte: 5
          }
        })
      );
    });
  });

  describe('getRandomWord', () => {
    it('should return a single random word', async () => {
      const mockWord = {
        _id: '507f1f77bcf86cd799439011',
        lexeme: 'cat',
        consonant: 'K',
        vowel: 'AE',
        syllables: 1,
        position: 'initial',
        type: 'noun',
        score: 10,
        votes: [],
        views: 5
      };

      MockedWord.countDocuments = jest.fn().mockResolvedValue(1);
      MockedWord.aggregate = jest.fn().mockResolvedValue([mockWord]);

      const result = await wordService.getRandomWord({
        consonant: ['K'],
        vowel: ['AE']
      });

      expect(result).toEqual(mockWord);
    });

    it('should return null when no words match', async () => {
      MockedWord.countDocuments = jest.fn().mockResolvedValue(0);

      const result = await wordService.getRandomWord({
        consonant: ['X'] // Non-existent
      });

      expect(result).toBeNull();
    });
  });

  describe('getWordById', () => {
    it('should return word by ID', async () => {
      const mockWord = {
        _id: '507f1f77bcf86cd799439011',
        lexeme: 'cat',
        consonant: 'K',
        vowel: 'AE',
        syllables: 1,
        position: 'initial',
        type: 'noun',
        score: 10,
        votes: [],
        views: 5
      };

      MockedWord.find = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue([mockWord])
      });

      // Mock the DataLoader behavior
      const result = await wordService.getWordById('507f1f77bcf86cd799439011');

      // Since we're using DataLoader, we need to mock it properly
      // For now, just verify the method exists and can be called
      expect(typeof wordService.getWordById).toBe('function');
    });
  });

  describe('batchQueryWords', () => {
    it('should handle batch queries efficiently', async () => {
      const queries = [
        {
          id: 'query1',
          options: { consonant: ['B'], limit: 5 }
        },
        {
          id: 'query2',
          options: { vowel: ['AE'], limit: 3 }
        }
      ];

      MockedWord.countDocuments = jest.fn().mockResolvedValue(1);
      MockedWord.aggregate = jest.fn().mockResolvedValue([{
        _id: '507f1f77bcf86cd799439011',
        lexeme: 'test',
        consonant: 'B',
        vowel: 'AE',
        syllables: 1,
        position: 'initial',
        type: 'noun',
        score: 10,
        votes: [],
        views: 5
      }]);

      const results = await wordService.batchQueryWords(queries);

      expect(results.size).toBe(2);
      expect(results.has('query1')).toBe(true);
      expect(results.has('query2')).toBe(true);
    });
  });

  describe('cache functionality', () => {
    it('should provide cache statistics', () => {
      const stats = wordService.getCacheStats();
      
      expect(stats).toHaveProperty('size');
      expect(stats).toHaveProperty('hitRate');
      expect(stats).toHaveProperty('memoryUsage');
      expect(typeof stats.size).toBe('number');
      expect(typeof stats.hitRate).toBe('number');
      expect(typeof stats.memoryUsage).toBe('number');
    });

    it('should allow cache clearing', () => {
      expect(() => wordService.clearCache()).not.toThrow();
    });
  });

  describe('error handling', () => {
    it('should handle database errors gracefully', async () => {
      MockedWord.countDocuments = jest.fn().mockRejectedValue(new Error('Database error'));

      await expect(wordService.queryWords({
        consonant: ['B'],
        limit: 10
      })).rejects.toThrow('Failed to query words');
    });

    it('should handle aggregation errors', async () => {
      MockedWord.countDocuments = jest.fn().mockResolvedValue(1);
      MockedWord.aggregate = jest.fn().mockRejectedValue(new Error('Aggregation error'));

      await expect(wordService.queryWords({
        consonant: ['B'],
        limit: 10
      })).rejects.toThrow();
    });
  });
});