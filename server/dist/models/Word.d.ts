import mongoose, { Document } from 'mongoose';
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
    vote: number;
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
    vote(userId: mongoose.Types.ObjectId, voteValue: number): Promise<IWord>;
    getUpvotePercentage(): number;
    incrementViews(): Promise<IWord>;
}
export declare const Word: mongoose.Model<IWord, {}, {}, {}, mongoose.Document<unknown, {}, IWord> & IWord & {
    _id: mongoose.Types.ObjectId;
}, any>;
//# sourceMappingURL=Word.d.ts.map