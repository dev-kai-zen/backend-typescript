import { Router } from "express";

import {
  createAsaBranchType,
  deleteAsaBranchType,
  getAsaBranchType,
  listAsaBranchTypes,
  updateAsaBranchType,
} from "./asa-branch-type.controller";

export const asaBranchTypeRoutes = Router();

asaBranchTypeRoutes.get("/", listAsaBranchTypes);
asaBranchTypeRoutes.post("/", createAsaBranchType);
asaBranchTypeRoutes.get("/:id", getAsaBranchType);
asaBranchTypeRoutes.patch("/:id", updateAsaBranchType);
asaBranchTypeRoutes.delete("/:id", deleteAsaBranchType);
