import { Router } from "express";

import {
  createUserRole,
  deleteUserRole,
  listUserRoles,
} from "./rbac-user-roles.controller";

export const rbacUserRolesRoutes = Router();

rbacUserRolesRoutes.get("/users/:userId/roles", listUserRoles);
rbacUserRolesRoutes.post("/users/:userId/roles", createUserRole);
rbacUserRolesRoutes.delete(
  "/users/:userId/roles/:roleId",
  deleteUserRole,
);
