export declare const config: {
    readonly port: number;
    readonly nodeEnv: string;
    readonly database: {
        readonly url: string;
        readonly options: {
            readonly maxPoolSize: 10;
            readonly serverSelectionTimeoutMS: 5000;
            readonly socketTimeoutMS: 45000;
            readonly bufferCommands: false;
        };
    };
    readonly redis: {
        readonly url: string;
        readonly ttl: number;
    };
    readonly wordDatabase: {
        readonly maxQueryLimit: number;
        readonly defaultLimit: number;
        readonly cacheEnabled: boolean;
        readonly cacheTTL: number;
    };
    readonly exercise: {
        readonly maxSessionDuration: number;
        readonly timerPrecision: number;
    };
    readonly logging: {
        readonly level: string;
        readonly format: string;
    };
    readonly security: {
        readonly bcryptRounds: number;
        readonly rateLimitWindow: number;
        readonly rateLimitMax: number;
    };
    readonly cors: {
        readonly origin: string;
        readonly credentials: true;
    };
};
//# sourceMappingURL=index.d.ts.map