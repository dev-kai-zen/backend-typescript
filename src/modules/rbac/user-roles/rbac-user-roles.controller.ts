import type { Request, Response } from "express";
import { UniqueConstraintError } from "sequelize";

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
  const body = req.body as {
    roleId?: number | string;
    assignedBy?: number | string;
  };

  let roleId: number;
  if (typeof body.roleId === "number" && Number.isFinite(body.roleId)) {
    roleId = body.roleId;
  } else if (typeof body.roleId === "string" && body.roleId.trim() !== "") {
    roleId = Number.parseInt(body.roleId.trim(), 10);
  } else {
    res.status(400).json({ message: "roleId is required (number)" });
    return;
  }
  if (!Number.isFinite(roleId)) {
    res.status(400).json({ message: "roleId must be a number" });
    return;
  }

  let assignedBy: number;
  if (typeof body.assignedBy === "number" && Number.isFinite(body.assignedBy)) {
    assignedBy = body.assignedBy;
  } else if (
    typeof body.assignedBy === "string" &&
    body.assignedBy.trim() !== ""
  ) {
    assignedBy = Number.parseInt(body.assignedBy.trim(), 10);
  } else {
    res.status(400).json({ message: "assignedBy is required (number)" });
    return;
  }
  if (!Number.isFinite(assignedBy)) {
    res.status(400).json({ message: "assignedBy must be a number" });
    return;
  }

  try {
    const row = await rbacUserRolesService.createUserRole({
      userId,
      roleId,
      assignedBy,
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
