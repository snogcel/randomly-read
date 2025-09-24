import { IWord } from '../models/Word';
export interface WordQueryOptions {
    vowel?: string[];
    consonant?: string[];
    type?: string[];
    subtype?: string[];
    syllables?: number[];
    position?: 'initial' | 'medial' | 'final';
    age?: string;
    limit?: number;
    gradeLevel?: string;
}
export interface WordFilterResult {
    words: IWord[];
    totalCount: number;
    hasMore: boolean;
}
export declare class WordService {
    private static instance;
    static getInstance(): WordService;
    queryWords(options: WordQueryOptions): Promise<WordFilterResult>;
    getRandomWord(options: WordQueryOptions): Promise<IWord | null>;
    getWordById(id: string): Promise<IWord | null>;
    voteOnWord(wordId: string, userId: string, vote: number): Promise<IWord>;
    incrementWordViews(wordId: string): Promise<IWord>;
    getWordsForSentence(options: WordQueryOptions): Promise<{
        nouns: IWord[];
        adjectives: IWord[];
        filteredNouns: {
            animal: IWord[];
            location: IWord[];
            person: IWord[];
            food: IWord[];
            artifact: IWord[];
        };
    }>;
    private buildWordFilter;
    getPhoneticStats(userId: string): Promise<{
        consonantAccuracy: {
            [key: string]: number;
        };
        vowelAccuracy: {
            [key: string]: number;
        };
        positionAccuracy: {
            [key: string]: number;
        };
    }>;
}
//# sourceMappingURL=WordService.d.ts.map