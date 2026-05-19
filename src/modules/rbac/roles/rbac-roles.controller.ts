import type { Request, Response } from "express";

import {
  sendError,
  sendSuccess,
  sendValidationError,
} from "../../../shared/http/api-response";
import { handleControllerError } from "../../../shared/http/handle-controller-error";
import { parseRouteId } from "../../../shared/http/parse-route-id";
import {
  createRoleBodySchema,
  updateRoleBodySchema,
} from "./rbac-roles.schemas";
import * as rolesService from "./rbac-roles.service";

export async function listRoles(_req: Request, res: Response): Promise<void> {
  try {
    const roles = await rolesService.listRoles();
    sendSuccess(res, roles, { message: "Roles listed successfully" });
  } catch (err) {
    handleControllerError(res, err, "listRoles", "Failed to list roles");
  }
}

export async function createRole(req: Request, res: Response): Promise<void> {
  const parsed = createRoleBodySchema.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, parsed.error);
    return;
  }
  try {
    const role = await rolesService.createRole(parsed.data);
    sendSuccess(res, role, {
      httpStatus: 201,
      message: "Role created successfully",
    });
  } catch (err) {
    handleControllerError(res, err, "createRole", "Failed to create role");
  }
}

export async function getRole(req: Request, res: Response): Promise<void> {
  const id = parseRouteId(req.params.id);
  if (id === null) {
    sendError(res, 400, "Invalid id");
    return;
  }
  try {
    const role = await rolesService.getRole(id);
    if (!role) {
      sendError(res, 404, "Role not found");
      return;
    }
    sendSuccess(res, role, { message: "Role fetched successfully" });
  } catch (err) {
    handleControllerError(res, err, "getRole", "Failed to get role");
  }
}

export async function updateRole(req: Request, res: Response): Promise<void> {
  const id = parseRouteId(req.params.id);
  if (id === null) {
    sendError(res, 400, "Invalid id");
    return;
  }
  const parsed = updateRoleBodySchema.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, parsed.error);
    return;
  }
  try {
    const role = await rolesService.updateRole(id, parsed.data);
    if (!role) {
      sendError(res, 404, "Role not found");
      return;
    }
    sendSuccess(res, role, { message: "Role updated successfully" });
  } catch (err) {
    handleControllerError(res, err, "updateRole", "Failed to update role");
  }
}

export async function deleteRole(req: Request, res: Response): Promise<void> {
  const id = parseRouteId(req.params.id);
  if (id === null) {
    sendError(res, 400, "Invalid id");
    return;
  }
  try {
    const deleted = await rolesService.deleteRole(id);
    if (!deleted) {
      sendError(res, 404, "Role not found");
      return;
    }
    sendSuccess(res, null, { message: "Role deleted successfully" });
  } catch (err) {
    handleControllerError(res, err, "deleteRole", "Failed to delete role");
  }
}
