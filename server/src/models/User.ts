import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { config } from '../config';

export interface IUser extends Document {
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  routines?: string[];
  interactionSettings?: any[];
  age?: number;
  gender?: string;
  address?: string;
  city?: string;
  stateProvince?: string;
  postalCode?: string;
  country?: string;
  admin?: boolean;
  superuser?: boolean;
  company?: string;
  clients?: string[];
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
  
  // Methods
  isValidPassword(password: string): Promise<boolean>;
  getPublicProfile(): Partial<IUser>;
}

const userSchema = new Schema<IUser>({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6
  },
  firstName: { 
    type: String, 
    required: false,
    trim: true,
    maxlength: 50
  },
  lastName: { 
    type: String, 
    required: false,
    trim: true,
    maxlength: 50
  },
  email: { 
    type: String, 
    required: false,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  routines: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Routine' 
  }],
  interactionSettings: [{ 
    type: Schema.Types.Mixed 
  }],
  age: { 
    type: Number, 
    required: false,
    min: 1,
    max: 120
  },
  gender: { 
    type: String, 
    required: false,
    enum: ['male', 'female', 'other', 'prefer-not-to-say']
  },
  address: { 
    type: String, 
    required: false,
    maxlength: 200
  },
  city: { 
    type: String, 
    required: false,
    maxlength: 100
  },
  stateProvince: { 
    type: String, 
    required: false,
    maxlength: 100
  },
  postalCode: { 
    type: String, 
    required: false,
    maxlength: 20
  },
  country: { 
    type: String, 
    required: false,
    maxlength: 100
  },
  admin: { 
    type: Boolean, 
    required: false,
    default: false
  },
  superuser: { 
    type: Boolean, 
    required: false,
    default: false
  },
  company: { 
    type: String, 
    required: false,
    maxlength: 100
  },
  clients: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  isActive: { 
    type: Boolean, 
    required: false,
    default: true
  }
}, { 
  timestamps: true,
  collation: { locale: 'en', strength: 1 }
});

// Indexes
userSchema.index({ username: 1 });
userSchema.index({ email: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ admin: 1, superuser: 1 });

// Transform output
userSchema.set('toJSON', { 
  getters: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    return ret;
  }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    this.password = await bcrypt.hash(this.password, config.security.bcryptRounds);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Instance methods
userSchema.methods.isValidPassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getPublicProfile = function (): Partial<IUser> {
  const { password, ...publicProfile } = this.toObject();
  return publicProfile;
};

export const User = mongoose.model<IUser>('User', userSchema);