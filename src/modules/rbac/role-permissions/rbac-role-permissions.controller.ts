import type { Request, Response } from "express";
import { UniqueConstraintError } from "sequelize";

import * as rbacRolePermissionsService from "./rbac-role-permissions.service";

export async function listRolePermissions(
  req: Request,
  res: Response,
): Promise<void> {
  const raw = req.params.id;
  const roleId =
    typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  if (!Number.isFinite(roleId)) {
    res.status(400).json({ message: "Invalid role id" });
    return;
  }
  try {
    const rows = await rbacRolePermissionsService.listRolePermissions(roleId);
    res.json({ data: rows });
  } catch (err) {
    console.error("listRolePermissions:", err);
    res.status(500).json({ message: "Failed to list role permissions" });
  }
}

export async function createRolePermission(
  req: Request,
  res: Response,
): Promise<void> {
  const raw = req.params.id;
  const roleId =
    typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  if (!Number.isFinite(roleId)) {
    res.status(400).json({ message: "Invalid role id" });
    return;
  }
  const body = req.body as { permissionId?: number | string };
  const permissionIdRaw = body.permissionId;
  let permissionId: number;
  if (
    typeof permissionIdRaw === "number" &&
    Number.isFinite(permissionIdRaw)
  ) {
    permissionId = permissionIdRaw;
  } else if (
    typeof permissionIdRaw === "string" &&
    permissionIdRaw.trim() !== ""
  ) {
    permissionId = Number.parseInt(permissionIdRaw.trim(), 10);
  } else {
    res.status(400).json({ message: "permissionId is required (number)" });
    return;
  }
  if (!Number.isFinite(permissionId)) {
    res.status(400).json({ message: "permissionId must be a number" });
    return;
  }
  try {
    const row = await rbacRolePermissionsService.createRolePermission({
      roleId,
      permissionId,
    });
    res.status(201).json(row);
  } catch (err) {
    console.error("createRolePermission:", err);
    if (err instanceof UniqueConstraintError) {
      res
        .status(409)
        .json({ message: "This permission is already assigned to the role" });
      return;
    }
    res.status(500).json({ message: "Failed to assign permission to role" });
  }
}

export async function deleteRolePermission(
  req: Request,
  res: Response,
): Promise<void> {
  const rawRoleId = req.params.id;
  const rawPermId = req.params.permissionId;
  const roleId =
    typeof rawRoleId === "string"
      ? Number.parseInt(rawRoleId, 10)
      : Number.NaN;
  const permissionId =
    typeof rawPermId === "string"
      ? Number.parseInt(rawPermId, 10)
      : Number.NaN;
  if (!Number.isFinite(roleId) || !Number.isFinite(permissionId)) {
    res.status(400).json({ message: "Invalid role id or permissionId" });
    return;
  }
  try {
    const deleted = await rbacRolePermissionsService.deleteRolePermission(
      roleId,
      permissionId,
    );
    if (!deleted) {
      res.status(404).json({ message: "Role permission link not found" });
      return;
    }
    res.status(204).send();
  } catch (err) {
    console.error("deleteRolePermission:", err);
    res.status(500).json({ message: "Failed to remove role permission" });
  }
}
