import type { Request, Response } from "express";
import {
  ForeignKeyConstraintError,
  UniqueConstraintError,
} from "sequelize";

import { formatZodError } from "../../../shared/validation/format-zod-error";
import {
  createAsaBranchBodySchema,
  updateAsaBranchBodySchema,
} from "./asa-branches.schemas";
import * as asaBranchesService from "./asa-branches.service";

export async function listAsaBranches(
  _req: Request,
  res: Response,
): Promise<void> {
  try {
    const rows = await asaBranchesService.listAsaBranches();
    res.json({ data: rows });
  } catch (err) {
    console.error("listAsaBranches:", err);
    res.status(500).json({ message: "Failed to list ASA branches" });
  }
}

export async function createAsaBranch(req: Request, res: Response): Promise<void> {
  const parsed = createAsaBranchBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: formatZodError(parsed.error) });
    return;
  }
  try {
    const row = await asaBranchesService.createAsaBranch(parsed.data);
    res.status(201).json(row);
  } catch (err) {
    console.error("createAsaBranch:", err);
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({ message: "branchCode already exists" });
      return;
    }
    if (err instanceof ForeignKeyConstraintError) {
      res
        .status(400)
        .json({ message: "Invalid asaAreaId or asaBranchTypeId" });
      return;
    }
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Failed to create ASA branch" });
  }
}

export async function getAsaBranch(req: Request, res: Response): Promise<void> {
  const raw = req.params.id;
  const id =
    typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  if (!Number.isFinite(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  try {
    const row = await asaBranchesService.getAsaBranch(id);
    if (!row) {
      res.status(404).json({ message: "ASA branch not found" });
      return;
    }
    res.json(row);
  } catch (err) {
    console.error("getAsaBranch:", err);
    res.status(500).json({ message: "Failed to get ASA branch" });
  }
}

export async function updateAsaBranch(req: Request, res: Response): Promise<void> {
  const raw = req.params.id;
  const id =
    typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  if (!Number.isFinite(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  const parsed = updateAsaBranchBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: formatZodError(parsed.error) });
    return;
  }
  try {
    const row = await asaBranchesService.updateAsaBranch(id, parsed.data);
    if (!row) {
      res.status(404).json({ message: "ASA branch not found" });
      return;
    }
    res.json(row);
  } catch (err) {
    console.error("updateAsaBranch:", err);
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({ message: "branchCode already exists" });
      return;
    }
    if (err instanceof ForeignKeyConstraintError) {
      res
        .status(400)
        .json({ message: "Invalid asaAreaId or asaBranchTypeId" });
      return;
    }
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Failed to update ASA branch" });
  }
}

export async function deleteAsaBranch(req: Request, res: Response): Promise<void> {
  const raw = req.params.id;
  const id =
    typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  if (!Number.isFinite(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  try {
    const deleted = await asaBranchesService.deleteAsaBranch(id);
    if (!deleted) {
      res.status(404).json({ message: "ASA branch not found" });
      return;
    }
    res.status(204).send();
  } catch (err) {
    console.error("deleteAsaBranch:", err);
    res.status(500).json({ message: "Failed to delete ASA branch" });
  }
}
