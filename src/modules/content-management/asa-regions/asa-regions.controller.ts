import type { Request, Response } from "express";

import {
  sendError,
  sendSuccess,
  sendValidationError,
} from "../../../shared/http/api-response";
import { handleControllerError } from "../../../shared/http/handle-controller-error";
import { parseRouteId } from "../../../shared/http/parse-route-id";
import {
  createAsaRegionBodySchema,
  updateAsaRegionBodySchema,
} from "./asa-regions.schemas";
import * as asaRegionsService from "./asa-regions.service";

export async function listAsaRegions(
  _req: Request,
  res: Response,
): Promise<void> {
  try {
    const rows = await asaRegionsService.listAsaRegions();
    sendSuccess(res, rows, { message: "ASA regions listed successfully" });
  } catch (err) {
    handleControllerError(res, err, "listAsaRegions", "Failed to list ASA regions");
  }
}

export async function createAsaRegion(
  req: Request,
  res: Response,
): Promise<void> {
  const parsed = createAsaRegionBodySchema.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, parsed.error);
    return;
  }
  try {
    const row = await asaRegionsService.createAsaRegion(parsed.data);
    sendSuccess(res, row, {
      httpStatus: 201,
      message: "ASA region created successfully",
    });
  } catch (err) {
    handleControllerError(res, err, "createAsaRegion", "Failed to create ASA region");
  }
}

export async function getAsaRegion(req: Request, res: Response): Promise<void> {
  const id = parseRouteId(req.params.id);
  if (id === null) {
    sendError(res, 400, "Invalid id");
    return;
  }
  try {
    const row = await asaRegionsService.getAsaRegion(id);
    if (!row) {
      sendError(res, 404, "ASA region not found");
      return;
    }
    sendSuccess(res, row, { message: "ASA region fetched successfully" });
  } catch (err) {
    handleControllerError(res, err, "getAsaRegion", "Failed to get ASA region");
  }
}

export async function updateAsaRegion(
  req: Request,
  res: Response,
): Promise<void> {
  const id = parseRouteId(req.params.id);
  if (id === null) {
    sendError(res, 400, "Invalid id");
    return;
  }
  const parsed = updateAsaRegionBodySchema.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, parsed.error);
    return;
  }
  try {
    const row = await asaRegionsService.updateAsaRegion(id, parsed.data);
    if (!row) {
      sendError(res, 404, "ASA region not found");
      return;
    }
    sendSuccess(res, row, { message: "ASA region updated successfully" });
  } catch (err) {
    handleControllerError(res, err, "updateAsaRegion", "Failed to update ASA region");
  }
}

export async function deleteAsaRegion(
  req: Request,
  res: Response,
): Promise<void> {
  const id = parseRouteId(req.params.id);
  if (id === null) {
    sendError(res, 400, "Invalid id");
    return;
  }
  try {
    const deleted = await asaRegionsService.deleteAsaRegion(id);
    if (!deleted) {
      sendError(res, 404, "ASA region not found");
      return;
    }
    sendSuccess(res, null, { message: "ASA region deleted successfully" });
  } catch (err) {
    handleControllerError(res, err, "deleteAsaRegion", "Failed to delete ASA region");
  }
}
