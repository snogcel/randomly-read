import { WordQueryOptions } from './WordService';
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
export declare class SentenceService {
    private static instance;
    private wordService;
    private defaultTemplates;
    private specializedTemplates;
    static getInstance(): SentenceService;
    constructor();
    generateSentence(options: SentenceQueryOptions, userId: string): Promise<GeneratedSentence>;
    private getAvailableTemplates;
    private buildSentence;
    private tokenizeTemplate;
    private isPlaceholder;
    private selectWordForPlaceholder;
    private selectRandomWord;
    generateMultipleSentences(options: SentenceQueryOptions, userId: string, count?: number): Promise<GeneratedSentence[]>;
    validateTemplate(template: string): {
        isValid: boolean;
        errors: string[];
    };
}
//# sourceMappingURL=SentenceService.d.ts.map