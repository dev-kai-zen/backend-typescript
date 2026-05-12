import { Router } from "express";

import {
  createAsaBranch,
  deleteAsaBranch,
  getAsaBranch,
  listAsaBranches,
  updateAsaBranch,
} from "./asa-branches.controller";

export const asaBranchesRoutes = Router();

asaBranchesRoutes.get("/", listAsaBranches);
asaBranchesRoutes.post("/", createAsaBranch);
asaBranchesRoutes.get("/:id", getAsaBranch);
asaBranchesRoutes.patch("/:id", updateAsaBranch);
asaBranchesRoutes.delete("/:id", deleteAsaBranch);
