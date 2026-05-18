import { Router } from "express";

import * as asaBranchesController from "./asa-branches.controller";

export const asaBranchesRoutes = Router();

asaBranchesRoutes.get("/", asaBranchesController.listAsaBranches);
asaBranchesRoutes.post("/", asaBranchesController.createAsaBranch);
asaBranchesRoutes.get("/:id", asaBranchesController.getAsaBranch);
asaBranchesRoutes.patch("/:id", asaBranchesController.updateAsaBranch);
asaBranchesRoutes.delete("/:id", asaBranchesController.deleteAsaBranch);
