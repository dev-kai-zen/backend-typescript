import { Sequelize } from "sequelize";

/** Runtime connection. Schema changes belong in Sequelize CLI migrations (`database/migrations/`). See `npm run migration:*`. */
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "Missing DATABASE_URL. Create a .env file (see .env.example) with your MySQL URL.",
  );
}

const PHILIPPINE_TIMEZONE = "+08:00";

export const sequelize = new Sequelize(databaseUrl, {
  dialect: "mysql",
  timezone: PHILIPPINE_TIMEZONE,
  logging:
    process.env.NODE_ENV === "development"
      ? (sql: string) => {
          console.log(sql);
        }
      : false,
});
