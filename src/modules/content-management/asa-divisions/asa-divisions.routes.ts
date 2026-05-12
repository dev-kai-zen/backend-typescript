import { Router } from "express";

import {
  createAsaDivision,
  deleteAsaDivision,
  getAsaDivision,
  listAsaDivisions,
  updateAsaDivision,
} from "./asa-divisions.controller";

export const asaDivisionsRoutes = Router();

asaDivisionsRoutes.get("/", listAsaDivisions);
asaDivisionsRoutes.post("/", createAsaDivision);
asaDivisionsRoutes.get("/:id", getAsaDivision);
asaDivisionsRoutes.patch("/:id", updateAsaDivision);
asaDivisionsRoutes.delete("/:id", deleteAsaDivision);
