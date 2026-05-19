import type { Request, Response } from "express";

import {
  sendError,
  sendSuccess,
  sendValidationError,
} from "../../../shared/http/api-response";
import { handleControllerError } from "../../../shared/http/handle-controller-error";
import { parseRouteId } from "../../../shared/http/parse-route-id";
import {
  createAsaDivisionBodySchema,
  updateAsaDivisionBodySchema,
} from "./asa-divisions.schemas";
import * as asaDivisionsService from "./asa-divisions.service";

export async function listAsaDivisions(
  _req: Request,
  res: Response,
): Promise<void> {
  try {
    const rows = await asaDivisionsService.listAsaDivisions();
    sendSuccess(res, rows, { message: "ASA divisions listed successfully" });
  } catch (err) {
    handleControllerError(
      res,
      err,
      "listAsaDivisions",
      "Failed to list ASA divisions",
    );
  }
}

export async function createAsaDivision(
  req: Request,
  res: Response,
): Promise<void> {
  const parsed = createAsaDivisionBodySchema.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, parsed.error);
    return;
  }
  try {
    const row = await asaDivisionsService.createAsaDivision(parsed.data);
    sendSuccess(res, row, {
      httpStatus: 201,
      message: "ASA division created successfully",
    });
  } catch (err) {
    handleControllerError(
      res,
      err,
      "createAsaDivision",
      "Failed to create ASA division",
    );
  }
}

export async function getAsaDivision(
  req: Request,
  res: Response,
): Promise<void> {
  const id = parseRouteId(req.params.id);
  if (id === null) {
    sendError(res, 400, "Invalid id");
    return;
  }
  try {
    const row = await asaDivisionsService.getAsaDivision(id);
    if (!row) {
      sendError(res, 404, "ASA division not found");
      return;
    }
    sendSuccess(res, row, { message: "ASA division fetched successfully" });
  } catch (err) {
    handleControllerError(
      res,
      err,
      "getAsaDivision",
      "Failed to get ASA division",
    );
  }
}

export async function updateAsaDivision(
  req: Request,
  res: Response,
): Promise<void> {
  const id = parseRouteId(req.params.id);
  if (id === null) {
    sendError(res, 400, "Invalid id");
    return;
  }
  const parsed = updateAsaDivisionBodySchema.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, parsed.error);
    return;
  }
  try {
    const row = await asaDivisionsService.updateAsaDivision(id, parsed.data);
    if (!row) {
      sendError(res, 404, "ASA division not found");
      return;
    }
    sendSuccess(res, row, { message: "ASA division updated successfully" });
  } catch (err) {
    handleControllerError(
      res,
      err,
      "updateAsaDivision",
      "Failed to update ASA division",
    );
  }
}

export async function deleteAsaDivision(
  req: Request,
  res: Response,
): Promise<void> {
  const id = parseRouteId(req.params.id);
  if (id === null) {
    sendError(res, 400, "Invalid id");
    return;
  }
  try {
    const deleted = await asaDivisionsService.deleteAsaDivision(id);
    if (!deleted) {
      sendError(res, 404, "ASA division not found");
      return;
    }
    sendSuccess(res, null, { message: "ASA division deleted successfully" });
  } catch (err) {
    handleControllerError(
      res,
      err,
      "deleteAsaDivision",
      "Failed to delete ASA division",
    );
  }
}
