import { GraphQLScalarType } from 'graphql';
export declare const resolvers: {
    Date: GraphQLScalarType<Date | null, string | null>;
    Query: {
        words(_: any, { input }: any, { user }: any): Promise<import("../services/WordService").WordFilterResult>;
        word(_: any, { id }: any, { user }: any): Promise<import("../models/Word").IWord>;
        randomWord(_: any, { input }: any, { user }: any): Promise<import("../models/Word").IWord | null>;
        sentences(_: any, { input }: any, { user }: any): Promise<import("../services/SentenceService").GeneratedSentence>;
        routines(_: any, { input }: any, { user }: any): Promise<{
            routines: import("../models/Routine").IRoutine[];
            totalCount: number;
            hasMore: boolean;
        }>;
        routine(_: any, { id }: any, { user }: any): Promise<import("../models/Routine").IRoutine>;
        userRoutines(_: any, { userId }: any, { user }: any): Promise<import("../models/Routine").IRoutine[]>;
        exerciseSessions(_: any, { userId, routineId, limit, offset }: any, { user }: any): Promise<import("../models/Progress").IExerciseSession[]>;
        exerciseSession(_: any, { id }: any, { user }: any): Promise<import("../models/Progress").IExerciseSession>;
        progressRecords(_: any, { userId, routineId, startDate, endDate }: any, { user }: any): Promise<import("../models/Progress").IProgressRecord[]>;
        fluencyReport(_: any, { userId, routineId, startDate, endDate }: any, { user }: any): Promise<import("../models/Progress").IFluencyReport>;
        me(_: any, __: any, { user }: any): Promise<any>;
        users(_: any, { limit, offset }: any, { user }: any): Promise<{
            users: import("../models/User").IUser[];
            totalCount: number;
            hasMore: boolean;
        }>;
        user(_: any, { id }: any, { user }: any): Promise<import("../models/User").IUser | null>;
        defaultRoutines(): Promise<import("../services/DefaultRoutineService").DefaultRoutineConfig[]>;
        defaultRoutine(_: any, { id }: any): Promise<import("../services/DefaultRoutineService").DefaultRoutineConfig>;
        recommendedRoutine(_: any, { userLevel }: any): Promise<import("../services/DefaultRoutineService").DefaultRoutineConfig>;
    };
    Mutation: {
        voteWord(_: any, { wordId, vote }: any, { user }: any): Promise<import("../models/Word").IWord>;
        createRoutine(_: any, { input }: any, { user }: any): Promise<import("../models/Routine").IRoutine>;
        createRoutineFromDefault(_: any, { defaultRoutineId }: any, { user }: any): Promise<import("../models/Routine").IRoutine>;
        updateRoutine(_: any, { id, input }: any, { user }: any): Promise<import("../models/Routine").IRoutine>;
        deleteRoutine(_: any, { id }: any, { user }: any): Promise<boolean>;
        assignRoutine(_: any, { routineId, userIds }: any, { user }: any): Promise<boolean>;
        unassignRoutine(_: any, { routineId, userIds }: any, { user }: any): Promise<boolean>;
        createExerciseSession(_: any, { input }: any, { user }: any): Promise<import("../models/Progress").IExerciseSession>;
        updateExerciseSession(_: any, { id, input }: any, { user }: any): Promise<import("../models/Progress").IExerciseSession>;
        addWordAttempt(_: any, { sessionId, attempt }: any, { user }: any): Promise<import("../models/Progress").IExerciseSession>;
        completeExerciseSession(_: any, { id }: any, { user }: any): Promise<import("../models/Progress").IExerciseSession>;
        updateProfile(_: any, { firstName, lastName, email }: any, { user }: any): Promise<import("../models/User").IUser>;
    };
    Routine: {
        totalDuration(routine: any): any;
        stepCount(routine: any): any;
    };
    ExerciseSession: {
        duration(session: any): any;
    };
    Word: {
        upvotePercentage(word: any): any;
    };
};
//# sourceMappingURL=resolvers.d.ts.map