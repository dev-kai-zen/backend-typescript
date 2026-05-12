import type { Request, Response } from "express";
import { UniqueConstraintError } from "sequelize";

import { formatZodError } from "../../../shared/validation/format-zod-error";
import {
  createRoleBodySchema,
  updateRoleBodySchema,
} from "./rbac-roles.schemas";
import * as rolesService from "./rbac-roles.service";

export async function listRoles(_req: Request, res: Response): Promise<void> {
  try {
    const roles = await rolesService.listRoles();
    res.json({ data: roles });
  } catch (err) {
    console.error("listRoles:", err);
    res.status(500).json({ message: "Failed to list roles" });
  }
}

export async function createRole(req: Request, res: Response): Promise<void> {
  const parsed = createRoleBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: formatZodError(parsed.error) });
    return;
  }
  try {
    const role = await rolesService.createRole({
      roleName: parsed.data.roleName,
      roleDescription: parsed.data.roleDescription ?? null,
    });
    res.status(201).json(role);
  } catch (err) {
    console.error("createRole:", err);
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({ message: "roleName already exists" });
      return;
    }
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Failed to create role" });
  }
}

export async function getRole(req: Request, res: Response): Promise<void> {
  const raw = req.params.id;
  const id =
    typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  if (!Number.isFinite(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  try {
    const role = await rolesService.getRole(id);
    if (!role) {
      res.status(404).json({ message: "Role not found" });
      return;
    }
    res.json(role);
  } catch (err) {
    console.error("getRole:", err);
    res.status(500).json({ message: "Failed to get role" });
  }
}

export async function updateRole(req: Request, res: Response): Promise<void> {
  const raw = req.params.id;
  const id =
    typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  if (!Number.isFinite(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  const parsed = updateRoleBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: formatZodError(parsed.error) });
    return;
  }
  try {
    const role = await rolesService.updateRole(id, {
      roleName: parsed.data.roleName,
      roleDescription: parsed.data.roleDescription,
    });
    if (!role) {
      res.status(404).json({ message: "Role not found" });
      return;
    }
    res.json(role);
  } catch (err) {
    console.error("updateRole:", err);
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({ message: "roleName already exists" });
      return;
    }
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Failed to update role" });
  }
}

export async function deleteRole(req: Request, res: Response): Promise<void> {
  const raw = req.params.id;
  const id =
    typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  if (!Number.isFinite(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  try {
    const deleted = await rolesService.deleteRole(id);
    if (!deleted) {
      res.status(404).json({ message: "Role not found" });
      return;
    }
    res.status(204).send();
  } catch (err) {
    console.error("deleteRole:", err);
    res.status(500).json({ message: "Failed to delete role" });
  }
}
