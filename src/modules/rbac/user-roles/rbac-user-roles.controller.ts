import type { Request, Response } from "express";

import {
  sendError,
  sendSuccess,
  sendValidationError,
} from "../../../shared/http/api-response";
import { handleControllerError } from "../../../shared/http/handle-controller-error";
import { parseRouteId } from "../../../shared/http/parse-route-id";
import {
  createUserRoleBodySchema,
  setUserRolesBodySchema,
} from "./rbac-user-roles.schemas";
import * as rbacUserRolesService from "./rbac-user-roles.service";

export async function listUserRoles(
  req: Request,
  res: Response,
): Promise<void> {
  const userId = parseRouteId(req.params.userId);
  if (userId === null) {
    sendError(res, 400, "Invalid userId");
    return;
  }
  try {
    const rows = await rbacUserRolesService.listUserRoles(userId);
    sendSuccess(res, rows, { message: "User roles listed successfully" });
  } catch (err) {
    handleControllerError(res, err, "listUserRoles", "Failed to list user roles");
  }
}

export async function setUserRoles(req: Request, res: Response): Promise<void> {
  const userId = parseRouteId(req.params.userId);
  if (userId === null) {
    sendError(res, 400, "Invalid userId");
    return;
  }
  const parsed = setUserRolesBodySchema.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, parsed.error);
    return;
  }
  try {
    const rows = await rbacUserRolesService.setUserRoles(
      userId,
      parsed.data.roleIds,
      parsed.data.assignedBy,
    );
    if (!rows) {
      sendError(res, 404, "User not found");
      return;
    }
    sendSuccess(res, rows, { message: "User roles updated successfully" });
  } catch (err) {
    handleControllerError(res, err, "setUserRoles", "Failed to set user roles");
  }
}

export async function createUserRole(
  req: Request,
  res: Response,
): Promise<void> {
  const userId = parseRouteId(req.params.userId);
  if (userId === null) {
    sendError(res, 400, "Invalid userId");
    return;
  }
  const parsed = createUserRoleBodySchema.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, parsed.error);
    return;
  }
  try {
    const row = await rbacUserRolesService.createUserRole({
      userId,
      roleId: parsed.data.roleId,
      assignedBy: parsed.data.assignedBy,
    });
    sendSuccess(res, row, {
      httpStatus: 201,
      message: "Role assigned to user successfully",
    });
  } catch (err) {
    handleControllerError(
      res,
      err,
      "createUserRole",
      "Failed to assign role to user",
    );
  }
}

export async function deleteUserRole(
  req: Request,
  res: Response,
): Promise<void> {
  const userId = parseRouteId(req.params.userId);
  const roleId = parseRouteId(req.params.roleId);
  if (userId === null || roleId === null) {
    sendError(res, 400, "Invalid userId or roleId");
    return;
  }
  try {
    const deleted = await rbacUserRolesService.deleteUserRole(userId, roleId);
    if (!deleted) {
      sendError(res, 404, "User role link not found");
      return;
    }
    sendSuccess(res, null, { message: "User role removed successfully" });
  } catch (err) {
    handleControllerError(
      res,
      err,
      "deleteUserRole",
      "Failed to remove user role",
    );
  }
}
