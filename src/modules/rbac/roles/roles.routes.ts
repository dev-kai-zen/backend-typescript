import { Router } from "express";

import {
  createRolePermission,
  deleteRolePermission,
  listRolePermissions,
} from "../role-permissions/rbac-role-permissions.controller";
import {
  createRole,
  deleteRole,
  getRole,
  listRoles,
  updateRole,
} from "./roles.controller";

export const rbacRolesRoutes = Router();

rbacRolesRoutes.get("/", listRoles);
rbacRolesRoutes.post("/", createRole);
rbacRolesRoutes.get("/:id/permissions", listRolePermissions);
rbacRolesRoutes.post("/:id/permissions", createRolePermission);
rbacRolesRoutes.delete(
  "/:id/permissions/:permissionId",
  deleteRolePermission,
);
rbacRolesRoutes.get("/:id", getRole);
rbacRolesRoutes.patch("/:id", updateRole);
rbacRolesRoutes.delete("/:id", deleteRole);
