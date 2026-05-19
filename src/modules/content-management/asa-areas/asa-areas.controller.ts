import type { Request, Response } from "express";

import {
  sendError,
  sendSuccess,
  sendValidationError,
} from "../../../shared/http/api-response";
import { handleControllerError } from "../../../shared/http/handle-controller-error";
import { parseRouteId } from "../../../shared/http/parse-route-id";
import {
  createAsaAreaBodySchema,
  updateAsaAreaBodySchema,
} from "./asa-areas.schemas";
import * as asaAreasService from "./asa-areas.service";

export async function listAsaAreas(_req: Request, res: Response): Promise<void> {
  try {
    const rows = await asaAreasService.listAsaAreas();
    sendSuccess(res, rows, { message: "ASA areas listed successfully" });
  } catch (err) {
    handleControllerError(res, err, "listAsaAreas", "Failed to list ASA areas");
  }
}

export async function createAsaArea(req: Request, res: Response): Promise<void> {
  const parsed = createAsaAreaBodySchema.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, parsed.error);
    return;
  }
  try {
    const row = await asaAreasService.createAsaArea(parsed.data);
    sendSuccess(res, row, {
      httpStatus: 201,
      message: "ASA area created successfully",
    });
  } catch (err) {
    handleControllerError(res, err, "createAsaArea", "Failed to create ASA area");
  }
}

export async function getAsaArea(req: Request, res: Response): Promise<void> {
  const id = parseRouteId(req.params.id);
  if (id === null) {
    sendError(res, 400, "Invalid id");
    return;
  }
  try {
    const row = await asaAreasService.getAsaArea(id);
    if (!row) {
      sendError(res, 404, "ASA area not found");
      return;
    }
    sendSuccess(res, row, { message: "ASA area fetched successfully" });
  } catch (err) {
    handleControllerError(res, err, "getAsaArea", "Failed to get ASA area");
  }
}

export async function updateAsaArea(req: Request, res: Response): Promise<void> {
  const id = parseRouteId(req.params.id);
  if (id === null) {
    sendError(res, 400, "Invalid id");
    return;
  }
  const parsed = updateAsaAreaBodySchema.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, parsed.error);
    return;
  }
  try {
    const row = await asaAreasService.updateAsaArea(id, parsed.data);
    if (!row) {
      sendError(res, 404, "ASA area not found");
      return;
    }
    sendSuccess(res, row, { message: "ASA area updated successfully" });
  } catch (err) {
    handleControllerError(res, err, "updateAsaArea", "Failed to update ASA area");
  }
}

export async function deleteAsaArea(req: Request, res: Response): Promise<void> {
  const id = parseRouteId(req.params.id);
  if (id === null) {
    sendError(res, 400, "Invalid id");
    return;
  }
  try {
    const deleted = await asaAreasService.deleteAsaArea(id);
    if (!deleted) {
      sendError(res, 404, "ASA area not found");
      return;
    }
    sendSuccess(res, null, { message: "ASA area deleted successfully" });
  } catch (err) {
    handleControllerError(res, err, "deleteAsaArea", "Failed to delete ASA area");
  }
}
