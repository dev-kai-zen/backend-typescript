import type { Request, Response } from "express";
import { UniqueConstraintError } from "sequelize";

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
  const body = req.body as { groupName?: string };
  if (!body.groupName || typeof body.groupName !== "string") {
    res.status(400).json({ message: "groupName is required" });
    return;
  }
  try {
    const group = await rbacGroupsService.createGroup({
      groupName: body.groupName,
    });
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
  const body = req.body as { groupName?: string };
  if (!body.groupName || typeof body.groupName !== "string") {
    res.status(400).json({ message: "groupName is required" });
    return;
  }
  try {
    const group = await rbacGroupsService.updateGroup(id, {
      groupName: body.groupName,
    });
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
