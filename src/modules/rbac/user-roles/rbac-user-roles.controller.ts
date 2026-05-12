import type { Request, Response } from "express";
import { ForeignKeyConstraintError, UniqueConstraintError } from "sequelize";

import { formatZodError } from "../../../shared/validation/format-zod-error";
import {
  createUserRoleBodySchema,
  setUserRolesBodySchema,
} from "./rbac-user-roles.schemas";
import * as rbacUserRolesService from "./rbac-user-roles.service";

export async function listUserRoles(
  req: Request,
  res: Response,
): Promise<void> {
  const raw = req.params.userId;
  const userId =
    typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  if (!Number.isFinite(userId)) {
    res.status(400).json({ message: "Invalid userId" });
    return;
  }
  try {
    const rows = await rbacUserRolesService.listUserRoles(userId);
    res.json({ data: rows });
  } catch (err) {
    console.error("listUserRoles:", err);
    res.status(500).json({ message: "Failed to list user roles" });
  }
}

export async function setUserRoles(req: Request, res: Response): Promise<void> {
  const raw = req.params.userId;
  const userId =
    typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  if (!Number.isFinite(userId)) {
    res.status(400).json({ message: "Invalid userId" });
    return;
  }
  const parsed = setUserRolesBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: formatZodError(parsed.error) });
    return;
  }
  try {
    const rows = await rbacUserRolesService.setUserRoles(
      userId,
      parsed.data.roleIds,
      parsed.data.assignedBy,
    );
    if (!rows) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json({ data: rows });
  } catch (err) {
    console.error("setUserRoles:", err);
    if (err instanceof ForeignKeyConstraintError) {
      res.status(400).json({ message: "One or more role ids do not exist" });
      return;
    }
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({ message: "Duplicate role id in request" });
      return;
    }
    res.status(500).json({ message: "Failed to set user roles" });
  }
}

export async function createUserRole(
  req: Request,
  res: Response,
): Promise<void> {
  const raw = req.params.userId;
  const userId =
    typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  if (!Number.isFinite(userId)) {
    res.status(400).json({ message: "Invalid userId" });
    return;
  }
  const parsed = createUserRoleBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: formatZodError(parsed.error) });
    return;
  }
  try {
    const row = await rbacUserRolesService.createUserRole({
      userId,
      roleId: parsed.data.roleId,
      assignedBy: parsed.data.assignedBy,
    });
    res.status(201).json(row);
  } catch (err) {
    console.error("createUserRole:", err);
    if (err instanceof UniqueConstraintError) {
      res
        .status(409)
        .json({ message: "This role is already assigned to the user" });
      return;
    }
    res.status(500).json({ message: "Failed to assign role to user" });
  }
}

export async function deleteUserRole(
  req: Request,
  res: Response,
): Promise<void> {
  const rawUserId = req.params.userId;
  const rawRoleId = req.params.roleId;
  const userId =
    typeof rawUserId === "string"
      ? Number.parseInt(rawUserId, 10)
      : Number.NaN;
  const roleId =
    typeof rawRoleId === "string"
      ? Number.parseInt(rawRoleId, 10)
      : Number.NaN;
  if (!Number.isFinite(userId) || !Number.isFinite(roleId)) {
    res.status(400).json({ message: "Invalid userId or roleId" });
    return;
  }
  try {
    const deleted = await rbacUserRolesService.deleteUserRole(userId, roleId);
    if (!deleted) {
      res.status(404).json({ message: "User role link not found" });
      return;
    }
    res.status(204).send();
  } catch (err) {
    console.error("deleteUserRole:", err);
    res.status(500).json({ message: "Failed to remove user role" });
  }
}
