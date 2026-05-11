import { Router } from "express";

import {
  createGroup,
  deleteGroup,
  getGroup,
  listGroups,
  updateGroup,
} from "./rbac-groups.controller";

export const rbacGroupsRoutes = Router();

rbacGroupsRoutes.get("/", listGroups);
rbacGroupsRoutes.post("/", createGroup);
rbacGroupsRoutes.get("/:id", getGroup);
rbacGroupsRoutes.patch("/:id", updateGroup);
rbacGroupsRoutes.delete("/:id", deleteGroup);
