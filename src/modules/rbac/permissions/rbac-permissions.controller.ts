import type { Request, Response } from "express";
import { UniqueConstraintError } from "sequelize";

import { formatZodError } from "../../../shared/validation/format-zod-error";
import {
  createPermissionBodySchema,
  listPermissionsQuerySchema,
  updatePermissionBodySchema,
} from "./rbac-permissions.schemas";
import * as rbacPermissionsService from "./rbac-permissions.service";

export async function listPermissions(
  req: Request,
  res: Response,
): Promise<void> {
  const groupIdRaw = req.query.groupId;
  const groupIdSlice =
    typeof groupIdRaw === "string"
      ? groupIdRaw
      : Array.isArray(groupIdRaw) &&
          groupIdRaw.length > 0 &&
          typeof groupIdRaw[0] === "string"
        ? groupIdRaw[0]
        : undefined;
  const parsed = listPermissionsQuerySchema.safeParse({ groupId: groupIdSlice });
  if (!parsed.success) {
    res.status(400).json({ message: formatZodError(parsed.error) });
    return;
  }
  try {
    const rows = await rbacPermissionsService.listPermissions(parsed.data);
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
  const parsed = createPermissionBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: formatZodError(parsed.error) });
    return;
  }
  try {
    const row = await rbacPermissionsService.createPermission({
      permissionCode: parsed.data.permissionCode,
      permissionDescription: parsed.data.permissionDescription ?? null,
      groupId: parsed.data.groupId ?? null,
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
  const parsed = updatePermissionBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: formatZodError(parsed.error) });
    return;
  }
  try {
    const row = await rbacPermissionsService.updatePermission(id, parsed.data);
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
