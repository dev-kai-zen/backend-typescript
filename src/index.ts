import "dotenv/config";

import { createApp } from "./app";
import { registerModuleModels } from "./bootstrap/register-module-models";
import { buildV1ModulesRouter } from "./bootstrap/register-module-routes";
import { env } from "./config/env-config";
import { sequelize } from "./config/sequelize-config";

async function start(): Promise<void> {
  await registerModuleModels();
  const v1ModulesRouter = await buildV1ModulesRouter();
  const app = createApp(v1ModulesRouter);

  await sequelize.authenticate();
  console.log("Database connection OK");

  app.listen(env.port, () => {
    console.log(`Listening on http://localhost:${env.port}`);
  });
}

start().catch((err: unknown) => {
  console.error("Server failed to start:", err);
  process.exit(1);
});
