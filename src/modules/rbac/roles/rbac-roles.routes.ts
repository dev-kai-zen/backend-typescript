import { Router } from "express";

import {
  createRole,
  deleteRole,
  getRole,
  listRoles,
  updateRole,
} from "./rbac-roles.controller";

export const rbacRolesRoutes = Router();

rbacRolesRoutes.get("/", listRoles);
rbacRolesRoutes.post("/", createRole);
rbacRolesRoutes.get("/:id", getRole);
rbacRolesRoutes.patch("/:id", updateRole);
rbacRolesRoutes.delete("/:id", deleteRole);
