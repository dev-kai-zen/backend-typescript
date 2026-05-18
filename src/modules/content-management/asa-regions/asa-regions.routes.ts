import { Router } from "express";

import * as asaRegionsController from "./asa-regions.controller";

export const asaRegionsRoutes = Router();

asaRegionsRoutes.get("/", asaRegionsController.listAsaRegions);
asaRegionsRoutes.post("/", asaRegionsController.createAsaRegion);
asaRegionsRoutes.get("/:id", asaRegionsController.getAsaRegion);
asaRegionsRoutes.patch("/:id",asaRegionsController.updateAsaRegion);
asaRegionsRoutes.delete("/:id", asaRegionsController.deleteAsaRegion);
