import { WordService, WordQueryOptions } from './WordService';
import { IWord } from '../models/Word';
import { logger } from '../utils/logger';

export interface SentenceQueryOptions extends WordQueryOptions {
  templates?: string[];
}

export interface SentenceWord {
  id?: string;
  lexeme: string;
  votes?: any[];
  score?: number;
}

export interface GeneratedSentence {
  words: SentenceWord[];
}

export class SentenceService {
  private static instance: SentenceService;
  private wordService: WordService;
  
  // Default sentence templates
  private defaultTemplates = [
    "{{ adjective }} hues on the {{ noun }}",
    "{{ adjective }} echoes fill the {{ noun }}",
    "{{ noun }} adorned with {{ an_adjective }} elegance",
    "{{ adjective }} colors in {{ noun }}",
    "{{ noun }} embraces {{ an_adjective }} essence",
    "{{ adjective }} mystique of the {{ noun }}",
    "{{ adjective }} enchantment in {{ noun }}",
    "{{ noun }} resonates with {{ adjective }} echoes",
    "{{ adjective }} essence graces the aura of {{ noun }}",
    "{{ noun }} through {{ an_adjective }} eyes",
    "{{ adjective }} melodies play in {{ noun }}",
    "{{ adjective }} wonders unfold in {{ noun }}",
    "{{ adjective }} {{ adjective }} illuminate the {{ noun }}",
    "{{ adjective }} tapestry of {{ noun }}",
    "{{ adjective }} stories unfold about {{ noun }}",
    "{{ noun }} touched by essence of {{ adjective }}",
    "{{ adjective }} unveils {{ adjective }} secret of {{ noun }}",
    "{{ adjective }} shades paint canvas of {{ noun }}",
    "{{ adjective }} dreams echo softly in {{ noun }}"
  ];

  // Specialized templates by subtype
  private specializedTemplates = {
    animal: [
      "{{ adjective }} {{ noun_animal }} is {{ adjective }} and wild",
      "{{ adjective }} {{ noun_animal }} roams the {{ noun_location }}",
      "{{ adjective }} {{ noun_animal }} in its natural habitat",
      "{{ adjective }} hues on the {{ noun_animal }}",
      "{{ adjective }} mystique of the {{ noun_animal }}",
      "{{ noun_animal }} touched by essence of {{ adjective }}"
    ],
    artifact: [
      "{{ adjective }} {{ noun_artifact }} exudes {{ an_adjective }} mystery",
      "{{ noun_artifact }} with {{ an_adjective }} craftsmanship",
      "{{ noun_artifact }} adorned with {{ an_adjective }} tales",
      "{{ noun_artifact }} resonates with {{ adjective }} echoes",
      "{{ adjective }} stories unfold about {{ noun_artifact }}",
      "{{ adjective }} unveils {{ adjective }} secret of {{ noun_artifact }}"
    ],
    location: [
      "{{ adjective }} {{ noun_location }} is {{ an_adjective }} haven",
      "{{ noun_location }} with {{ an_adjective }} charm",
      "{{ adjective }} essence graces the aura of {{ noun_location }}",
      "{{ adjective }} shades paint canvas of {{ noun_location }}",
      "{{ adjective }} {{ adjective }} illuminate the {{ noun_location }}"
    ],
    food: [
      "{{ noun_food }} with {{ an_adjective }} spices",
      "{{ adjective }} tapestry of {{ noun_food }}",
      "{{ adjective }} essence graces the aura of {{ noun_food }}",
      "{{ noun_food }} embraces {{ an_adjective }} essence"
    ],
    person: [
      "{{ adjective }} {{ noun_person }} is {{ adjective }}",
      "{{ adjective }} {{ noun_person }} with {{ an_adjective }} charm",
      "{{ noun_person }} touched by essence of {{ adjective }}",
      "{{ noun_person }} resonates with {{ adjective }} echoes"
    ]
  };

  public static getInstance(): SentenceService {
    if (!SentenceService.instance) {
      SentenceService.instance = new SentenceService();
    }
    return SentenceService.instance;
  }

  constructor() {
    this.wordService = WordService.getInstance();
  }

  /**
   * Generate a sentence based on phonetic criteria
   */
  async generateSentence(options: SentenceQueryOptions, userId: string): Promise<GeneratedSentence> {
    try {
      // Get words for sentence generation
      const wordData = await this.wordService.getWordsForSentence({
        ...options,
        limit: options.limit || 100
      });

      if (wordData.nouns.length === 0 || wordData.adjectives.length === 0) {
        throw new Error('Insufficient words found for sentence generation');
      }

      // Determine available templates
      const templates = this.getAvailableTemplates(options.templates, wordData.filteredNouns);

      if (templates.length === 0) {
        throw new Error('No suitable templates available');
      }

      // Select random template
      const template = templates[Math.floor(Math.random() * templates.length)];

      // Generate sentence
      const sentence = await this.buildSentence(template, wordData, userId);

      logger.info(`Sentence generated for user ${userId}: ${sentence.words.map(w => w.lexeme).join(' ')}`);

      return sentence;

    } catch (error) {
      logger.error('Error generating sentence:', error);
      throw new Error(`Failed to generate sentence: ${error.message}`);
    }
  }

  /**
   * Get available templates based on word availability
   */
  private getAvailableTemplates(customTemplates?: string[], filteredNouns?: any): string[] {
    let templates = [...this.defaultTemplates];

    // Add custom templates if provided
    if (customTemplates && customTemplates.length > 0) {
      templates = customTemplates;
    }

    // Add specialized templates based on available word subtypes
    if (filteredNouns) {
      Object.keys(this.specializedTemplates).forEach(subtype => {
        if (filteredNouns[subtype] && filteredNouns[subtype].length > 0) {
          templates = templates.concat(this.specializedTemplates[subtype as keyof typeof this.specializedTemplates]);
        }
      });
    }

    return templates;
  }

  /**
   * Build sentence from template and word data
   */
  private async buildSentence(template: string, wordData: any, userId: string): Promise<GeneratedSentence> {
    const words: SentenceWord[] = [];
    const tokens = this.tokenizeTemplate(template);

    for (const token of tokens) {
      if (this.isPlaceholder(token)) {
        const word = this.selectWordForPlaceholder(token, wordData);
        if (word) {
          // Create word entry (this would typically create a post/vote entry)
          const wordEntry: SentenceWord = {
            id: word._id?.toString(),
            lexeme: word.lexeme,
            votes: word.votes || [],
            score: word.score || 0
          };
          words.push(wordEntry);
        } else {
          // Fallback to placeholder text
          words.push({ lexeme: token });
        }
      } else {
        // Regular word
        words.push({ lexeme: token });
      }
    }

    return { words };
  }

  /**
   * Tokenize template into words and placeholders
   */
  private tokenizeTemplate(template: string): string[] {
    // Split by spaces and handle placeholders
    return template.split(/\s+/).filter(token => token.length > 0);
  }

  /**
   * Check if token is a placeholder
   */
  private isPlaceholder(token: string): boolean {
    return token.startsWith('{{') && token.endsWith('}}');
  }

  /**
   * Select appropriate word for placeholder
   */
  private selectWordForPlaceholder(placeholder: string, wordData: any): IWord | null {
    const cleanPlaceholder = placeholder.replace(/[{}]/g, '').trim();

    switch (cleanPlaceholder) {
      case 'noun':
        return this.selectRandomWord(wordData.nouns);
      
      case 'adjective':
      case 'an_adjective':
        return this.selectRandomWord(wordData.adjectives);
      
      case 'noun_animal':
        return this.selectRandomWord(wordData.filteredNouns.animal);
      
      case 'noun_location':
        return this.selectRandomWord(wordData.filteredNouns.location);
      
      case 'noun_person':
        return this.selectRandomWord(wordData.filteredNouns.person);
      
      case 'noun_food':
        return this.selectRandomWord(wordData.filteredNouns.food);
      
      case 'noun_artifact':
        return this.selectRandomWord(wordData.filteredNouns.artifact);
      
      default:
        return null;
    }
  }

  /**
   * Select random word from array
   */
  private selectRandomWord(words: IWord[]): IWord | null {
    if (!words || words.length === 0) return null;
    return words[Math.floor(Math.random() * words.length)];
  }

  /**
   * Generate multiple sentences
   */
  async generateMultipleSentences(options: SentenceQueryOptions, userId: string, count: number = 1): Promise<GeneratedSentence[]> {
    const sentences: GeneratedSentence[] = [];

    for (let i = 0; i < count; i++) {
      try {
        const sentence = await this.generateSentence(options, userId);
        sentences.push(sentence);
      } catch (error) {
        logger.error(`Error generating sentence ${i + 1}:`, error);
        // Continue with other sentences
      }
    }

    return sentences;
  }

  /**
   * Validate sentence template
   */
  validateTemplate(template: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!template || template.trim().length === 0) {
      errors.push('Template cannot be empty');
      return { isValid: false, errors };
    }

    // Check for balanced placeholders
    const openBraces = (template.match(/{{/g) || []).length;
    const closeBraces = (template.match(/}}/g) || []).length;

    if (openBraces !== closeBraces) {
      errors.push('Unbalanced placeholder braces');
    }

    // Check for valid placeholders
    const placeholders = template.match(/{{[^}]+}}/g) || [];
    const validPlaceholders = [
      'noun', 'adjective', 'an_adjective',
      'noun_animal', 'noun_location', 'noun_person', 'noun_food', 'noun_artifact'
    ];

    placeholders.forEach(placeholder => {
      const clean = placeholder.replace(/[{}]/g, '').trim();
      if (!validPlaceholders.includes(clean)) {
        errors.push(`Invalid placeholder: ${placeholder}`);
      }
    });

    // Check sentence length (reasonable limits)
    const wordCount = template.split(/\s+/).length;
    if (wordCount > 20) {
      errors.push('Template too long (max 20 words)');
    }

    return { isValid: errors.length === 0, errors };
  }
}