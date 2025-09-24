import mongoose, { Document } from 'mongoose';
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
    company?: string;
    clients?: string[];
    isActive?: boolean;
    createdAt: Date;
    updatedAt: Date;
    isValidPassword(password: string): Promise<boolean>;
    getPublicProfile(): Partial<IUser>;
}
export declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser> & IUser & {
    _id: mongoose.Types.ObjectId;
}, any>;
//# sourceMappingURL=User.d.ts.map