import { Router } from "express";

import * as rbacPermissionController from "./rbac-permissions.controller";

export const rbacPermissionsRoutes = Router();

rbacPermissionsRoutes.get("/", rbacPermissionController.listPermissions);
rbacPermissionsRoutes.post("/", rbacPermissionController.createPermission);
rbacPermissionsRoutes.get("/:id", rbacPermissionController.getPermission);
rbacPermissionsRoutes.patch("/:id", rbacPermissionController.updatePermission);
rbacPermissionsRoutes.delete("/:id", rbacPermissionController.deletePermission);
