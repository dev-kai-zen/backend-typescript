import type { Request, Response } from "express";
import { UniqueConstraintError } from "sequelize";

import { formatZodError } from "../../../shared/validation/format-zod-error";
import {
  createGroupBodySchema,
  updateGroupBodySchema,
} from "./rbac-groups.schemas";
import * as rbacGroupsService from "./rbac-groups.service";

export async function listGroups(
  _req: Request,
  res: Response,
): Promise<void> {
  try {
    const groups = await rbacGroupsService.listGroups();
    res.json({ data: groups });
  } catch (err) {
    console.error("listGroups:", err);
    res.status(500).json({ message: "Failed to list groups" });
  }
}

export async function createGroup(req: Request, res: Response): Promise<void> {
  const parsed = createGroupBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: formatZodError(parsed.error) });
    return;
  }
  try {
    const group = await rbacGroupsService.createGroup(parsed.data);
    res.status(201).json(group);
  } catch (err) {
    console.error("createGroup:", err);
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({ message: "groupName already exists" });
      return;
    }
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Failed to create group" });
  }
}

export async function getGroup(req: Request, res: Response): Promise<void> {
  const raw = req.params.id;
  const id =
    typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  if (!Number.isFinite(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  try {
    const group = await rbacGroupsService.getGroup(id);
    if (!group) {
      res.status(404).json({ message: "Group not found" });
      return;
    }
    res.json(group);
  } catch (err) {
    console.error("getGroup:", err);
    res.status(500).json({ message: "Failed to get group" });
  }
}

export async function updateGroup(req: Request, res: Response): Promise<void> {
  const raw = req.params.id;
  const id =
    typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  if (!Number.isFinite(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  const parsed = updateGroupBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: formatZodError(parsed.error) });
    return;
  }
  try {
    const group = await rbacGroupsService.updateGroup(id, parsed.data);
    if (!group) {
      res.status(404).json({ message: "Group not found" });
      return;
    }
    res.json(group);
  } catch (err) {
    console.error("updateGroup:", err);
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({ message: "groupName already exists" });
      return;
    }
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Failed to update group" });
  }
}

export async function deleteGroup(req: Request, res: Response): Promise<void> {
  const raw = req.params.id;
  const id =
    typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  if (!Number.isFinite(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  try {
    const deleted = await rbacGroupsService.deleteGroup(id);
    if (!deleted) {
      res.status(404).json({ message: "Group not found" });
      return;
    }
    res.status(204).send();
  } catch (err) {
    console.error("deleteGroup:", err);
    res.status(500).json({ message: "Failed to delete group" });
  }
}
