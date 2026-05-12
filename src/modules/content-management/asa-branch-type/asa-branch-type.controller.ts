import type { Request, Response } from "express";
import { UniqueConstraintError } from "sequelize";

import { formatZodError } from "../../../shared/validation/format-zod-error";
import {
  createAsaBranchTypeBodySchema,
  updateAsaBranchTypeBodySchema,
} from "./asa-branch-type.schemas";
import * as asaBranchTypeService from "./asa-branch-type.service";

export async function listAsaBranchTypes(
  _req: Request,
  res: Response,
): Promise<void> {
  try {
    const rows = await asaBranchTypeService.listAsaBranchTypes();
    res.json({ data: rows });
  } catch (err) {
    console.error("listAsaBranchTypes:", err);
    res.status(500).json({ message: "Failed to list ASA branch types" });
  }
}

export async function createAsaBranchType(
  req: Request,
  res: Response,
): Promise<void> {
  const parsed = createAsaBranchTypeBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: formatZodError(parsed.error) });
    return;
  }
  try {
    const row = await asaBranchTypeService.createAsaBranchType(parsed.data);
    res.status(201).json(row);
  } catch (err) {
    console.error("createAsaBranchType:", err);
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({ message: "typeName already exists" });
      return;
    }
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Failed to create ASA branch type" });
  }
}

export async function getAsaBranchType(req: Request, res: Response): Promise<void> {
  const raw = req.params.id;
  const id =
    typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  if (!Number.isFinite(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  try {
    const row = await asaBranchTypeService.getAsaBranchType(id);
    if (!row) {
      res.status(404).json({ message: "ASA branch type not found" });
      return;
    }
    res.json(row);
  } catch (err) {
    console.error("getAsaBranchType:", err);
    res.status(500).json({ message: "Failed to get ASA branch type" });
  }
}

export async function updateAsaBranchType(
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
  const parsed = updateAsaBranchTypeBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: formatZodError(parsed.error) });
    return;
  }
  try {
    const row = await asaBranchTypeService.updateAsaBranchType(id, parsed.data);
    if (!row) {
      res.status(404).json({ message: "ASA branch type not found" });
      return;
    }
    res.json(row);
  } catch (err) {
    console.error("updateAsaBranchType:", err);
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({ message: "typeName already exists" });
      return;
    }
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Failed to update ASA branch type" });
  }
}

export async function deleteAsaBranchType(
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
    const deleted = await asaBranchTypeService.deleteAsaBranchType(id);
    if (!deleted) {
      res.status(404).json({ message: "ASA branch type not found" });
      return;
    }
    res.status(204).send();
  } catch (err) {
    console.error("deleteAsaBranchType:", err);
    res.status(500).json({ message: "Failed to delete ASA branch type" });
  }
}
