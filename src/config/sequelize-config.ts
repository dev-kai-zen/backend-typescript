import { Sequelize } from "sequelize";

/**
 * Database connection lives in ONE place so you always know where to look.
 *
 * 1. Copy `.env.example` to `.env`
 * 2. Set `DATABASE_URL` (MySQL connection string)
 *
 * Later, when you add models, import `sequelize` here or in each model file
 * using `sequelize.define(...)` — see Sequelize docs for "Model definition".
 */
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "Missing DATABASE_URL. Create a .env file (see .env.example) with your MySQL URL.",
  );
}

export const sequelize = new Sequelize(databaseUrl, {
  dialect: "mysql",
  logging:
    process.env.NODE_ENV === "development"
      ? (sql) => {
          console.log(sql);
        }
      : false,
});
