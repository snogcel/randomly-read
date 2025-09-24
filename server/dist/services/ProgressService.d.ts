import { IExerciseSession, IProgressRecord, IFluencyReport, IWordAttempt } from '../models/Progress';
export interface CreateExerciseSessionData {
    routineId: string;
    sessionId: string;
    totalWords: number;
    notes?: string;
}
export interface UpdateExerciseSessionData {
    endTime?: Date;
    wordsAttempted?: IWordAttempt[];
    totalWords?: number;
    notes?: string;
}
export interface ExerciseSessionQueryOptions {
    routineId?: string;
    limit?: number;
    offset?: number;
    startDate?: Date;
    endDate?: Date;
}
export interface ProgressRecordQueryOptions {
    routineId?: string;
    startDate?: Date;
    endDate?: Date;
    consonant?: string;
    vowel?: string;
    position?: string;
}
export declare class ProgressService {
    private static instance;
    static getInstance(): ProgressService;
    createExerciseSession(userId: string, data: CreateExerciseSessionData): Promise<IExerciseSession>;
    updateExerciseSession(sessionId: string, userId: string, data: UpdateExerciseSessionData): Promise<IExerciseSession>;
    addWordAttempt(sessionId: string, userId: string, attempt: IWordAttempt): Promise<IExerciseSession>;
    completeExerciseSession(sessionId: string, userId: string): Promise<IExerciseSession>;
    getExerciseSessions(userId: string, options?: ExerciseSessionQueryOptions): Promise<IExerciseSession[]>;
    getExerciseSessionById(sessionId: string): Promise<IExerciseSession | null>;
    getProgressRecords(userId: string, options?: ProgressRecordQueryOptions): Promise<IProgressRecord[]>;
    generateFluencyReport(userId: string, routineId: string, startDate: Date, endDate: Date): Promise<IFluencyReport>;
    private calculateImprovementTrend;
    private calculateDifficultPhonemes;
    private generateRecommendations;
}
//# sourceMappingURL=ProgressService.d.ts.map