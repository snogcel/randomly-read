import { IUser } from '../models/User';
export interface CreateUserData {
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    age?: number;
    gender?: string;
    company?: string;
}
export interface UpdateUserData {
    firstName?: string;
    lastName?: string;
    email?: string;
    age?: number;
    gender?: string;
    address?: string;
    city?: string;
    stateProvince?: string;
    postalCode?: string;
    country?: string;
    company?: string;
    isActive?: boolean;
}
export interface UserQueryOptions {
    limit?: number;
    offset?: number;
    isActive?: boolean;
    company?: string;
    sortBy?: 'username' | 'createdAt' | 'updatedAt';
    sortOrder?: 'asc' | 'desc';
}
export interface LoginCredentials {
    username: string;
    password: string;
}
export interface AuthResult {
    user: IUser;
    token: string;
}
export declare class UserService {
    private static instance;
    static getInstance(): UserService;
    createUser(data: CreateUserData): Promise<IUser>;
    login(credentials: LoginCredentials): Promise<AuthResult>;
    getUserById(id: string): Promise<IUser | null>;
    getUserByUsername(username: string): Promise<IUser | null>;
    updateUser(id: string, data: UpdateUserData): Promise<IUser>;
    deleteUser(id: string): Promise<void>;
    getUsers(options?: UserQueryOptions): Promise<{
        users: IUser[];
        totalCount: number;
        hasMore: boolean;
    }>;
    assignClientToTherapist(therapistId: string, clientId: string): Promise<void>;
    unassignClientFromTherapist(therapistId: string, clientId: string): Promise<void>;
    getTherapistClients(therapistId: string): Promise<IUser[]>;
    changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void>;
}
//# sourceMappingURL=UserService.d.ts.map