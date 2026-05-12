import { Router } from "express";

import {
  createAsaArea,
  deleteAsaArea,
  getAsaArea,
  listAsaAreas,
  updateAsaArea,
} from "./asa-areas.controller";

export const asaAreasRoutes = Router();

asaAreasRoutes.get("/", listAsaAreas);
asaAreasRoutes.post("/", createAsaArea);
asaAreasRoutes.get("/:id", getAsaArea);
asaAreasRoutes.patch("/:id", updateAsaArea);
asaAreasRoutes.delete("/:id", deleteAsaArea);
