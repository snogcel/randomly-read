"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FluencyReport = exports.ProgressRecord = exports.ExerciseSession = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const wordAttemptSchema = new mongoose_1.Schema({
    wordId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Word', required: true },
    word: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now },
    accuracy: { type: Number, required: true, min: 0, max: 100 },
    timeSpent: { type: Number, required: true, min: 0 },
    difficulty: { type: Number, required: true, min: 1, max: 10 },
    position: { type: String, required: true, enum: ['initial', 'medial', 'final'] },
    consonant: { type: String, required: true },
    vowel: { type: String, required: true }
}, { _id: false });
const exerciseSessionSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    routineId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Routine', required: true },
    sessionId: { type: String, required: true, unique: true },
    startTime: { type: Date, required: true, default: Date.now },
    endTime: { type: Date },
    wordsAttempted: [wordAttemptSchema],
    totalWords: { type: Number, required: true, default: 0 },
    completedWords: { type: Number, required: true, default: 0 },
    accuracy: { type: Number, required: true, default: 0, min: 0, max: 100 },
    completionRate: { type: Number, required: true, default: 0, min: 0, max: 100 },
    difficultWords: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Word' }],
    notes: { type: String, maxlength: 1000 }
}, { timestamps: true });
const progressRecordSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    routineId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Routine', required: true },
    sessionId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'ExerciseSession', required: true },
    wordId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Word', required: true },
    timestamp: { type: Date, required: true, default: Date.now },
    accuracy: { type: Number, required: true, min: 0, max: 100 },
    timeSpent: { type: Number, required: true, min: 0 },
    difficulty: { type: Number, required: true, min: 1, max: 10 },
    position: { type: String, required: true, enum: ['initial', 'medial', 'final'] },
    consonant: { type: String, required: true },
    vowel: { type: String, required: true },
    syllables: { type: Number, required: true, min: 1, max: 10 }
}, { timestamps: true });
const fluencyReportSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    routineId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Routine', required: true },
    reportDate: { type: Date, required: true, default: Date.now },
    dateRange: {
        start: { type: Date, required: true },
        end: { type: Date, required: true }
    },
    totalSessions: { type: Number, required: true, default: 0 },
    totalWords: { type: Number, required: true, default: 0 },
    averageAccuracy: { type: Number, required: true, default: 0, min: 0, max: 100 },
    averageSessionDuration: { type: Number, required: true, default: 0 },
    improvementTrend: {
        type: String,
        required: true,
        enum: ['improving', 'stable', 'declining'],
        default: 'stable'
    },
    difficultPhonemes: [{
            consonant: { type: String, required: true },
            vowel: { type: String, required: true },
            position: { type: String, required: true },
            accuracy: { type: Number, required: true, min: 0, max: 100 },
            frequency: { type: Number, required: true, min: 0 }
        }],
    recommendations: [{ type: String, maxlength: 200 }]
}, { timestamps: true });
exerciseSessionSchema.index({ userId: 1, startTime: -1 });
exerciseSessionSchema.index({ routineId: 1, startTime: -1 });
exerciseSessionSchema.index({ sessionId: 1 });
progressRecordSchema.index({ userId: 1, timestamp: -1 });
progressRecordSchema.index({ routineId: 1, timestamp: -1 });
progressRecordSchema.index({ wordId: 1, timestamp: -1 });
progressRecordSchema.index({ consonant: 1, vowel: 1, position: 1 });
fluencyReportSchema.index({ userId: 1, reportDate: -1 });
fluencyReportSchema.index({ routineId: 1, reportDate: -1 });
exerciseSessionSchema.set('toJSON', {
    getters: true,
    transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});
progressRecordSchema.set('toJSON', {
    getters: true,
    transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});
fluencyReportSchema.set('toJSON', {
    getters: true,
    transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});
exerciseSessionSchema.methods.calculateAccuracy = function () {
    if (this.wordsAttempted.length === 0)
        return 0;
    const totalAccuracy = this.wordsAttempted.reduce((sum, attempt) => sum + attempt.accuracy, 0);
    return Math.round(totalAccuracy / this.wordsAttempted.length);
};
exerciseSessionSchema.methods.calculateCompletionRate = function () {
    if (this.totalWords === 0)
        return 0;
    return Math.round((this.completedWords / this.totalWords) * 100);
};
exerciseSessionSchema.methods.addWordAttempt = function (attempt) {
    this.wordsAttempted.push(attempt);
    this.completedWords = this.wordsAttempted.length;
    this.accuracy = this.calculateAccuracy();
    this.completionRate = this.calculateCompletionRate();
};
exerciseSessionSchema.methods.markComplete = function () {
    this.endTime = new Date();
    this.completionRate = this.calculateCompletionRate();
};
exerciseSessionSchema.methods.getDuration = function () {
    if (!this.endTime)
        return 0;
    return this.endTime.getTime() - this.startTime.getTime();
};
exports.ExerciseSession = mongoose_1.default.model('ExerciseSession', exerciseSessionSchema);
exports.ProgressRecord = mongoose_1.default.model('ProgressRecord', progressRecordSchema);
exports.FluencyReport = mongoose_1.default.model('FluencyReport', fluencyReportSchema);
//# sourceMappingURL=Progress.js.map