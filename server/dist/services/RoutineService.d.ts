import { IRoutine, ISubroutineStep } from '../models/Routine';
import { DefaultRoutineConfig } from './DefaultRoutineService';
export interface CreateRoutineData {
    name: string;
    description?: string;
    gradeLevel?: string;
    subroutine: ISubroutineStep[];
    assignedUsers?: string[];
}
export interface UpdateRoutineData {
    name?: string;
    description?: string;
    gradeLevel?: string;
    subroutine?: ISubroutineStep[];
    assignedUsers?: string[];
    isActive?: boolean;
}
export interface RoutineQueryOptions {
    createdBy?: string;
    assignedTo?: string;
    isActive?: boolean;
    gradeLevel?: string;
    limit?: number;
    offset?: number;
    sortBy?: 'name' | 'createdAt' | 'updatedAt';
    sortOrder?: 'asc' | 'desc';
}
export declare class RoutineService {
    private static instance;
    static getInstance(): RoutineService;
    createRoutine(createdBy: string, data: CreateRoutineData): Promise<IRoutine>;
    getRoutineById(id: string, userId?: string): Promise<IRoutine | null>;
    updateRoutine(id: string, userId: string, data: UpdateRoutineData): Promise<IRoutine>;
    deleteRoutine(id: string, userId: string): Promise<void>;
    queryRoutines(options: RoutineQueryOptions): Promise<{
        routines: IRoutine[];
        totalCount: number;
        hasMore: boolean;
    }>;
    getUserRoutines(userId: string): Promise<IRoutine[]>;
    assignRoutineToUsers(routineId: string, userIds: string[], assignedBy: string): Promise<void>;
    unassignRoutineFromUsers(routineId: string, userIds: string[], unassignedBy: string): Promise<void>;
    validateRoutineConfig(subroutine: ISubroutineStep[]): {
        isValid: boolean;
        errors: string[];
    };
    private hasRoutineAccess;
    getDefaultRoutines(): DefaultRoutineConfig[];
    getDefaultRoutineById(id: string): DefaultRoutineConfig | null;
    createRoutineFromDefault(userId: string, defaultRoutineId: string): Promise<IRoutine>;
    getRecommendedRoutine(userLevel?: string): DefaultRoutineConfig;
}
//# sourceMappingURL=RoutineService.d.ts.map