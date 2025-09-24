"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultRoutineService = exports.DefaultRoutineService = void 0;
const logger_1 = require("../utils/logger");
const defaultRoutines_json_1 = __importDefault(require("../config/defaultRoutines.json"));
class DefaultRoutineService {
    constructor() {
        this.routines = defaultRoutines_json_1.default.defaultRoutines;
        logger_1.logger.info(`Loaded ${this.routines.length} default routines`);
    }
    static getInstance() {
        if (!DefaultRoutineService.instance) {
            DefaultRoutineService.instance = new DefaultRoutineService();
        }
        return DefaultRoutineService.instance;
    }
    getDefaultRoutines() {
        return this.routines;
    }
    getDefaultRoutineById(id) {
        const routine = this.routines.find(r => r.id === id);
        return routine || null;
    }
    getDefaultRoutinesByCategory(category) {
        return this.routines.filter(r => r.category === category);
    }
    getDefaultRoutinesByDifficulty(difficulty) {
        return this.routines.filter(r => r.difficulty === difficulty);
    }
    convertToUserRoutine(defaultRoutine, userId) {
        return {
            name: defaultRoutine.name,
            description: defaultRoutine.description,
            category: defaultRoutine.category,
            difficulty: defaultRoutine.difficulty,
            isDefault: true,
            defaultRoutineId: defaultRoutine.id,
            createdBy: userId,
            steps: defaultRoutine.steps.map(step => ({
                ...step,
                _id: undefined
            })),
            createdAt: new Date(),
            updatedAt: new Date()
        };
    }
    getRecommendedRoutine(userLevel) {
        const level = userLevel || 'beginner';
        const routinesByLevel = this.getDefaultRoutinesByDifficulty(level);
        if (routinesByLevel.length > 0) {
            return routinesByLevel[0];
        }
        const beginnerRoutines = this.getDefaultRoutinesByDifficulty('beginner');
        if (beginnerRoutines.length > 0) {
            return beginnerRoutines[0];
        }
        if (this.routines.length > 0) {
            return this.routines[0];
        }
        throw new Error('No default routines available');
    }
    validateRoutineConfig(routine) {
        const errors = [];
        if (!routine.id || routine.id.trim() === '') {
            errors.push('Routine ID is required');
        }
        if (!routine.name || routine.name.trim() === '') {
            errors.push('Routine name is required');
        }
        if (!routine.steps || routine.steps.length === 0) {
            errors.push('Routine must have at least one step');
        }
        routine.steps?.forEach((step, index) => {
            if (!step.id || step.id.trim() === '') {
                errors.push(`Step ${index + 1}: ID is required`);
            }
            if (!['word', 'sentence', 'intermission'].includes(step.type)) {
                errors.push(`Step ${index + 1}: Invalid step type`);
            }
            if (step.duration < 1 || step.duration > 3600) {
                errors.push(`Step ${index + 1}: Duration must be between 1 and 3600 seconds`);
            }
            if (step.repetitions < 1 || step.repetitions > 1000) {
                errors.push(`Step ${index + 1}: Repetitions must be between 1 and 1000`);
            }
            if ((step.type === 'word' || step.type === 'sentence') && !step.phoneticConfig) {
                errors.push(`Step ${index + 1}: Phonetic configuration required for ${step.type} steps`);
            }
            if (step.type === 'intermission' && !step.intermissionText) {
                errors.push(`Step ${index + 1}: Intermission text required for intermission steps`);
            }
        });
        return {
            isValid: errors.length === 0,
            errors
        };
    }
}
exports.DefaultRoutineService = DefaultRoutineService;
exports.defaultRoutineService = DefaultRoutineService.getInstance();
//# sourceMappingURL=DefaultRoutineService.js.map