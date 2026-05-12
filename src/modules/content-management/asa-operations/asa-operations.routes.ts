import { Router } from "express";

import {
  createAsaOperation,
  deleteAsaOperation,
  getAsaOperation,
  listAsaOperations,
  updateAsaOperation,
} from "./asa-operations.controller";

export const asaOperationsRoutes = Router();

asaOperationsRoutes.get("/", listAsaOperations);
asaOperationsRoutes.post("/", createAsaOperation);
asaOperationsRoutes.get("/:id", getAsaOperation);
asaOperationsRoutes.patch("/:id", updateAsaOperation);
asaOperationsRoutes.delete("/:id", deleteAsaOperation);
