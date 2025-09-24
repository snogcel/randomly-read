export interface DefaultRoutineConfig {
    id: string;
    name: string;
    description: string;
    category: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    isDefault: boolean;
    steps: DefaultRoutineStep[];
}
export interface DefaultRoutineStep {
    id: string;
    type: 'word' | 'sentence' | 'intermission';
    duration: number;
    repetitions: number;
    phoneticConfig?: {
        consonants: string[];
        vowels: string[];
        positions: string[];
        syllables: number[];
        grades: number[];
    };
    intermissionText?: string;
}
export declare class DefaultRoutineService {
    private static instance;
    private routines;
    private constructor();
    static getInstance(): DefaultRoutineService;
    getDefaultRoutines(): DefaultRoutineConfig[];
    getDefaultRoutineById(id: string): DefaultRoutineConfig | null;
    getDefaultRoutinesByCategory(category: string): DefaultRoutineConfig[];
    getDefaultRoutinesByDifficulty(difficulty: string): DefaultRoutineConfig[];
    convertToUserRoutine(defaultRoutine: DefaultRoutineConfig, userId: string): {
        name: string;
        description: string;
        category: string;
        difficulty: "beginner" | "intermediate" | "advanced";
        isDefault: boolean;
        defaultRoutineId: string;
        createdBy: string;
        steps: {
            _id: undefined;
            id: string;
            type: "word" | "sentence" | "intermission";
            duration: number;
            repetitions: number;
            phoneticConfig?: {
                consonants: string[];
                vowels: string[];
                positions: string[];
                syllables: number[];
                grades: number[];
            };
            intermissionText?: string;
        }[];
        createdAt: Date;
        updatedAt: Date;
    };
    getRecommendedRoutine(userLevel?: string): DefaultRoutineConfig;
    validateRoutineConfig(routine: DefaultRoutineConfig): {
        isValid: boolean;
        errors: string[];
    };
}
export declare const defaultRoutineService: DefaultRoutineService;
//# sourceMappingURL=DefaultRoutineService.d.ts.map