import { Router } from "express";

import {
  createAsaRegion,
  deleteAsaRegion,
  getAsaRegion,
  listAsaRegions,
  updateAsaRegion,
} from "./asa-regions.controller";

export const asaRegionsRoutes = Router();

asaRegionsRoutes.get("/", listAsaRegions);
asaRegionsRoutes.post("/", createAsaRegion);
asaRegionsRoutes.get("/:id", getAsaRegion);
asaRegionsRoutes.patch("/:id", updateAsaRegion);
asaRegionsRoutes.delete("/:id", deleteAsaRegion);
