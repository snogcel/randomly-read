import { PhoneticFilterOptimizer, PhoneticFilter } from '../../src/utils/phoneticFiltering';

describe('PhoneticFilterOptimizer', () => {
  let optimizer: PhoneticFilterOptimizer;

  beforeEach(() => {
    optimizer = PhoneticFilterOptimizer.getInstance();
  });

  describe('validateFilter', () => {
    it('should validate correct phonetic filters', () => {
      const filter: PhoneticFilter = {
        vowels: ['AE', 'IY'],
        consonants: ['B', 'T'],
        position: 'initial',
        syllables: [1, 2],
        gradeLevel: '5'
      };

      const result = optimizer.validateFilter(filter);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect invalid vowel sounds', () => {
      const filter: PhoneticFilter = {
        vowels: ['AE', 'INVALID'],
        consonants: ['B']
      };

      const result = optimizer.validateFilter(filter);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid vowel sounds: INVALID');
    });

    it('should detect invalid consonant sounds', () => {
      const filter: PhoneticFilter = {
        vowels: ['AE'],
        consonants: ['B', 'INVALID']
      };

      const result = optimizer.validateFilter(filter);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid consonant sounds: INVALID');
    });

    it('should detect invalid position', () => {
      const filter: PhoneticFilter = {
        position: 'invalid' as any
      };

      const result = optimizer.validateFilter(filter);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid position: invalid. Must be initial, medial, or final');
    });

    it('should detect invalid syllable counts', () => {
      const filter: PhoneticFilter = {
        syllables: [0, 11, -1]
      };

      const result = optimizer.validateFilter(filter);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid syllable counts: 0, 11, -1. Must be integers between 1 and 10');
    });

    it('should warn about large selections', () => {
      const filter: PhoneticFilter = {
        vowels: ['AA', 'AE', 'AH', 'AO', 'AW', 'AY', 'EH', 'ER', 'EY', 'IH', 'IY', 'OW'], // 12 vowels
        consonants: Array(20).fill('B') // Large consonant array
      };

      const result = optimizer.validateFilter(filter);

      expect(result.warnings.length).toBeGreaterThan(0);
      expect(result.optimizations.length).toBeGreaterThan(0);
    });
  });

  describe('optimizeFilter', () => {
    it('should optimize large vowel selections', () => {
      const filter: PhoneticFilter = {
        vowels: ['AA', 'AE', 'AH', 'AO', 'AW', 'AY', 'EH', 'ER', 'EY', 'IH', 'IY', 'OW', 'OY', 'UH', 'UW'], // All vowels
        consonants: ['B']
      };

      const optimized = optimizer.optimizeFilter(filter);

      expect(optimized.vowels!.length).toBeLessThanOrEqual(7);
      expect(optimized.consonants).toEqual(['B']); // Should remain unchanged
    });

    it('should optimize large consonant selections', () => {
      const filter: PhoneticFilter = {
        vowels: ['AE'],
        consonants: ['B', 'CH', 'D', 'DH', 'F', 'G', 'HH', 'JH', 'K', 'L', 'M', 'N', 'NG', 'P', 'R'] // 15 consonants
      };

      const optimized = optimizer.optimizeFilter(filter);

      expect(optimized.consonants!.length).toBeLessThanOrEqual(10);
      expect(optimized.vowels).toEqual(['AE']); // Should remain unchanged
    });

    it('should add default syllable range', () => {
      const filter: PhoneticFilter = {
        vowels: ['AE'],
        consonants: ['B']
      };

      const optimized = optimizer.optimizeFilter(filter);

      expect(optimized.syllables).toEqual([1, 2, 3]);
    });

    it('should add default type filter', () => {
      const filter: PhoneticFilter = {
        vowels: ['AE'],
        consonants: ['B']
      };

      const optimized = optimizer.optimizeFilter(filter);

      expect(optimized.type).toEqual(['noun', 'verb', 'adj']);
    });
  });

  describe('buildOptimizedMongoFilter', () => {
    it('should build correct MongoDB filter', () => {
      const filter: PhoneticFilter = {
        vowels: ['AE', 'IY'],
        consonants: ['B', 'T'],
        position: 'initial',
        syllables: [1, 2],
        gradeLevel: '5'
      };

      const result = optimizer.buildOptimizedMongoFilter(filter);

      expect(result.mongoFilter).toEqual({
        consonant: { $in: ['B', 'T'] },
        vowel: { $in: ['AE', 'IY'] },
        position: 'initial',
        syllables: { $in: [1, 2] },
        age_of_acquisition: { $gt: 0, $lte: 5 }
      });

      expect(result.indexHint).toBe('phonetic_search_primary');
      expect(result.estimatedSelectivity).toBeGreaterThan(0);
      expect(result.estimatedSelectivity).toBeLessThanOrEqual(1);
    });

    it('should suggest appropriate index hints', () => {
      const filter1: PhoneticFilter = {
        consonants: ['B'],
        vowels: ['AE'],
        position: 'initial'
      };

      const result1 = optimizer.buildOptimizedMongoFilter(filter1);
      expect(result1.indexHint).toBe('phonetic_search_primary');

      const filter2: PhoneticFilter = {
        consonants: ['B'],
        vowels: ['AE']
      };

      const result2 = optimizer.buildOptimizedMongoFilter(filter2);
      expect(result2.indexHint).toBe('phonetic_score_sort');

      const filter3: PhoneticFilter = {
        syllables: [1],
        type: ['noun']
      };

      const result3 = optimizer.buildOptimizedMongoFilter(filter3);
      expect(result3.indexHint).toBe('syllable_type_search');
    });

    it('should calculate selectivity estimates', () => {
      const verySelectiveFilter: PhoneticFilter = {
        consonants: ['B'], // Single consonant
        vowels: ['AE'], // Single vowel
        position: 'initial'
      };

      const result1 = optimizer.buildOptimizedMongoFilter(verySelectiveFilter);
      expect(result1.estimatedSelectivity).toBeLessThan(0.1);

      const broadFilter: PhoneticFilter = {
        syllables: [1, 2, 3, 4, 5]
      };

      const result2 = optimizer.buildOptimizedMongoFilter(broadFilter);
      expect(result2.estimatedSelectivity).toBeGreaterThan(0.5);
    });
  });

  describe('applyBlacklistFilter', () => {
    const mockWords = [
      { lexeme: 'cat', syllables: 1 },
      { lexeme: 'bad', syllables: 1 }, // Should be filtered out
      { lexeme: 'dog', syllables: 1 },
      { lexeme: 'psychology', syllables: 4 }, // Should be filtered for low grades
      { lexeme: 'hat', syllables: 1 }
    ];

    it('should filter inappropriate words', () => {
      const filter: PhoneticFilter = {};
      
      const result = optimizer.applyBlacklistFilter(mockWords, filter);
      
      const lexemes = result.map(w => w.lexeme);
      expect(lexemes).not.toContain('bad');
      expect(lexemes).toContain('cat');
      expect(lexemes).toContain('dog');
    });

    it('should filter complex words for low grades', () => {
      const filter: PhoneticFilter = {
        gradeLevel: '2'
      };
      
      const result = optimizer.applyBlacklistFilter(mockWords, filter);
      
      const lexemes = result.map(w => w.lexeme);
      expect(lexemes).not.toContain('psychology');
      expect(lexemes).toContain('cat');
      expect(lexemes).toContain('hat');
    });

    it('should allow complex words for higher grades', () => {
      const filter: PhoneticFilter = {
        gradeLevel: '12'
      };
      
      const result = optimizer.applyBlacklistFilter(mockWords, filter);
      
      const lexemes = result.map(w => w.lexeme);
      expect(lexemes).toContain('psychology'); // Should be allowed for grade 12
    });
  });

  describe('validatePhoneticCombination', () => {
    it('should validate normal combinations', () => {
      const result = optimizer.validatePhoneticCombination(['B', 'T'], ['AE', 'IY']);
      
      expect(result.isValid).toBe(true);
      expect(result.warnings).toHaveLength(0);
    });

    it('should warn about difficult combinations', () => {
      const result = optimizer.validatePhoneticCombination(['ZH', 'TH'], ['OY', 'AW']);
      
      expect(result.isValid).toBe(true);
      expect(result.warnings.length).toBeGreaterThan(0);
      expect(result.suggestions.length).toBeGreaterThan(0);
    });

    it('should suggest therapeutic benefits', () => {
      const result = optimizer.validatePhoneticCombination(['B', 'P'], ['AE', 'IY']);
      
      expect(result.suggestions.some(s => s.includes('bilabial'))).toBe(true);
    });
  });
});