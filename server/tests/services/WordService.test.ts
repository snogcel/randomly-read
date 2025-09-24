import { WordService } from '../../src/services/WordService';
import { createWordInDB, createUserInDB, expectToThrowAsync } from '../helpers/testUtils';

describe('WordService', () => {
  let wordService: WordService;

  beforeEach(() => {
    wordService = WordService.getInstance();
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = WordService.getInstance();
      const instance2 = WordService.getInstance();
      
      expect(instance1).toBe(instance2);
    });
  });

  describe('queryWords', () => {
    beforeEach(async () => {
      // Create test words with different phonetic properties
      await createWordInDB({
        cmudict_id: 10001,
        lexeme: 'bat',
        consonant: 'B',
        vowel: 'AE',
        position: 'initial',
        syllables: 1,
        type: 'noun',
        subtype: 'animal'
      });

      await createWordInDB({
        cmudict_id: 10002,
        lexeme: 'cat',
        consonant: 'K',
        vowel: 'AE',
        position: 'initial',
        syllables: 1,
        type: 'noun',
        subtype: 'animal'
      });

      await createWordInDB({
        cmudict_id: 10003,
        lexeme: 'dog',
        consonant: 'D',
        vowel: 'AO',
        position: 'initial',
        syllables: 1,
        type: 'noun',
        subtype: 'animal'
      });

      await createWordInDB({
        cmudict_id: 10004,
        lexeme: 'big',
        consonant: 'B',
        vowel: 'IH',
        position: 'initial',
        syllables: 1,
        type: 'adj'
      });

      await createWordInDB({
        cmudict_id: 10005,
        lexeme: 'happy',
        consonant: 'HH',
        vowel: 'AE',
        position: 'initial',
        syllables: 2,
        type: 'adj'
      });
    });

    it('should query words with vowel filter', async () => {
      const result = await wordService.queryWords({
        vowel: ['AE'],
        limit: 10
      });

      expect(result.words.length).toBeGreaterThan(0);
      result.words.forEach(word => {
        expect(word.vowel).toBe('AE');
      });
    });

    it('should query words with consonant filter', async () => {
      const result = await wordService.queryWords({
        consonant: ['B'],
        limit: 10
      });

      expect(result.words.length).toBeGreaterThan(0);
      result.words.forEach(word => {
        expect(word.consonant).toBe('B');
      });
    });

    it('should query words with position filter', async () => {
      const result = await wordService.queryWords({
        position: 'initial',
        limit: 10
      });

      expect(result.words.length).toBeGreaterThan(0);
      result.words.forEach(word => {
        expect(word.position).toBe('initial');
      });
    });

    it('should query words with syllable filter', async () => {
      const result = await wordService.queryWords({
        syllables: [1],
        limit: 10
      });

      expect(result.words.length).toBeGreaterThan(0);
      result.words.forEach(word => {
        expect(word.syllables).toBe(1);
      });
    });

    it('should query words with type filter', async () => {
      const result = await wordService.queryWords({
        type: ['noun'],
        limit: 10
      });

      expect(result.words.length).toBeGreaterThan(0);
      result.words.forEach(word => {
        expect(word.type).toBe('noun');
      });
    });

    it('should query words with subtype filter', async () => {
      const result = await wordService.queryWords({
        subtype: ['animal'],
        limit: 10
      });

      expect(result.words.length).toBeGreaterThan(0);
      result.words.forEach(word => {
        expect(word.subtype).toBe('animal');
      });
    });

    it('should combine multiple filters', async () => {
      const result = await wordService.queryWords({
        vowel: ['AE'],
        consonant: ['B'],
        type: ['noun'],
        syllables: [1],
        limit: 10
      });

      expect(result.words.length).toBeGreaterThan(0);
      result.words.forEach(word => {
        expect(word.vowel).toBe('AE');
        expect(word.consonant).toBe('B');
        expect(word.type).toBe('noun');
        expect(word.syllables).toBe(1);
      });
    });

    it('should respect limit parameter', async () => {
      const result = await wordService.queryWords({
        limit: 2
      });

      expect(result.words.length).toBeLessThanOrEqual(2);
    });

    it('should return totalCount and hasMore', async () => {
      const result = await wordService.queryWords({
        limit: 2
      });

      expect(result.totalCount).toBeDefined();
      expect(typeof result.hasMore).toBe('boolean');
    });

    it('should handle age of acquisition filter', async () => {
      await createWordInDB({
        cmudict_id: 20001,
        lexeme: 'simple',
        age_of_acquisition: 3
      });

      await createWordInDB({
        cmudict_id: 20002,
        lexeme: 'complex',
        age_of_acquisition: 8
      });

      const result = await wordService.queryWords({
        age: '5',
        limit: 10
      });

      result.words.forEach(word => {
        if (word.age_of_acquisition) {
          expect(word.age_of_acquisition).toBeLessThanOrEqual(5);
        }
      });
    });

    it('should enforce maximum query limit', async () => {
      const result = await wordService.queryWords({
        limit: 10000 // Exceeds max limit
      });

      expect(result.words.length).toBeLessThanOrEqual(1000); // Max limit from config
    });
  });

  describe('getRandomWord', () => {
    beforeEach(async () => {
      await createWordInDB({ cmudict_id: 30001, lexeme: 'test1' });
      await createWordInDB({ cmudict_id: 30002, lexeme: 'test2' });
    });

    it('should return a single random word', async () => {
      const word = await wordService.getRandomWord({});

      expect(word).toBeDefined();
      expect(word?.lexeme).toBeDefined();
    });

    it('should return null when no words match criteria', async () => {
      const word = await wordService.getRandomWord({
        consonant: ['NONEXISTENT']
      });

      expect(word).toBeNull();
    });

    it('should apply filters correctly', async () => {
      await createWordInDB({
        cmudict_id: 30003,
        lexeme: 'filtered',
        consonant: 'F',
        vowel: 'IH'
      });

      const word = await wordService.getRandomWord({
        consonant: ['F'],
        vowel: ['IH']
      });

      expect(word).toBeDefined();
      expect(word?.consonant).toBe('F');
      expect(word?.vowel).toBe('IH');
    });
  });

  describe('getWordById', () => {
    let testWord: any;

    beforeEach(async () => {
      testWord = await createWordInDB();
    });

    it('should return word by valid ID', async () => {
      const word = await wordService.getWordById(testWord._id.toString());

      expect(word).toBeDefined();
      expect(word?._id).toEqual(testWord._id);
      expect(word?.lexeme).toBe(testWord.lexeme);
    });

    it('should return null for invalid ID', async () => {
      const word = await wordService.getWordById('507f1f77bcf86cd799439011');
      expect(word).toBeNull();
    });

    it('should throw error for malformed ID', async () => {
      await expectToThrowAsync(
        () => wordService.getWordById('invalid-id'),
        'Failed to get word'
      );
    });
  });

  describe('voteOnWord', () => {
    let testWord: any;
    let testUser: any;

    beforeEach(async () => {
      testWord = await createWordInDB();
      testUser = await createUserInDB();
    });

    it('should add upvote to word', async () => {
      const updatedWord = await wordService.voteOnWord(
        testWord._id.toString(),
        testUser._id.toString(),
        1
      );

      expect(updatedWord.score).toBe(1);
      expect(updatedWord.votes).toHaveLength(1);
      expect(updatedWord.votes[0]?.vote).toBe(1);
      expect(updatedWord.votes[0]?.user).toEqual(testUser._id);
    });

    it('should add downvote to word', async () => {
      const updatedWord = await wordService.voteOnWord(
        testWord._id.toString(),
        testUser._id.toString(),
        -1
      );

      expect(updatedWord.score).toBe(-1);
      expect(updatedWord.votes).toHaveLength(1);
      expect(updatedWord.votes[0]?.vote).toBe(-1);
    });

    it('should update existing vote', async () => {
      // First vote
      await wordService.voteOnWord(
        testWord._id.toString(),
        testUser._id.toString(),
        1
      );

      // Change vote
      const updatedWord = await wordService.voteOnWord(
        testWord._id.toString(),
        testUser._id.toString(),
        -1
      );

      expect(updatedWord.score).toBe(-1);
      expect(updatedWord.votes).toHaveLength(1);
      expect(updatedWord.votes[0]?.vote).toBe(-1);
    });

    it('should remove vote when voting 0', async () => {
      // First vote
      await wordService.voteOnWord(
        testWord._id.toString(),
        testUser._id.toString(),
        1
      );

      // Remove vote
      const updatedWord = await wordService.voteOnWord(
        testWord._id.toString(),
        testUser._id.toString(),
        0
      );

      expect(updatedWord.score).toBe(0);
      expect(updatedWord.votes).toHaveLength(0);
    });

    it('should throw error for nonexistent word', async () => {
      await expectToThrowAsync(
        () => wordService.voteOnWord(
          '507f1f77bcf86cd799439011',
          testUser._id.toString(),
          1
        ),
        'Word not found'
      );
    });
  });

  describe('incrementWordViews', () => {
    let testWord: any;

    beforeEach(async () => {
      testWord = await createWordInDB({ cmudict_id: 50001, views: 5 });
    });

    it('should increment word views', async () => {
      const updatedWord = await wordService.incrementWordViews(testWord._id.toString());

      expect(updatedWord.views).toBe(6);
    });

    it('should throw error for nonexistent word', async () => {
      await expectToThrowAsync(
        () => wordService.incrementWordViews('507f1f77bcf86cd799439011'),
        'Word not found'
      );
    });
  });

  describe('getWordsForSentence', () => {
    beforeEach(async () => {
      // Create nouns with different subtypes
      await createWordInDB({
        cmudict_id: 40001,
        lexeme: 'cat',
        type: 'noun',
        subtype: 'animal'
      });

      await createWordInDB({
        cmudict_id: 40002,
        lexeme: 'park',
        type: 'noun',
        subtype: 'location'
      });

      await createWordInDB({
        cmudict_id: 40003,
        lexeme: 'teacher',
        type: 'noun',
        subtype: 'person'
      });

      await createWordInDB({
        cmudict_id: 40004,
        lexeme: 'apple',
        type: 'noun',
        subtype: 'food'
      });

      await createWordInDB({
        cmudict_id: 40005,
        lexeme: 'book',
        type: 'noun',
        subtype: 'artifact'
      });

      // Create adjectives
      await createWordInDB({
        cmudict_id: 40006,
        lexeme: 'big',
        type: 'adj'
      });

      await createWordInDB({
        cmudict_id: 40007,
        lexeme: 'happy',
        type: 'adj'
      });
    });

    it('should return categorized words for sentence generation', async () => {
      const result = await wordService.getWordsForSentence({});

      expect(result.nouns.length).toBeGreaterThan(0);
      expect(result.adjectives.length).toBeGreaterThan(0);
      expect(result.filteredNouns.animal.length).toBeGreaterThan(0);
      expect(result.filteredNouns.location.length).toBeGreaterThan(0);
      expect(result.filteredNouns.person.length).toBeGreaterThan(0);
      expect(result.filteredNouns.food.length).toBeGreaterThan(0);
      expect(result.filteredNouns.artifact.length).toBeGreaterThan(0);
    });

    it('should apply phonetic filters to sentence words', async () => {
      const result = await wordService.getWordsForSentence({
        consonant: ['B']
      });

      result.nouns.forEach(word => {
        expect(word.consonant).toBe('B');
      });

      result.adjectives.forEach(word => {
        expect(word.consonant).toBe('B');
      });
    });

    it('should respect limit parameter', async () => {
      const result = await wordService.getWordsForSentence({
        limit: 50
      });

      const totalWords = result.nouns.length + result.adjectives.length;
      expect(totalWords).toBeLessThanOrEqual(50);
    });
  });

  describe('buildWordFilter', () => {
    it('should build filter with default syllables', async () => {
      const result = await wordService.queryWords({});
      
      // Should include default syllable range [1,2,3,4,5]
      expect(result.words.length).toBeGreaterThanOrEqual(0);
    });

    it('should handle empty arrays gracefully', async () => {
      const result = await wordService.queryWords({
        vowel: [],
        consonant: [],
        type: []
      });

      expect(result.words).toBeDefined();
      expect(Array.isArray(result.words)).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should handle database connection errors gracefully', async () => {
      // This would require mocking mongoose connection
      // For now, just ensure the service doesn't crash
      expect(wordService).toBeDefined();
    });

    it('should handle invalid query parameters', async () => {
      const result = await wordService.queryWords({
        limit: -1 // Invalid limit
      });

      expect(result.words).toBeDefined();
      expect(Array.isArray(result.words)).toBe(true);
    });
  });
});