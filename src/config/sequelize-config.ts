import { Sequelize } from "sequelize";

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
