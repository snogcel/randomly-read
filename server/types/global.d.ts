// Global type declarations for server-side

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT?: string;
      MONGODB_URI?: string;
      JWT_SECRET?: string;
      JWT_EXPIRES_IN?: string;
      CORS_ORIGIN?: string;
      EMAIL_HOST?: string;
      EMAIL_PORT?: string;
      EMAIL_USER?: string;
      EMAIL_PASS?: string;
    }
  }
}

// Module declarations for packages without proper TypeScript support
declare module 'sentencer' {
  export function make(template: string): string;
  export function configure(config: any): void;
}

declare module 'apollo-server-express' {
  export class ApolloServer {
    constructor(config: any);
    applyMiddleware(config: any): void;
    createHandler(config?: any): any;
  }
  export const gql: any;
}

declare module 'graphql-tools' {
  export function makeExecutableSchema(config: any): any;
}

export {};