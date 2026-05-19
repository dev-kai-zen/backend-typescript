import type { Request, Response } from "express";

import {
  sendError,
  sendSuccess,
  sendValidationError,
} from "../../../shared/http/api-response";
import { handleControllerError } from "../../../shared/http/handle-controller-error";
import { parseRouteId } from "../../../shared/http/parse-route-id";
import {
  createAsaBranchTypeBodySchema,
  updateAsaBranchTypeBodySchema,
} from "./asa-branch-type.schemas";
import * as asaBranchTypeService from "./asa-branch-type.service";

export async function listAsaBranchTypes(
  _req: Request,
  res: Response,
): Promise<void> {
  try {
    const rows = await asaBranchTypeService.listAsaBranchTypes();
    sendSuccess(res, rows, { message: "ASA branch types listed successfully" });
  } catch (err) {
    handleControllerError(
      res,
      err,
      "listAsaBranchTypes",
      "Failed to list ASA branch types",
    );
  }
}

export async function createAsaBranchType(
  req: Request,
  res: Response,
): Promise<void> {
  const parsed = createAsaBranchTypeBodySchema.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, parsed.error);
    return;
  }
  try {
    const row = await asaBranchTypeService.createAsaBranchType(parsed.data);
    sendSuccess(res, row, {
      httpStatus: 201,
      message: "ASA branch type created successfully",
    });
  } catch (err) {
    handleControllerError(
      res,
      err,
      "createAsaBranchType",
      "Failed to create ASA branch type",
    );
  }
}

export async function getAsaBranchType(
  req: Request,
  res: Response,
): Promise<void> {
  const id = parseRouteId(req.params.id);
  if (id === null) {
    sendError(res, 400, "Invalid id");
    return;
  }
  try {
    const row = await asaBranchTypeService.getAsaBranchType(id);
    if (!row) {
      sendError(res, 404, "ASA branch type not found");
      return;
    }
    sendSuccess(res, row, { message: "ASA branch type fetched successfully" });
  } catch (err) {
    handleControllerError(
      res,
      err,
      "getAsaBranchType",
      "Failed to get ASA branch type",
    );
  }
}

export async function updateAsaBranchType(
  req: Request,
  res: Response,
): Promise<void> {
  const id = parseRouteId(req.params.id);
  if (id === null) {
    sendError(res, 400, "Invalid id");
    return;
  }
  const parsed = updateAsaBranchTypeBodySchema.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, parsed.error);
    return;
  }
  try {
    const row = await asaBranchTypeService.updateAsaBranchType(id, parsed.data);
    if (!row) {
      sendError(res, 404, "ASA branch type not found");
      return;
    }
    sendSuccess(res, row, { message: "ASA branch type updated successfully" });
  } catch (err) {
    handleControllerError(
      res,
      err,
      "updateAsaBranchType",
      "Failed to update ASA branch type",
    );
  }
}

export async function deleteAsaBranchType(
  req: Request,
  res: Response,
): Promise<void> {
  const id = parseRouteId(req.params.id);
  if (id === null) {
    sendError(res, 400, "Invalid id");
    return;
  }
  try {
    const deleted = await asaBranchTypeService.deleteAsaBranchType(id);
    if (!deleted) {
      sendError(res, 404, "ASA branch type not found");
      return;
    }
    sendSuccess(res, null, { message: "ASA branch type deleted successfully" });
  } catch (err) {
    handleControllerError(
      res,
      err,
      "deleteAsaBranchType",
      "Failed to delete ASA branch type",
    );
  }
}
