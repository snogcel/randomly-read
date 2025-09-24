import mongoose, { Document, Schema } from 'mongoose';

export interface IPhoneticConfiguration {
  vowels: string[];
  consonants: string[];
  position: 'initial' | 'medial' | 'final';
  syllables: number[];
  gradeLevel: string;
}

export interface ISubroutineStep {
  id: string;
  type: 'word' | 'sentence' | 'intermission';
  duration: number; // in seconds
  repetitions: number;
  phoneticConfig?: IPhoneticConfiguration;
  intermissionText?: string;
}

export interface IRoutine extends Document {
  name: string;
  description?: string;
  gradeLevel?: string;
  subroutine: ISubroutineStep[];
  createdBy: mongoose.Types.ObjectId;
  assignedUsers: mongoose.Types.ObjectId[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  
  // Methods
  validateSteps(): boolean;
  getTotalDuration(): number;
  getStepCount(): number;
}

const phoneticConfigurationSchema = new Schema<IPhoneticConfiguration>({
  vowels: [{ 
    type: String, 
    required: true,
    enum: ['AA', 'AE', 'AH', 'AO', 'AW', 'AY', 'EH', 'ER', 'EY', 'IH', 'IY', 'OW', 'OY', 'UH', 'UW']
  }],
  consonants: [{ 
    type: String, 
    required: true,
    enum: ['B', 'CH', 'D', 'DH', 'F', 'G', 'HH', 'JH', 'K', 'L', 'M', 'N', 'NG', 'P', 'R', 'S', 'SH', 'T', 'TH', 'V', 'W', 'Y', 'Z', 'ZH']
  }],
  position: { 
    type: String, 
    required: true,
    enum: ['initial', 'medial', 'final']
  },
  syllables: [{ 
    type: Number, 
    required: true,
    min: 1,
    max: 10
  }],
  gradeLevel: { 
    type: String, 
    required: true,
    enum: ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'adult']
  }
}, { _id: false });

const subroutineStepSchema = new Schema<ISubroutineStep>({
  id: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    required: true,
    enum: ['word', 'sentence', 'intermission']
  },
  duration: { 
    type: Number, 
    required: true,
    min: 1,
    max: 3600 // max 1 hour per step
  },
  repetitions: { 
    type: Number, 
    required: true,
    min: 1,
    max: 1000
  },
  phoneticConfig: {
    type: phoneticConfigurationSchema,
    required: function(this: ISubroutineStep) {
      return this.type === 'word' || this.type === 'sentence';
    }
  },
  intermissionText: { 
    type: String, 
    required: function(this: ISubroutineStep) {
      return this.type === 'intermission';
    },
    maxlength: 500
  }
}, { _id: false });

const routineSchema = new Schema<IRoutine>({
  name: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100
  },
  description: { 
    type: String, 
    required: false,
    trim: true,
    maxlength: 500
  },
  gradeLevel: { 
    type: String, 
    required: false,
    enum: ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'adult']
  },
  subroutine: {
    type: [subroutineStepSchema],
    required: true,
    validate: {
      validator: function(steps: ISubroutineStep[]) {
        return steps.length > 0 && steps.length <= 50; // reasonable limits
      },
      message: 'Routine must have between 1 and 50 steps'
    }
  },
  createdBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  assignedUsers: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, { 
  timestamps: true,
  collation: { locale: 'en', strength: 1 }
});

// Indexes
routineSchema.index({ createdBy: 1 });
routineSchema.index({ assignedUsers: 1 });
routineSchema.index({ isActive: 1 });
routineSchema.index({ name: 'text', description: 'text' });

// Transform output
routineSchema.set('toJSON', { 
  getters: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

// Instance methods
routineSchema.methods.validateSteps = function(): boolean {
  return this.subroutine.every((step: ISubroutineStep) => {
    if (step.type === 'intermission') {
      return !!step.intermissionText;
    }
    return !!step.phoneticConfig;
  });
};

routineSchema.methods.getTotalDuration = function(): number {
  return this.subroutine.reduce((total: number, step: ISubroutineStep) => {
    return total + (step.duration * step.repetitions);
  }, 0);
};

routineSchema.methods.getStepCount = function(): number {
  return this.subroutine.length;
};

export const Routine = mongoose.model<IRoutine>('Routine', routineSchema);