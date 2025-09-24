import mongoose, { Document } from 'mongoose';
export interface IWordAttempt {
    wordId: mongoose.Types.ObjectId;
    word: string;
    timestamp: Date;
    accuracy: number;
    timeSpent: number;
    difficulty: number;
    position: 'initial' | 'medial' | 'final';
    consonant: string;
    vowel: string;
}
export interface IExerciseSession extends Document {
    userId: mongoose.Types.ObjectId;
    routineId: mongoose.Types.ObjectId;
    sessionId: string;
    startTime: Date;
    endTime?: Date;
    wordsAttempted: IWordAttempt[];
    totalWords: number;
    completedWords: number;
    accuracy: number;
    completionRate: number;
    difficultWords: mongoose.Types.ObjectId[];
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
    calculateAccuracy(): number;
    calculateCompletionRate(): number;
    addWordAttempt(attempt: IWordAttempt): void;
    markComplete(): void;
    getDuration(): number;
}
export interface IProgressRecord extends Document {
    userId: mongoose.Types.ObjectId;
    routineId: mongoose.Types.ObjectId;
    sessionId: mongoose.Types.ObjectId;
    wordId: mongoose.Types.ObjectId;
    timestamp: Date;
    accuracy: number;
    timeSpent: number;
    difficulty: number;
    position: 'initial' | 'medial' | 'final';
    consonant: string;
    vowel: string;
    syllables: number;
    createdAt: Date;
}
export interface IFluencyReport extends Document {
    userId: mongoose.Types.ObjectId;
    routineId: mongoose.Types.ObjectId;
    reportDate: Date;
    dateRange: {
        start: Date;
        end: Date;
    };
    totalSessions: number;
    totalWords: number;
    averageAccuracy: number;
    averageSessionDuration: number;
    improvementTrend: 'improving' | 'stable' | 'declining';
    difficultPhonemes: {
        consonant: string;
        vowel: string;
        position: string;
        accuracy: number;
        frequency: number;
    }[];
    recommendations: string[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const ExerciseSession: mongoose.Model<IExerciseSession, {}, {}, {}, mongoose.Document<unknown, {}, IExerciseSession> & IExerciseSession & {
    _id: mongoose.Types.ObjectId;
}, any>;
export declare const ProgressRecord: mongoose.Model<IProgressRecord, {}, {}, {}, mongoose.Document<unknown, {}, IProgressRecord> & IProgressRecord & {
    _id: mongoose.Types.ObjectId;
}, any>;
export declare const FluencyReport: mongoose.Model<IFluencyReport, {}, {}, {}, mongoose.Document<unknown, {}, IFluencyReport> & IFluencyReport & {
    _id: mongoose.Types.ObjectId;
}, any>;
//# sourceMappingURL=Progress.d.ts.map