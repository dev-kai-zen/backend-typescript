import type { Request, Response } from "express";
import { ForeignKeyConstraintError } from "sequelize";

import { formatZodError } from "../../../shared/validation/format-zod-error";
import {
  createAsaDivisionBodySchema,
  updateAsaDivisionBodySchema,
} from "./asa-divisions.schemas";
import * as asaDivisionsService from "./asa-divisions.service";

export async function listAsaDivisions(
  _req: Request,
  res: Response,
): Promise<void> {
  try {
    const rows = await asaDivisionsService.listAsaDivisions();
    res.json({ data: rows });
  } catch (err) {
    console.error("listAsaDivisions:", err);
    res.status(500).json({ message: "Failed to list ASA divisions" });
  }
}

export async function createAsaDivision(
  req: Request,
  res: Response,
): Promise<void> {
  const parsed = createAsaDivisionBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: formatZodError(parsed.error) });
    return;
  }
  try {
    const row = await asaDivisionsService.createAsaDivision(parsed.data);
    res.status(201).json(row);
  } catch (err) {
    console.error("createAsaDivision:", err);
    if (err instanceof ForeignKeyConstraintError) {
      res.status(400).json({ message: "Invalid asaOperationId" });
      return;
    }
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Failed to create ASA division" });
  }
}

export async function getAsaDivision(req: Request, res: Response): Promise<void> {
  const raw = req.params.id;
  const id =
    typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  if (!Number.isFinite(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  try {
    const row = await asaDivisionsService.getAsaDivision(id);
    if (!row) {
      res.status(404).json({ message: "ASA division not found" });
      return;
    }
    res.json(row);
  } catch (err) {
    console.error("getAsaDivision:", err);
    res.status(500).json({ message: "Failed to get ASA division" });
  }
}

export async function updateAsaDivision(
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
  const parsed = updateAsaDivisionBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: formatZodError(parsed.error) });
    return;
  }
  try {
    const row = await asaDivisionsService.updateAsaDivision(id, parsed.data);
    if (!row) {
      res.status(404).json({ message: "ASA division not found" });
      return;
    }
    res.json(row);
  } catch (err) {
    console.error("updateAsaDivision:", err);
    if (err instanceof ForeignKeyConstraintError) {
      res.status(400).json({ message: "Invalid asaOperationId" });
      return;
    }
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Failed to update ASA division" });
  }
}

export async function deleteAsaDivision(
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
    const deleted = await asaDivisionsService.deleteAsaDivision(id);
    if (!deleted) {
      res.status(404).json({ message: "ASA division not found" });
      return;
    }
    res.status(204).send();
  } catch (err) {
    console.error("deleteAsaDivision:", err);
    res.status(500).json({ message: "Failed to delete ASA division" });
  }
}
