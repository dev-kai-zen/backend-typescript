import "dotenv/config";

import { createApp } from "./app";
import { sequelize } from "./config/sequelize-config";

const port = Number(process.env.PORT) || 3000;

async function start() {
  const app = createApp();

  await sequelize.authenticate();
  console.log("Database connection OK");

  app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });
}

start().catch((err) => {
  console.error("Server failed to start:", err);
  process.exit(1);
});
