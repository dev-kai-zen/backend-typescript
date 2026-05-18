import { Router } from "express";

import * as asaBranchTypeController from "./asa-branch-type.controller";

export const asaBranchTypeRoutes = Router();

asaBranchTypeRoutes.get("/", asaBranchTypeController.listAsaBranchTypes);
asaBranchTypeRoutes.post("/", asaBranchTypeController.createAsaBranchType);
asaBranchTypeRoutes.get("/:id", asaBranchTypeController.getAsaBranchType);
asaBranchTypeRoutes.patch("/:id", asaBranchTypeController.updateAsaBranchType);
asaBranchTypeRoutes.delete("/:id", asaBranchTypeController.deleteAsaBranchType);
