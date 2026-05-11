import "dotenv/config";

import "./modules/users/users.model";
import "./modules/refresh-token/refresh-token.model";
import "./modules/audit-logs/audit-logs.model";
import "./modules/user-logs/user-logs.model";
import "./modules/rbac/roles/roles.model";
import "./modules/rbac/permissions/rbac-permissions.model";
import "./modules/rbac/groups/rbac-groups.model";
import "./modules/rbac/role-permissions/rbac-role-permissions.model";
import "./modules/rbac/user-roles/rbac-user-roles.model";
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
