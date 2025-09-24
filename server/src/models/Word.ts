import mongoose, { Document, Schema } from 'mongoose';

export interface IDefinition {
  synsetid: number;
  wordid: number;
  lemma: string;
  casedwordid: number;
  senseid: number;
  sensenum: number;
  lexid: number;
  tagcount: number;
  sensekey: string;
  pos: string;
  lexdomainid: number;
  definition: string;
}

export interface IVote {
  user: mongoose.Types.ObjectId;
  vote: number; // -1, 0, 1
}

export interface IWord extends Document {
  cmudict_id: number;
  wordid: number;
  lexeme: string;
  consonant: string;
  vowel: string;
  type: string;
  subtype: string;
  stress: number;
  syllables: number;
  position: 'initial' | 'medial' | 'final';
  age_of_acquisition?: number;
  wordsXsensesXsynsets: IDefinition[];
  score: number;
  votes: IVote[];
  views: number;
  createdAt: Date;
  updatedAt: Date;
  
  // Methods
  vote(userId: mongoose.Types.ObjectId, voteValue: number): Promise<IWord>;
  getUpvotePercentage(): number;
  incrementViews(): Promise<IWord>;
}

const definitionSchema = new Schema<IDefinition>({
  synsetid: { type: Number, required: true },
  wordid: { type: Number, required: true },
  lemma: { type: String, required: true },
  casedwordid: { type: Number, required: true },
  senseid: { type: Number, required: true },
  sensenum: { type: Number, required: true },
  lexid: { type: Number, required: true },
  tagcount: { type: Number, required: true },
  sensekey: { type: String, required: true },
  pos: { type: String, required: true },
  lexdomainid: { type: Number, required: true },
  definition: { type: String, required: true }
}, { _id: false });

const voteSchema = new Schema<IVote>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  vote: { type: Number, required: true, enum: [-1, 0, 1] }
}, { _id: false });

const wordSchema = new Schema<IWord>({
  cmudict_id: { type: Number, required: true, unique: true },
  wordid: { type: Number, required: true },
  lexeme: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 100
  },
  consonant: { 
    type: String, 
    required: true,
    enum: ['B', 'CH', 'D', 'DH', 'F', 'G', 'HH', 'JH', 'K', 'L', 'M', 'N', 'NG', 'P', 'R', 'S', 'SH', 'T', 'TH', 'V', 'W', 'Y', 'Z', 'ZH']
  },
  vowel: { 
    type: String, 
    required: true,
    enum: ['AA', 'AE', 'AH', 'AO', 'AW', 'AY', 'EH', 'ER', 'EY', 'IH', 'IY', 'OW', 'OY', 'UH', 'UW']
  },
  type: { 
    type: String, 
    required: true,
    enum: ['noun', 'verb', 'adj', 'adv', 'other']
  },
  subtype: { 
    type: String, 
    required: false,
    enum: ['animal', 'location', 'person', 'food', 'artifact', 'all', 'other']
  },
  stress: { 
    type: Number, 
    required: true,
    min: 0,
    max: 2
  },
  syllables: { 
    type: Number, 
    required: true,
    min: 1,
    max: 10
  },
  position: { 
    type: String, 
    required: true,
    enum: ['initial', 'medial', 'final']
  },
  age_of_acquisition: { 
    type: Number, 
    required: false,
    min: 0,
    max: 20
  },
  wordsXsensesXsynsets: [definitionSchema],
  score: { 
    type: Number, 
    default: 0 
  },
  votes: [voteSchema],
  views: { 
    type: Number, 
    default: 0 
  }
}, { 
  timestamps: true,
  collection: 'words' // Ensure consistent collection name
});

// Compound indexes for efficient phonetic queries
wordSchema.index({ consonant: 1, vowel: 1, position: 1 });
wordSchema.index({ syllables: 1, type: 1 });
wordSchema.index({ age_of_acquisition: 1 });
wordSchema.index({ subtype: 1, type: 1 });
wordSchema.index({ lexeme: 'text' });
wordSchema.index({ score: -1 });

// Transform output
wordSchema.set('toJSON', { 
  getters: true,
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

// Virtual for upvote percentage
wordSchema.virtual('upvotePercentage').get(function(this: IWord) {
  if (this.votes.length === 0) return 0;
  const upvotes = this.votes.filter(vote => vote.vote === 1);
  return Math.floor((upvotes.length / this.votes.length) * 100);
});

// Instance methods
wordSchema.methods.vote = async function(userId: mongoose.Types.ObjectId, voteValue: number): Promise<IWord> {
  const existingVote = this.votes.find(vote => vote.user.equals(userId));
  
  if (existingVote) {
    // Update existing vote
    this.score -= existingVote.vote;
    if (voteValue === 0) {
      // Remove vote
      this.votes = this.votes.filter(vote => !vote.user.equals(userId));
    } else {
      // Change vote
      this.score += voteValue;
      existingVote.vote = voteValue;
    }
  } else if (voteValue !== 0) {
    // Add new vote
    this.score += voteValue;
    this.votes.push({ user: userId, vote: voteValue });
  }
  
  return await this.save();
};

wordSchema.methods.getUpvotePercentage = function(): number {
  if (this.votes.length === 0) return 0;
  const upvotes = this.votes.filter(vote => vote.vote === 1);
  return Math.floor((upvotes.length / this.votes.length) * 100);
};

wordSchema.methods.incrementViews = async function(): Promise<IWord> {
  this.views += 1;
  return await this.save();
};

export const Word = mongoose.model<IWord>('Word', wordSchema);