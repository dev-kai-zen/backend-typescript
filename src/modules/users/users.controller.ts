import type { Request, Response } from "express";

import {
  sendError,
  sendSuccess,
  sendValidationError,
} from "../../shared/http/api-response";
import { handleControllerError } from "../../shared/http/handle-controller-error";
import { parseRouteId } from "../../shared/http/parse-route-id";
import { createUserBodySchema, updateUserBodySchema } from "./users.schemas";
import * as usersService from "./users.service";

export async function listUsers(req: Request, res: Response): Promise<void> {
  let isActive: boolean | undefined;
  if (req.query.isActive === "true") {
    isActive = true;
  } else if (req.query.isActive === "false") {
    isActive = false;
  }
  let roleId: number | undefined;
  const roleRaw = req.query.roleId;
  if (
    typeof roleRaw === "string" &&
    roleRaw !== "" &&
    Number.isFinite(Number.parseInt(roleRaw, 10))
  ) {
    roleId = Number.parseInt(roleRaw, 10);
  }
  try {
    const users = await usersService.listUsers({ isActive, roleId });
    sendSuccess(res, users, { message: "Users listed successfully" });
  } catch (err) {
    handleControllerError(res, err, "listUsers", "Failed to list users");
  }
}

export async function createUser(req: Request, res: Response): Promise<void> {
  const parsed = createUserBodySchema.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, parsed.error);
    return;
  }
  try {
    const user = await usersService.createUser(parsed.data);
    sendSuccess(res, user, {
      httpStatus: 201,
      message: "User created successfully",
    });
  } catch (err) {
    handleControllerError(res, err, "createUser", "Failed to create user");
  }
}

export async function getUser(req: Request, res: Response): Promise<void> {
  const id = parseRouteId(req.params.id);
  if (id === null) {
    sendError(res, 400, "Invalid id");
    return;
  }
  try {
    const user = await usersService.getUser(id);
    if (!user) {
      sendError(res, 404, "User not found");
      return;
    }
    sendSuccess(res, user, { message: "User fetched successfully" });
  } catch (err) {
    handleControllerError(res, err, "getUser", "Failed to get user");
  }
}

export async function updateUser(req: Request, res: Response): Promise<void> {
  const id = parseRouteId(req.params.id);
  if (id === null) {
    sendError(res, 400, "Invalid id");
    return;
  }

  const parsed = updateUserBodySchema.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, parsed.error);
    return;
  }

  try {
    const user = await usersService.updateUser(id, parsed.data);
    if (!user) {
      sendError(res, 404, "User not found");
      return;
    }
    sendSuccess(res, user, { message: "User updated successfully" });
  } catch (err) {
    handleControllerError(res, err, "updateUser", "Failed to update user");
  }
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  const id = parseRouteId(req.params.id);
  if (id === null) {
    sendError(res, 400, "Invalid id");
    return;
  }
  try {
    const deleted = await usersService.deleteUser(id);
    if (!deleted) {
      sendError(res, 404, "User not found");
      return;
    }
    sendSuccess(res, null, { message: "User deleted successfully" });
  } catch (err) {
    handleControllerError(res, err, "deleteUser", "Failed to delete user");
  }
}
