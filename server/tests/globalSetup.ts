export default async function globalSetup() {
  // Set test environment variables
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test_jwt_secret_key_for_testing_only';
  process.env.BCRYPT_ROUNDS = '4'; // Faster for testing
  process.env.LOG_LEVEL = 'error'; // Reduce log noise during tests
}