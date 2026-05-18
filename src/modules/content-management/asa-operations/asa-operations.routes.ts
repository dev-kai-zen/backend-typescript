import { Router } from "express";

import * as asaOperationsController from "./asa-operations.controller";

export const asaOperationsRoutes = Router();

asaOperationsRoutes.get("/", asaOperationsController.listAsaOperations);
asaOperationsRoutes.post("/", asaOperationsController.createAsaOperation);
asaOperationsRoutes.get("/:id", asaOperationsController.getAsaOperation);
asaOperationsRoutes.patch("/:id", asaOperationsController.updateAsaOperation);
asaOperationsRoutes.delete("/:id", asaOperationsController.deleteAsaOperation);
