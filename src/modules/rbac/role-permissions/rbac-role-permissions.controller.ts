import type { Request, Response } from "express";

import {
  sendError,
  sendSuccess,
  sendValidationError,
} from "../../../shared/http/api-response";
import { handleControllerError } from "../../../shared/http/handle-controller-error";
import { parseRouteId } from "../../../shared/http/parse-route-id";
import {
  createRolePermissionBodySchema,
  setRolePermissionsBodySchema,
} from "./rbac-role-permissions.schemas";
import * as rbacRolePermissionsService from "./rbac-role-permissions.service";

export async function listRolePermissions(
  req: Request,
  res: Response,
): Promise<void> {
  const roleId = parseRouteId(req.params.id);
  if (roleId === null) {
    sendError(res, 400, "Invalid role id");
    return;
  }
  try {
    const rows = await rbacRolePermissionsService.listRolePermissions(roleId);
    sendSuccess(res, rows, { message: "Role permissions listed successfully" });
  } catch (err) {
    handleControllerError(
      res,
      err,
      "listRolePermissions",
      "Failed to list role permissions",
    );
  }
}

export async function setRolePermissions(
  req: Request,
  res: Response,
): Promise<void> {
  const roleId = parseRouteId(req.params.id);
  if (roleId === null) {
    sendError(res, 400, "Invalid role id");
    return;
  }
  const parsed = setRolePermissionsBodySchema.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, parsed.error);
    return;
  }
  try {
    const rows = await rbacRolePermissionsService.setRolePermissions(
      roleId,
      parsed.data.permissionIds,
    );
    if (!rows) {
      sendError(res, 404, "Role not found");
      return;
    }
    sendSuccess(res, rows, { message: "Role permissions updated successfully" });
  } catch (err) {
    handleControllerError(
      res,
      err,
      "setRolePermissions",
      "Failed to set role permissions",
    );
  }
}

export async function createRolePermission(
  req: Request,
  res: Response,
): Promise<void> {
  const roleId = parseRouteId(req.params.id);
  if (roleId === null) {
    sendError(res, 400, "Invalid role id");
    return;
  }
  const parsed = createRolePermissionBodySchema.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, parsed.error);
    return;
  }
  try {
    const row = await rbacRolePermissionsService.createRolePermission({
      roleId,
      permissionId: parsed.data.permissionId,
    });
    sendSuccess(res, row, {
      httpStatus: 201,
      message: "Permission assigned to role successfully",
    });
  } catch (err) {
    handleControllerError(
      res,
      err,
      "createRolePermission",
      "Failed to assign permission to role",
    );
  }
}

export async function deleteRolePermission(
  req: Request,
  res: Response,
): Promise<void> {
  const roleId = parseRouteId(req.params.id);
  const permissionId = parseRouteId(req.params.permissionId);
  if (roleId === null || permissionId === null) {
    sendError(res, 400, "Invalid role id or permissionId");
    return;
  }
  try {
    const deleted = await rbacRolePermissionsService.deleteRolePermission(
      roleId,
      permissionId,
    );
    if (!deleted) {
      sendError(res, 404, "Role permission link not found");
      return;
    }
    sendSuccess(res, null, { message: "Role permission removed successfully" });
  } catch (err) {
    handleControllerError(
      res,
      err,
      "deleteRolePermission",
      "Failed to remove role permission",
    );
  }
}
