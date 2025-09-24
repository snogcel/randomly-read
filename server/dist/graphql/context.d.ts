import { Request } from 'express';
import { UserService } from '../services/UserService';
export interface GraphQLContext {
    user: any | null;
    req: Request;
    userService: UserService;
}
export declare function createContext({ req }: {
    req: Request;
}): Promise<GraphQLContext>;
//# sourceMappingURL=context.d.ts.map