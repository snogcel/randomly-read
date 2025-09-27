import { logger } from './logger';
import { PerformanceMonitor } from './performanceMonitor';

export interface PhoneticFilter {
  vowels?: string[];
  consonants?: string[];
  position?: 'initial' | 'medial' | 'final';
  syllables?: number[];
  gradeLevel?: string;
  type?: string[];
  subtype?: string[];
}

export interface FilterValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  optimizations: string[];
}

export interface FilterStats {
  totalWords: number;
  filteredWords: number;
  filterEfficiency: number;
  executionTime: number;
  indexesUsed: string[];
}

/**
 * Optimized phonetic filtering utilities
 */
export class PhoneticFilterOptimizer {
  private static instance: PhoneticFilterOptimizer;
  private performanceMonitor: PerformanceMonitor;
  
  // Valid phonetic values for validation
  private readonly VALID_VOWELS = [
    'AA', 'AE', 'AH', 'AO', 'AW', 'AY', 
    'EH', 'ER', 'EY', 'IH', 'IY', 'OW', 
    'OY', 'UH', 'UW'
  ];
  
  private readonly VALID_CONSONANTS = [
    'B', 'CH', 'D', 'DH', 'F', 'G', 'HH', 
    'JH', 'K', 'L', 'M', 'N', 'NG', 'P', 
    'R', 'S', 'SH', 'T', 'TH', 'V', 'W', 
    'Y', 'Z', 'ZH'
  ];
  
  private readonly VALID_POSITIONS = ['initial', 'medial', 'final'];
  private readonly VALID_TYPES = ['noun', 'verb', 'adj', 'adv', 'other'];
  private readonly VALID_SUBTYPES = ['animal', 'location', 'person', 'food', 'artifact', 'all', 'other'];

  // Blacklist patterns for filtering
  private readonly BLACKLIST_PATTERNS = {
    // Common inappropriate words (simplified example)
    inappropriate: ['bad', 'hate', 'stupid'],
    
    // Too difficult for certain grade levels
    complex: {
      grade1: ['psychology', 'philosophy', 'extraordinary'],
      grade2: ['complicated', 'understand', 'beautiful'],
      grade3: ['important', 'different', 'together']
    },
    
    // Phonetically challenging combinations
    difficult: {
      consonantClusters: ['str', 'spr', 'scr', 'thr'],
      vowelCombinations: ['oy', 'aw', 'ow']
    }
  };

  private constructor() {
    this.performanceMonitor = PerformanceMonitor.getInstance();
  }

  public static getInstance(): PhoneticFilterOptimizer {
    if (!PhoneticFilterOptimizer.instance) {
      PhoneticFilterOptimizer.instance = new PhoneticFilterOptimizer();
    }
    return PhoneticFilterOptimizer.instance;
  }

  /**
   * Validate phonetic filter parameters
   */
  validateFilter(filter: PhoneticFilter): FilterValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const optimizations: string[] = [];

    // Validate vowels
    if (filter.vowels) {
      const invalidVowels = filter.vowels.filter(v => !this.VALID_VOWELS.includes(v));
      if (invalidVowels.length > 0) {
        errors.push(`Invalid vowel sounds: ${invalidVowels.join(', ')}`);
      }
      
      if (filter.vowels.length > 10) {
        warnings.push('Large vowel selection may impact performance');
        optimizations.push('Consider limiting vowel selection to 5-7 sounds for better performance');
      }
    }

    // Validate consonants
    if (filter.consonants) {
      const invalidConsonants = filter.consonants.filter(c => !this.VALID_CONSONANTS.includes(c));
      if (invalidConsonants.length > 0) {
        errors.push(`Invalid consonant sounds: ${invalidConsonants.join(', ')}`);
      }
      
      if (filter.consonants.length > 15) {
        warnings.push('Large consonant selection may impact performance');
        optimizations.push('Consider limiting consonant selection to 8-10 sounds for better performance');
      }
    }

    // Validate position
    if (filter.position && !this.VALID_POSITIONS.includes(filter.position)) {
      errors.push(`Invalid position: ${filter.position}. Must be initial, medial, or final`);
    }

    // Validate syllables
    if (filter.syllables) {
      const invalidSyllables = filter.syllables.filter(s => !Number.isInteger(s) || s < 1 || s > 10);
      if (invalidSyllables.length > 0) {
        errors.push(`Invalid syllable counts: ${invalidSyllables.join(', ')}. Must be integers between 1 and 10`);
      }
    }

    // Validate type
    if (filter.type) {
      const invalidTypes = filter.type.filter(t => !this.VALID_TYPES.includes(t));
      if (invalidTypes.length > 0) {
        errors.push(`Invalid word types: ${invalidTypes.join(', ')}`);
      }
    }

    // Validate subtype
    if (filter.subtype) {
      const invalidSubtypes = filter.subtype.filter(st => !this.VALID_SUBTYPES.includes(st));
      if (invalidSubtypes.length > 0) {
        errors.push(`Invalid word subtypes: ${invalidSubtypes.join(', ')}`);
      }
    }

    // Validate grade level
    if (filter.gradeLevel) {
      const gradeLevel = parseInt(filter.gradeLevel, 10);
      if (isNaN(gradeLevel) || gradeLevel < 0 || gradeLevel > 20) {
        errors.push('Grade level must be between 0 and 20');
      }
    }

    // Performance optimizations
    if (filter.vowels && filter.consonants && filter.vowels.length > 5 && filter.consonants.length > 8) {
      optimizations.push('Consider using either vowel OR consonant filtering for better performance');
    }

    if (!filter.syllables || filter.syllables.length > 5) {
      optimizations.push('Limiting syllable range to 2-3 values improves query performance');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      optimizations
    };
  }

  /**
   * Optimize filter for better database performance
   */
  optimizeFilter(filter: PhoneticFilter): PhoneticFilter {
    const optimized = { ...filter };

    // Optimize vowel selection
    if (optimized.vowels && optimized.vowels.length > 7) {
      // Keep most common vowels for better performance
      const commonVowels = ['AE', 'IY', 'AH', 'EH', 'IH', 'OW', 'UW'];
      optimized.vowels = optimized.vowels.filter(v => commonVowels.includes(v)).slice(0, 7);
      logger.debug('Optimized vowel selection for performance', { 
        original: filter.vowels?.length, 
        optimized: optimized.vowels.length 
      });
    }

    // Optimize consonant selection
    if (optimized.consonants && optimized.consonants.length > 10) {
      // Keep most common consonants
      const commonConsonants = ['B', 'T', 'D', 'K', 'G', 'P', 'S', 'F', 'M', 'N'];
      optimized.consonants = optimized.consonants.filter(c => commonConsonants.includes(c)).slice(0, 10);
      logger.debug('Optimized consonant selection for performance', { 
        original: filter.consonants?.length, 
        optimized: optimized.consonants.length 
      });
    }

    // Optimize syllable range
    if (!optimized.syllables || optimized.syllables.length > 5) {
      optimized.syllables = [1, 2, 3]; // Most common syllable counts
      logger.debug('Optimized syllable range for performance');
    }

    // Add default type filter if none specified (improves index usage)
    if (!optimized.type && !optimized.subtype) {
      optimized.type = ['noun', 'verb', 'adj']; // Most common types
      logger.debug('Added default type filter for better index usage');
    }

    return optimized;
  }

  /**
   * Build optimized MongoDB filter with index hints
   */
  buildOptimizedMongoFilter(filter: PhoneticFilter): {
    mongoFilter: any;
    indexHint?: string;
    estimatedSelectivity: number;
  } {
    const endTimer = this.performanceMonitor.startTimer('buildOptimizedMongoFilter');
    
    try {
      const mongoFilter: any = {};
      let estimatedSelectivity = 1.0; // 1.0 = most selective, 0.0 = least selective

      // Build filter in order of selectivity for optimal index usage
      
      // 1. Most selective: specific consonant + vowel + position
      if (filter.consonants && filter.consonants.length <= 3) {
        mongoFilter.consonant = { $in: filter.consonants };
        estimatedSelectivity *= 0.1; // Very selective
      } else if (filter.consonants) {
        mongoFilter.consonant = { $in: filter.consonants };
        estimatedSelectivity *= 0.3; // Moderately selective
      }

      if (filter.vowels && filter.vowels.length <= 3) {
        mongoFilter.vowel = { $in: filter.vowels };
        estimatedSelectivity *= 0.15; // Very selective
      } else if (filter.vowels) {
        mongoFilter.vowel = { $in: filter.vowels };
        estimatedSelectivity *= 0.4; // Moderately selective
      }

      if (filter.position) {
        mongoFilter.position = filter.position;
        estimatedSelectivity *= 0.33; // Three possible values
      }

      // 2. Syllable filtering (good selectivity)
      if (filter.syllables && filter.syllables.length > 0) {
        mongoFilter.syllables = { $in: filter.syllables };
        estimatedSelectivity *= Math.min(0.6, filter.syllables.length * 0.2);
      } else {
        // Default syllable range for better performance
        mongoFilter.syllables = { $in: [1, 2, 3, 4, 5] };
        estimatedSelectivity *= 0.8;
      }

      // 3. Type filtering (moderate selectivity)
      if (filter.type && filter.type.length > 0) {
        mongoFilter.type = { $in: filter.type };
        estimatedSelectivity *= Math.min(0.7, filter.type.length * 0.2);
      }

      if (filter.subtype && filter.subtype.length > 0) {
        mongoFilter.subtype = { $in: filter.subtype };
        estimatedSelectivity *= Math.min(0.6, filter.subtype.length * 0.15);
      }

      // 4. Grade level filtering (less selective but important)
      if (filter.gradeLevel) {
        const gradeLevel = parseInt(filter.gradeLevel, 10);
        if (gradeLevel > 0) {
          mongoFilter.age_of_acquisition = {
            $gt: 0,
            $lte: gradeLevel
          };
          estimatedSelectivity *= 0.5; // Moderate selectivity
        }
      }

      // Determine optimal index hint based on filter composition
      let indexHint: string | undefined;
      
      if (filter.consonants && filter.vowels && filter.position) {
        indexHint = 'phonetic_search_primary';
      } else if (filter.consonants && filter.vowels) {
        indexHint = 'phonetic_score_sort';
      } else if (filter.position && filter.gradeLevel) {
        indexHint = 'position_grade_search';
      } else if (filter.syllables && filter.type) {
        indexHint = 'syllable_type_search';
      } else if (filter.vowels) {
        indexHint = 'vowel_syllable_position';
      } else if (filter.consonants) {
        indexHint = 'consonant_syllable_position';
      }

      endTimer();

      return {
        mongoFilter,
        indexHint,
        estimatedSelectivity: Math.max(0.01, estimatedSelectivity) // Minimum 1% selectivity
      };
    } catch (error) {
      endTimer();
      throw error;
    }
  }

  /**
   * Apply blacklist filtering
   */
  applyBlacklistFilter(words: any[], filter: PhoneticFilter): any[] {
    const endTimer = this.performanceMonitor.startTimer('applyBlacklistFilter');
    
    try {
      let filteredWords = [...words];
      const originalCount = filteredWords.length;

      // Apply inappropriate word filter
      filteredWords = filteredWords.filter(word => 
        !this.BLACKLIST_PATTERNS.inappropriate.some(pattern => 
          word.lexeme.toLowerCase().includes(pattern.toLowerCase())
        )
      );

      // Apply grade-level complexity filter
      if (filter.gradeLevel) {
        const gradeLevel = parseInt(filter.gradeLevel, 10);
        
        if (gradeLevel <= 3) {
          const complexWords = this.BLACKLIST_PATTERNS.complex.grade1
            .concat(this.BLACKLIST_PATTERNS.complex.grade2)
            .concat(this.BLACKLIST_PATTERNS.complex.grade3);
          
          filteredWords = filteredWords.filter(word => 
            !complexWords.some(pattern => 
              word.lexeme.toLowerCase().includes(pattern.toLowerCase())
            )
          );
        } else if (gradeLevel <= 6) {
          const complexWords = this.BLACKLIST_PATTERNS.complex.grade2
            .concat(this.BLACKLIST_PATTERNS.complex.grade3);
          
          filteredWords = filteredWords.filter(word => 
            !complexWords.some(pattern => 
              word.lexeme.toLowerCase().includes(pattern.toLowerCase())
            )
          );
        } else if (gradeLevel <= 9) {
          filteredWords = filteredWords.filter(word => 
            !this.BLACKLIST_PATTERNS.complex.grade3.some(pattern => 
              word.lexeme.toLowerCase().includes(pattern.toLowerCase())
            )
          );
        }
      }

      // Apply phonetic difficulty filter for lower grades
      if (filter.gradeLevel && parseInt(filter.gradeLevel, 10) <= 5) {
        filteredWords = filteredWords.filter(word => {
          const lexeme = word.lexeme.toLowerCase();
          
          // Filter out difficult consonant clusters
          const hasDifficultClusters = this.BLACKLIST_PATTERNS.difficult.consonantClusters
            .some(cluster => lexeme.includes(cluster));
          
          return !hasDifficultClusters;
        });
      }

      const filteredCount = filteredWords.length;
      const filterEfficiency = originalCount > 0 ? (filteredCount / originalCount) : 1;

      endTimer();

      logger.debug('Applied blacklist filtering', {
        originalCount,
        filteredCount,
        filterEfficiency: Math.round(filterEfficiency * 100) / 100,
        gradeLevel: filter.gradeLevel
      });

      return filteredWords;
    } catch (error) {
      endTimer();
      logger.error('Error applying blacklist filter:', error);
      return words; // Return original words if filtering fails
    }
  }

  /**
   * Validate consonant/vowel combinations
   */
  validatePhoneticCombination(consonants: string[], vowels: string[]): {
    isValid: boolean;
    warnings: string[];
    suggestions: string[];
  } {
    const warnings: string[] = [];
    const suggestions: string[] = [];

    // Check for difficult combinations
    const difficultConsonants = ['ZH', 'TH', 'DH', 'NG'];
    const difficultVowels = ['OY', 'AW', 'UH'];

    const hasDifficultConsonants = consonants.some(c => difficultConsonants.includes(c));
    const hasDifficultVowels = vowels.some(v => difficultVowels.includes(v));

    if (hasDifficultConsonants && hasDifficultVowels) {
      warnings.push('Combination includes multiple difficult sounds');
      suggestions.push('Consider focusing on either difficult consonants OR difficult vowels');
    }

    // Check for common therapeutic combinations
    const therapeuticPairs = [
      { consonants: ['B', 'P'], vowels: ['AE', 'IY'], reason: 'Good for bilabial practice' },
      { consonants: ['T', 'D'], vowels: ['AH', 'EH'], reason: 'Good for tongue tip practice' },
      { consonants: ['K', 'G'], vowels: ['OW', 'UW'], reason: 'Good for back tongue practice' }
    ];

    const matchingPairs = therapeuticPairs.filter(pair => 
      pair.consonants.some(c => consonants.includes(c)) &&
      pair.vowels.some(v => vowels.includes(v))
    );

    if (matchingPairs.length > 0) {
      suggestions.push(`Therapeutic benefit: ${matchingPairs[0]?.reason}`);
    }

    return {
      isValid: true, // Combinations are generally valid unless specifically invalid
      warnings,
      suggestions
    };
  }

  /**
   * Get filter performance statistics
   */
  getFilterStats(filter: PhoneticFilter, results: any[]): FilterStats {
    const { estimatedSelectivity } = this.buildOptimizedMongoFilter(filter);
    
    return {
      totalWords: 155000, // Approximate total words in database
      filteredWords: results.length,
      filterEfficiency: estimatedSelectivity,
      executionTime: 0, // Would be populated by actual query execution
      indexesUsed: [] // Would be populated by query explanation
    };
  }

  /**
   * Suggest filter optimizations
   */
  suggestOptimizations(filter: PhoneticFilter, stats: FilterStats): string[] {
    const suggestions: string[] = [];

    // Too many results
    if (stats.filteredWords > 1000) {
      suggestions.push('Consider adding more specific filters to reduce result set');
      
      if (!filter.position) {
        suggestions.push('Add position filter (initial/medial/final) for better targeting');
      }
      
      if (!filter.syllables || filter.syllables.length > 3) {
        suggestions.push('Limit syllable range to 1-3 syllables for more focused practice');
      }
    }

    // Too few results
    if (stats.filteredWords < 10) {
      suggestions.push('Consider broadening filters to get more word options');
      
      if (filter.consonants && filter.consonants.length < 3) {
        suggestions.push('Add more consonant sounds to increase word variety');
      }
      
      if (filter.vowels && filter.vowels.length < 3) {
        suggestions.push('Add more vowel sounds to increase word variety');
      }
    }

    // Performance optimizations
    if (stats.filterEfficiency < 0.1) {
      suggestions.push('Filter is very broad - consider adding more specific criteria');
    }

    if (stats.executionTime > 1000) {
      suggestions.push('Query is slow - consider using fewer filter combinations');
    }

    return suggestions;
  }
}