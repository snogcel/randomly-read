// Environment configuration types

export interface DatabaseConfig {
  uri: string;
  options: {
    useNewUrlParser: boolean;
    useUnifiedTopology: boolean;
    useCreateIndex?: boolean;
    useFindAndModify?: boolean;
  };
}

export interface JWTConfig {
  secret: string;
  expiresIn: string;
  algorithm: 'HS256' | 'HS384' | 'HS512';
}

export interface CORSConfig {
  origin: string | string[] | boolean;
  credentials: boolean;
  optionsSuccessStatus: number;
}

export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

export interface ServerConfig {
  port: number;
  environment: 'development' | 'production' | 'test';
  database: DatabaseConfig;
  jwt: JWTConfig;
  cors: CORSConfig;
  email: EmailConfig;
}

export interface GraphQLConfig {
  typeDefs: any;
  resolvers: any;
  context: (req: any) => any;
  introspection: boolean;
  playground: boolean;
}

export const getServerConfig = (): ServerConfig => ({
  port: parseInt(process.env.PORT || '4000', 10),
  environment: (process.env.NODE_ENV as any) || 'development',
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/randomlyread',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    algorithm: 'HS256',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
  },
  email: {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER || '',
      pass: process.env.EMAIL_PASS || '',
    },
  },
});