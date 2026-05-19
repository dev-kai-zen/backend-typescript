import type { Request, Response } from "express";

import {
  sendError,
  sendSuccess,
  sendValidationError,
} from "../../../shared/http/api-response";
import { handleControllerError } from "../../../shared/http/handle-controller-error";
import { parseRouteId } from "../../../shared/http/parse-route-id";
import {
  createAsaOperationBodySchema,
  updateAsaOperationBodySchema,
} from "./asa-operations.schemas";
import * as asaOperationsService from "./asa-operations.service";

export async function listAsaOperations(
  _req: Request,
  res: Response,
): Promise<void> {
  try {
    const rows = await asaOperationsService.listAsaOperations();
    sendSuccess(res, rows, { message: "ASA operations listed successfully" });
  } catch (err) {
    handleControllerError(
      res,
      err,
      "listAsaOperations",
      "Failed to list ASA operations",
    );
  }
}

export async function createAsaOperation(
  req: Request,
  res: Response,
): Promise<void> {
  const parsed = createAsaOperationBodySchema.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, parsed.error);
    return;
  }
  try {
    const row = await asaOperationsService.createAsaOperation(parsed.data);
    sendSuccess(res, row, {
      httpStatus: 201,
      message: "ASA operation created successfully",
    });
  } catch (err) {
    handleControllerError(
      res,
      err,
      "createAsaOperation",
      "Failed to create ASA operation",
    );
  }
}

export async function getAsaOperation(
  req: Request,
  res: Response,
): Promise<void> {
  const id = parseRouteId(req.params.id);
  if (id === null) {
    sendError(res, 400, "Invalid id");
    return;
  }
  try {
    const row = await asaOperationsService.getAsaOperation(id);
    if (!row) {
      sendError(res, 404, "ASA operation not found");
      return;
    }
    sendSuccess(res, row, { message: "ASA operation fetched successfully" });
  } catch (err) {
    handleControllerError(
      res,
      err,
      "getAsaOperation",
      "Failed to get ASA operation",
    );
  }
}

export async function updateAsaOperation(
  req: Request,
  res: Response,
): Promise<void> {
  const id = parseRouteId(req.params.id);
  if (id === null) {
    sendError(res, 400, "Invalid id");
    return;
  }
  const parsed = updateAsaOperationBodySchema.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, parsed.error);
    return;
  }
  try {
    const row = await asaOperationsService.updateAsaOperation(id, parsed.data);
    if (!row) {
      sendError(res, 404, "ASA operation not found");
      return;
    }
    sendSuccess(res, row, { message: "ASA operation updated successfully" });
  } catch (err) {
    handleControllerError(
      res,
      err,
      "updateAsaOperation",
      "Failed to update ASA operation",
    );
  }
}

export async function deleteAsaOperation(
  req: Request,
  res: Response,
): Promise<void> {
  const id = parseRouteId(req.params.id);
  if (id === null) {
    sendError(res, 400, "Invalid id");
    return;
  }
  try {
    const deleted = await asaOperationsService.deleteAsaOperation(id);
    if (!deleted) {
      sendError(res, 404, "ASA operation not found");
      return;
    }
    sendSuccess(res, null, { message: "ASA operation deleted successfully" });
  } catch (err) {
    handleControllerError(
      res,
      err,
      "deleteAsaOperation",
      "Failed to delete ASA operation",
    );
  }
}
