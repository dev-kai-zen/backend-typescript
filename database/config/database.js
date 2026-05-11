/**
 * Sequelize CLI reads this file (CommonJS). Load the same DATABASE_URL as the app (`src/config/sequelize-config.ts`).
 *
 * Commands: see `npm run migration:*` and `npm run seed:*` in package.json.
 */
require("dotenv/config");

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Add it to .env before running Sequelize CLI migrations.",
  );
}

/** Philippine Standard Time (PHT): UTC+8; keep CLI migrations aligned with app `sequelize-config.ts`. */
const PHILIPPINE_TIMEZONE = "+08:00";

const shared = {
  url: process.env.DATABASE_URL,
  dialect: "mysql",
  timezone: PHILIPPINE_TIMEZONE,
  logging: process.env.SEQUELIZE_LOG_SQL === "1" ? console.log : false,
};

module.exports = {
  development: { ...shared },
  test: { ...shared },
  production: { ...shared },
};
