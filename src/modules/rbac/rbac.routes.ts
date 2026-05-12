import { Router } from "express";

import { rbacCategoriesRoutes } from "./categories/rbac-categories.routes";
import { rbacPermissionsRoutes } from "./permissions/rbac-permissions.routes";
import { rbacRolePermissionsRoutes } from "./role-permissions/rbac-role-permissions.routes";
import { rbacRolesRoutes } from "./roles/rbac-roles.routes";
import { rbacUserRolesRoutes } from "./user-roles/rbac-user-roles.routes";

export const rbacRoutes = Router();

rbacRoutes.use("/categories", rbacCategoriesRoutes);
rbacRoutes.use("/roles", rbacRolePermissionsRoutes);
rbacRoutes.use("/roles", rbacRolesRoutes);
rbacRoutes.use("/permissions", rbacPermissionsRoutes);
rbacRoutes.use("/", rbacUserRolesRoutes);
