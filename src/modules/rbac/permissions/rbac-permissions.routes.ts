import { Router } from "express";

import {
  createPermission,
  deletePermission,
  getPermission,
  listPermissions,
  updatePermission,
} from "./rbac-permissions.controller";

export const rbacPermissionsRoutes = Router();

rbacPermissionsRoutes.get("/", listPermissions);
rbacPermissionsRoutes.post("/", createPermission);
rbacPermissionsRoutes.get("/:id", getPermission);
rbacPermissionsRoutes.patch("/:id", updatePermission);
rbacPermissionsRoutes.delete("/:id", deletePermission);
