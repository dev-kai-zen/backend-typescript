import { Router } from "express";

import * as asaAreasController from "./asa-areas.controller";

export const asaAreasRoutes = Router();

asaAreasRoutes.get("/", asaAreasController.listAsaAreas);
asaAreasRoutes.post("/", asaAreasController.createAsaArea);
asaAreasRoutes.get("/:id", asaAreasController.getAsaArea);
asaAreasRoutes.patch("/:id", asaAreasController.updateAsaArea);
asaAreasRoutes.delete("/:id", asaAreasController.deleteAsaArea);
