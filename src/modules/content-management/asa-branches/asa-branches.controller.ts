import type { Request, Response } from "express";

import {
  sendError,
  sendSuccess,
  sendValidationError,
} from "../../../shared/http/api-response";
import { handleControllerError } from "../../../shared/http/handle-controller-error";
import { parseRouteId } from "../../../shared/http/parse-route-id";
import {
  createAsaBranchBodySchema,
  updateAsaBranchBodySchema,
} from "./asa-branches.schemas";
import * as asaBranchesService from "./asa-branches.service";

export async function listAsaBranches(
  _req: Request,
  res: Response,
): Promise<void> {
  try {
    const rows = await asaBranchesService.listAsaBranches();
    sendSuccess(res, rows, { message: "ASA branches listed successfully" });
  } catch (err) {
    handleControllerError(res, err, "listAsaBranches", "Failed to list ASA branches");
  }
}

export async function createAsaBranch(
  req: Request,
  res: Response,
): Promise<void> {
  const parsed = createAsaBranchBodySchema.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, parsed.error);
    return;
  }
  try {
    const row = await asaBranchesService.createAsaBranch(parsed.data);
    sendSuccess(res, row, {
      httpStatus: 201,
      message: "ASA branch created successfully",
    });
  } catch (err) {
    handleControllerError(res, err, "createAsaBranch", "Failed to create ASA branch");
  }
}

export async function getAsaBranch(req: Request, res: Response): Promise<void> {
  const id = parseRouteId(req.params.id);
  if (id === null) {
    sendError(res, 400, "Invalid id");
    return;
  }
  try {
    const row = await asaBranchesService.getAsaBranch(id);
    if (!row) {
      sendError(res, 404, "ASA branch not found");
      return;
    }
    sendSuccess(res, row, { message: "ASA branch fetched successfully" });
  } catch (err) {
    handleControllerError(res, err, "getAsaBranch", "Failed to get ASA branch");
  }
}

export async function updateAsaBranch(
  req: Request,
  res: Response,
): Promise<void> {
  const id = parseRouteId(req.params.id);
  if (id === null) {
    sendError(res, 400, "Invalid id");
    return;
  }
  const parsed = updateAsaBranchBodySchema.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, parsed.error);
    return;
  }
  try {
    const row = await asaBranchesService.updateAsaBranch(id, parsed.data);
    if (!row) {
      sendError(res, 404, "ASA branch not found");
      return;
    }
    sendSuccess(res, row, { message: "ASA branch updated successfully" });
  } catch (err) {
    handleControllerError(res, err, "updateAsaBranch", "Failed to update ASA branch");
  }
}

export async function deleteAsaBranch(
  req: Request,
  res: Response,
): Promise<void> {
  const id = parseRouteId(req.params.id);
  if (id === null) {
    sendError(res, 400, "Invalid id");
    return;
  }
  try {
    const deleted = await asaBranchesService.deleteAsaBranch(id);
    if (!deleted) {
      sendError(res, 404, "ASA branch not found");
      return;
    }
    sendSuccess(res, null, { message: "ASA branch deleted successfully" });
  } catch (err) {
    handleControllerError(res, err, "deleteAsaBranch", "Failed to delete ASA branch");
  }
}
