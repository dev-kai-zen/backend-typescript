import "dotenv/config";

/** Registers all Sequelize models + associations (`shared/models`). */
import "./shared/models";

import { createApp } from "./app";
import { env } from "./config/env-config";
import { sequelize } from "./config/sequelize-config";

async function start() {
  const app = createApp();

  await sequelize.authenticate();
  console.log("Database connection OK");

  app.listen(env.port, () => {
    console.log(`Listening on http://localhost:${env.port}`);
  });
}

start().catch((err) => {
  console.error("Server failed to start:", err);
  process.exit(1);
});
