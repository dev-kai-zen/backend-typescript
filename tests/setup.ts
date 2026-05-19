/**
 * Runs before test files load. Ensures `env-config` can initialize without a real `.env`.
 */
process.env.NODE_ENV = "test";
process.env.DATABASE_URL ??=
  "mysql://test:test@127.0.0.1:3306/test_db";
process.env.JWT_SECRET ??= "test-jwt-secret-for-vitest-only";
process.env.GOOGLE_CLIENT_ID ??=
  "test-google-client-id.apps.googleusercontent.com";
