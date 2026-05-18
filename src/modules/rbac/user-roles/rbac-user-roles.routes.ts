import { Router } from "express";

import * as rbacUserRoleController from "./rbac-user-roles.controller";

export const rbacUserRolesRoutes = Router();

rbacUserRolesRoutes.get("/users/:userId/roles", rbacUserRoleController.listUserRoles);
rbacUserRolesRoutes.put("/users/:userId/roles", rbacUserRoleController.setUserRoles);
rbacUserRolesRoutes.post("/users/:userId/roles", rbacUserRoleController.createUserRole);
rbacUserRolesRoutes.delete(
  "/users/:userId/roles/:roleId",
  rbacUserRoleController.deleteUserRole,
);
