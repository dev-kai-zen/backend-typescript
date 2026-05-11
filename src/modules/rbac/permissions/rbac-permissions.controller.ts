import type { Request, Response } from "express";
import { UniqueConstraintError } from "sequelize";

import * as rbacPermissionsService from "./rbac-permissions.service";

export async function listPermissions(
  req: Request,
  res: Response,
): Promise<void> {
  let groupId: number | undefined;
  if (
    typeof req.query.groupId === "string" &&
    req.query.groupId !== ""
  ) {
    const n = Number.parseInt(req.query.groupId, 10);
    if (Number.isFinite(n)) {
      groupId = n;
    }
  }
  try {
    const rows = await rbacPermissionsService.listPermissions({ groupId });
    res.json({ data: rows });
  } catch (err) {
    console.error("listPermissions:", err);
    res.status(500).json({ message: "Failed to list permissions" });
  }
}

export async function createPermission(
  req: Request,
  res: Response,
): Promise<void> {
  const body = req.body as {
    permissionCode?: string;
    permissionDescription?: string | null;
    groupId?: number | null;
  };
  if (!body.permissionCode || typeof body.permissionCode !== "string") {
    res.status(400).json({ message: "permissionCode is required" });
    return;
  }
  let groupId: number | null = null;
  if (body.groupId !== undefined && body.groupId !== null) {
    if (typeof body.groupId !== "number" || !Number.isFinite(body.groupId)) {
      res.status(400).json({ message: "groupId must be a number or null" });
      return;
    }
    groupId = body.groupId;
  }
  try {
    const row = await rbacPermissionsService.createPermission({
      permissionCode: body.permissionCode,
      permissionDescription:
        typeof body.permissionDescription === "string"
          ? body.permissionDescription
          : body.permissionDescription === null
            ? null
            : null,
      groupId,
    });
    res.status(201).json(row);
  } catch (err) {
    console.error("createPermission:", err);
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({ message: "permissionCode already exists" });
      return;
    }
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Failed to create permission" });
  }
}

export async function getPermission(
  req: Request,
  res: Response,
): Promise<void> {
  const raw = req.params.id;
  const id =
    typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  if (!Number.isFinite(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  try {
    const row = await rbacPermissionsService.getPermission(id);
    if (!row) {
      res.status(404).json({ message: "Permission not found" });
      return;
    }
    res.json(row);
  } catch (err) {
    console.error("getPermission:", err);
    res.status(500).json({ message: "Failed to get permission" });
  }
}

export async function updatePermission(
  req: Request,
  res: Response,
): Promise<void> {
  const raw = req.params.id;
  const id =
    typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  if (!Number.isFinite(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  const body = req.body as {
    permissionCode?: string;
    permissionDescription?: string | null;
    groupId?: number | null;
  };
  try {
    const row = await rbacPermissionsService.updatePermission(id, body);
    if (!row) {
      res.status(404).json({ message: "Permission not found" });
      return;
    }
    res.json(row);
  } catch (err) {
    console.error("updatePermission:", err);
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({ message: "permissionCode already exists" });
      return;
    }
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Failed to update permission" });
  }
}

export async function deletePermission(
  req: Request,
  res: Response,
): Promise<void> {
  const raw = req.params.id;
  const id =
    typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  if (!Number.isFinite(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  try {
    const deleted = await rbacPermissionsService.deletePermission(id);
    if (!deleted) {
      res.status(404).json({ message: "Permission not found" });
      return;
    }
    res.status(204).send();
  } catch (err) {
    console.error("deletePermission:", err);
    res.status(500).json({ message: "Failed to delete permission" });
  }
}
