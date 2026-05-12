import { Router } from "express";

import { rbacGroupsRoutes } from "./groups/rbac-groups.routes";
import { rbacPermissionsRoutes } from "./permissions/rbac-permissions.routes";
import { rbacRolePermissionsRoutes } from "./role-permissions/rbac-role-permissions.routes";
import { rbacRolesRoutes } from "./roles/roles.routes";
import { rbacUserRolesRoutes } from "./user-roles/rbac-user-roles.routes";

export const rbacRoutes = Router();

rbacRoutes.use("/groups", rbacGroupsRoutes);
rbacRoutes.use("/roles", rbacRolePermissionsRoutes);
rbacRoutes.use("/roles", rbacRolesRoutes);
rbacRoutes.use("/permissions", rbacPermissionsRoutes);
rbacRoutes.use("/", rbacUserRolesRoutes);
