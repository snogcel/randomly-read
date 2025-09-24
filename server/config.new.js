require('dotenv').config();

module.exports = {
  port: process.env.PORT || 8080,
  db: {
    prod: process.env.DATABASE_URL || 'mongodb://localhost:27017/production',
    test: process.env.TEST_DATABASE_URL || 'mongodb://localhost:27017/reddit_test',
    dev: process.env.DEV_DATABASE_URL || 'mongodb://localhost:27017/easyonset_dev',
    // Mongoose 8.x - most options are now defaults
    options: {
      // Only include options that are still needed
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'development_secret',
    expiry: process.env.JWT_EXPIRY || '999999d'
  },
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://easyonset.com', 'https://www.easyonset.com']
      : ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true
  }
};