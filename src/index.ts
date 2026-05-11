import "dotenv/config";

import "./modules/users/users.model";
import "./modules/audit-logs/audit-logs.model";
import "./modules/user-logs/user-logs.model";
import "./modules/rbac/roles/roles.model";
import "./modules/rbac/permissions/rbac-permissions.model";
import "./modules/rbac/groups/rbac-groups.model";
import "./modules/rbac/role-permissions/rbac-role-permissions.model";
import "./modules/rbac/user-roles/rbac-user-roles.model";
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
