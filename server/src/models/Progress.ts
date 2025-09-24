import mongoose, { Document, Schema } from 'mongoose';

export interface IWordAttempt {
  wordId: mongoose.Types.ObjectId;
  word: string; // lexeme for quick reference
  timestamp: Date;
  accuracy: number; // 0-100
  timeSpent: number; // milliseconds
  difficulty: number; // 1-10 scale
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
  accuracy: number; // average accuracy
  completionRate: number; // percentage completed
  difficultWords: mongoose.Types.ObjectId[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Methods
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

const wordAttemptSchema = new Schema<IWordAttempt>({
  wordId: { type: Schema.Types.ObjectId, ref: 'Word', required: true },
  word: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now },
  accuracy: { type: Number, required: true, min: 0, max: 100 },
  timeSpent: { type: Number, required: true, min: 0 },
  difficulty: { type: Number, required: true, min: 1, max: 10 },
  position: { type: String, required: true, enum: ['initial', 'medial', 'final'] },
  consonant: { type: String, required: true },
  vowel: { type: String, required: true }
}, { _id: false });

const exerciseSessionSchema = new Schema<IExerciseSession>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  routineId: { type: Schema.Types.ObjectId, ref: 'Routine', required: true },
  sessionId: { type: String, required: true, unique: true },
  startTime: { type: Date, required: true, default: Date.now },
  endTime: { type: Date },
  wordsAttempted: [wordAttemptSchema],
  totalWords: { type: Number, required: true, default: 0 },
  completedWords: { type: Number, required: true, default: 0 },
  accuracy: { type: Number, required: true, default: 0, min: 0, max: 100 },
  completionRate: { type: Number, required: true, default: 0, min: 0, max: 100 },
  difficultWords: [{ type: Schema.Types.ObjectId, ref: 'Word' }],
  notes: { type: String, maxlength: 1000 }
}, { timestamps: true });

const progressRecordSchema = new Schema<IProgressRecord>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  routineId: { type: Schema.Types.ObjectId, ref: 'Routine', required: true },
  sessionId: { type: Schema.Types.ObjectId, ref: 'ExerciseSession', required: true },
  wordId: { type: Schema.Types.ObjectId, ref: 'Word', required: true },
  timestamp: { type: Date, required: true, default: Date.now },
  accuracy: { type: Number, required: true, min: 0, max: 100 },
  timeSpent: { type: Number, required: true, min: 0 },
  difficulty: { type: Number, required: true, min: 1, max: 10 },
  position: { type: String, required: true, enum: ['initial', 'medial', 'final'] },
  consonant: { type: String, required: true },
  vowel: { type: String, required: true },
  syllables: { type: Number, required: true, min: 1, max: 10 }
}, { timestamps: true });

const fluencyReportSchema = new Schema<IFluencyReport>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  routineId: { type: Schema.Types.ObjectId, ref: 'Routine', required: true },
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

// Indexes for efficient queries
exerciseSessionSchema.index({ userId: 1, startTime: -1 });
exerciseSessionSchema.index({ routineId: 1, startTime: -1 });
exerciseSessionSchema.index({ sessionId: 1 });

progressRecordSchema.index({ userId: 1, timestamp: -1 });
progressRecordSchema.index({ routineId: 1, timestamp: -1 });
progressRecordSchema.index({ wordId: 1, timestamp: -1 });
progressRecordSchema.index({ consonant: 1, vowel: 1, position: 1 });

fluencyReportSchema.index({ userId: 1, reportDate: -1 });
fluencyReportSchema.index({ routineId: 1, reportDate: -1 });

// Transform output
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

// Instance methods for ExerciseSession
exerciseSessionSchema.methods.calculateAccuracy = function(): number {
  if (this.wordsAttempted.length === 0) return 0;
  const totalAccuracy = this.wordsAttempted.reduce((sum: number, attempt: any) => sum + attempt.accuracy, 0);
  return Math.round(totalAccuracy / this.wordsAttempted.length);
};

exerciseSessionSchema.methods.calculateCompletionRate = function(): number {
  if (this.totalWords === 0) return 0;
  return Math.round((this.completedWords / this.totalWords) * 100);
};

exerciseSessionSchema.methods.addWordAttempt = function(attempt: IWordAttempt): void {
  this.wordsAttempted.push(attempt);
  this.completedWords = this.wordsAttempted.length;
  this.accuracy = this.calculateAccuracy();
  this.completionRate = this.calculateCompletionRate();
};

exerciseSessionSchema.methods.markComplete = function(): void {
  this.endTime = new Date();
  this.completionRate = this.calculateCompletionRate();
};

exerciseSessionSchema.methods.getDuration = function(): number {
  if (!this.endTime) return 0;
  return this.endTime.getTime() - this.startTime.getTime();
};

export const ExerciseSession = mongoose.model<IExerciseSession>('ExerciseSession', exerciseSessionSchema);
export const ProgressRecord = mongoose.model<IProgressRecord>('ProgressRecord', progressRecordSchema);
export const FluencyReport = mongoose.model<IFluencyReport>('FluencyReport', fluencyReportSchema);