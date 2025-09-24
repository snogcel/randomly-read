import mongoose, { Document } from 'mongoose';
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
    duration: number;
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
    validateSteps(): boolean;
    getTotalDuration(): number;
    getStepCount(): number;
}
export declare const Routine: mongoose.Model<IRoutine, {}, {}, {}, mongoose.Document<unknown, {}, IRoutine> & IRoutine & {
    _id: mongoose.Types.ObjectId;
}, any>;
//# sourceMappingURL=Routine.d.ts.map