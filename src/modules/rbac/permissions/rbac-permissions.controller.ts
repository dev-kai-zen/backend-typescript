import type { Request, Response } from "express";

import {
  sendError,
  sendSuccess,
  sendValidationError,
} from "../../../shared/http/api-response";
import { handleControllerError } from "../../../shared/http/handle-controller-error";
import { parseRouteId } from "../../../shared/http/parse-route-id";
import {
  createPermissionBodySchema,
  listPermissionsQuerySchema,
  updatePermissionBodySchema,
} from "./rbac-permissions.schemas";
import * as rbacPermissionsService from "./rbac-permissions.service";

function firstQueryString(val: unknown): string | undefined {
  if (typeof val === "string") {
    return val;
  }
  if (Array.isArray(val) && typeof val[0] === "string") {
    return val[0];
  }
  return undefined;
}

export async function listPermissions(
  req: Request,
  res: Response,
): Promise<void> {
  const parsed = listPermissionsQuerySchema.safeParse({
    categoryId: firstQueryString(req.query.categoryId),
  });
  if (!parsed.success) {
    sendValidationError(res, parsed.error);
    return;
  }
  try {
    const rows = await rbacPermissionsService.listPermissions(parsed.data);
    sendSuccess(res, rows, { message: "Permissions listed successfully" });
  } catch (err) {
    handleControllerError(res, err, "listPermissions", "Failed to list permissions");
  }
}

export async function createPermission(
  req: Request,
  res: Response,
): Promise<void> {
  const parsed = createPermissionBodySchema.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, parsed.error);
    return;
  }
  try {
    const row = await rbacPermissionsService.createPermission(parsed.data);
    sendSuccess(res, row, {
      httpStatus: 201,
      message: "Permission created successfully",
    });
  } catch (err) {
    handleControllerError(
      res,
      err,
      "createPermission",
      "Failed to create permission",
    );
  }
}

export async function getPermission(
  req: Request,
  res: Response,
): Promise<void> {
  const id = parseRouteId(req.params.id);
  if (id === null) {
    sendError(res, 400, "Invalid id");
    return;
  }
  try {
    const row = await rbacPermissionsService.getPermission(id);
    if (!row) {
      sendError(res, 404, "Permission not found");
      return;
    }
    sendSuccess(res, row, { message: "Permission fetched successfully" });
  } catch (err) {
    handleControllerError(res, err, "getPermission", "Failed to get permission");
  }
}

export async function updatePermission(
  req: Request,
  res: Response,
): Promise<void> {
  const id = parseRouteId(req.params.id);
  if (id === null) {
    sendError(res, 400, "Invalid id");
    return;
  }
  const parsed = updatePermissionBodySchema.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, parsed.error);
    return;
  }
  try {
    const row = await rbacPermissionsService.updatePermission(id, parsed.data);
    if (!row) {
      sendError(res, 404, "Permission not found");
      return;
    }
    sendSuccess(res, row, { message: "Permission updated successfully" });
  } catch (err) {
    handleControllerError(
      res,
      err,
      "updatePermission",
      "Failed to update permission",
    );
  }
}

export async function deletePermission(
  req: Request,
  res: Response,
): Promise<void> {
  const id = parseRouteId(req.params.id);
  if (id === null) {
    sendError(res, 400, "Invalid id");
    return;
  }
  try {
    const deleted = await rbacPermissionsService.deletePermission(id);
    if (!deleted) {
      sendError(res, 404, "Permission not found");
      return;
    }
    sendSuccess(res, null, { message: "Permission deleted successfully" });
  } catch (err) {
    handleControllerError(
      res,
      err,
      "deletePermission",
      "Failed to delete permission",
    );
  }
}
