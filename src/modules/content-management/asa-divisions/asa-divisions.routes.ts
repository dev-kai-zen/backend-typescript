import { Router } from "express";

import * as asaDivisionsController from "./asa-divisions.controller";

export const asaDivisionsRoutes = Router();

asaDivisionsRoutes.get("/", asaDivisionsController.listAsaDivisions);
asaDivisionsRoutes.post("/", asaDivisionsController.createAsaDivision);
asaDivisionsRoutes.get("/:id", asaDivisionsController.getAsaDivision);
asaDivisionsRoutes.patch("/:id", asaDivisionsController.updateAsaDivision);
asaDivisionsRoutes.delete("/:id", asaDivisionsController.deleteAsaDivision);
