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
exports.Word = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const definitionSchema = new mongoose_1.Schema({
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
const voteSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    vote: { type: Number, required: true, enum: [-1, 0, 1] }
}, { _id: false });
const wordSchema = new mongoose_1.Schema({
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
    collection: 'words'
});
wordSchema.index({ consonant: 1, vowel: 1, position: 1 });
wordSchema.index({ syllables: 1, type: 1 });
wordSchema.index({ age_of_acquisition: 1 });
wordSchema.index({ subtype: 1, type: 1 });
wordSchema.index({ lexeme: 'text' });
wordSchema.index({ score: -1 });
wordSchema.set('toJSON', {
    getters: true,
    virtuals: true,
    transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});
wordSchema.virtual('upvotePercentage').get(function () {
    if (this.votes.length === 0)
        return 0;
    const upvotes = this.votes.filter(vote => vote.vote === 1);
    return Math.floor((upvotes.length / this.votes.length) * 100);
});
wordSchema.methods.vote = async function (userId, voteValue) {
    const existingVote = this.votes.find((vote) => vote.user.equals(userId));
    if (existingVote) {
        this.score -= existingVote.vote;
        if (voteValue === 0) {
            this.votes = this.votes.filter((vote) => !vote.user.equals(userId));
        }
        else {
            this.score += voteValue;
            existingVote.vote = voteValue;
        }
    }
    else if (voteValue !== 0) {
        this.score += voteValue;
        this.votes.push({ user: userId, vote: voteValue });
    }
    return await this.save();
};
wordSchema.methods.getUpvotePercentage = function () {
    if (this.votes.length === 0)
        return 0;
    const upvotes = this.votes.filter((vote) => vote.vote === 1);
    return Math.floor((upvotes.length / this.votes.length) * 100);
};
wordSchema.methods.incrementViews = async function () {
    this.views += 1;
    return await this.save();
};
exports.Word = mongoose_1.default.model('Word', wordSchema);
//# sourceMappingURL=Word.js.map