/**
 * Single place to read and validate environment variables.
 * Import `env` from here instead of scattering `process.env` across the app.
 */
function required(name: string): string {
  const v = process.env[name]?.trim();
  if (!v) {
    throw new Error(
      `${name} is not set. Add it to your .env (see env.example).`,
    );
  }
  return v;
}

function optional(name: string, fallback: string): string {
  const v = process.env[name]?.trim();
  return v && v !== "" ? v : fallback;
}

function optionalPositiveInt(name: string, fallback: number): number {
  const v = process.env[name]?.trim();
  if (!v) {
    return fallback;
  }
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

const nodeEnv = optional("NODE_ENV", "development");

export const env = {
  nodeEnv,
  isDevelopment: nodeEnv === "development",
  port: Number(process.env.PORT) || 3000,
  databaseUrl: required("DATABASE_URL"),
  jwtSecret: required("JWT_SECRET"),
  googleClientId: required("GOOGLE_CLIENT_ID"),
  frontendOrigin: optional("FRONTEND_ORIGIN", "http://localhost:5173"),
  /** Max auth attempts (login/refresh) per IP per `rateLimitAuthWindowMs`. */
  rateLimitAuthMax: optionalPositiveInt("RATE_LIMIT_AUTH_MAX", 20),
  rateLimitAuthWindowMs: optionalPositiveInt(
    "RATE_LIMIT_AUTH_WINDOW_MS",
    15 * 60 * 1000,
  ),
  /** Max API requests per IP per `rateLimitApiWindowMs` (applies under `/api/v1`). */
  rateLimitApiMax: optionalPositiveInt("RATE_LIMIT_API_MAX", 120),
  rateLimitApiWindowMs: optionalPositiveInt(
    "RATE_LIMIT_API_WINDOW_MS",
    60 * 1000,
  ),
};
