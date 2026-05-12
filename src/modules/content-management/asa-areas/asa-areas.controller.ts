import type { Request, Response } from "express";
import { ForeignKeyConstraintError } from "sequelize";

import { formatZodError } from "../../../shared/validation/format-zod-error";
import {
  createAsaAreaBodySchema,
  updateAsaAreaBodySchema,
} from "./asa-areas.schemas";
import * as asaAreasService from "./asa-areas.service";

export async function listAsaAreas(_req: Request, res: Response): Promise<void> {
  try {
    const rows = await asaAreasService.listAsaAreas();
    res.json({ data: rows });
  } catch (err) {
    console.error("listAsaAreas:", err);
    res.status(500).json({ message: "Failed to list ASA areas" });
  }
}

export async function createAsaArea(req: Request, res: Response): Promise<void> {
  const parsed = createAsaAreaBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: formatZodError(parsed.error) });
    return;
  }
  try {
    const row = await asaAreasService.createAsaArea(parsed.data);
    res.status(201).json(row);
  } catch (err) {
    console.error("createAsaArea:", err);
    if (err instanceof ForeignKeyConstraintError) {
      res.status(400).json({ message: "Invalid asaRegionId" });
      return;
    }
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Failed to create ASA area" });
  }
}

export async function getAsaArea(req: Request, res: Response): Promise<void> {
  const raw = req.params.id;
  const id =
    typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  if (!Number.isFinite(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  try {
    const row = await asaAreasService.getAsaArea(id);
    if (!row) {
      res.status(404).json({ message: "ASA area not found" });
      return;
    }
    res.json(row);
  } catch (err) {
    console.error("getAsaArea:", err);
    res.status(500).json({ message: "Failed to get ASA area" });
  }
}

export async function updateAsaArea(req: Request, res: Response): Promise<void> {
  const raw = req.params.id;
  const id =
    typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  if (!Number.isFinite(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  const parsed = updateAsaAreaBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: formatZodError(parsed.error) });
    return;
  }
  try {
    const row = await asaAreasService.updateAsaArea(id, parsed.data);
    if (!row) {
      res.status(404).json({ message: "ASA area not found" });
      return;
    }
    res.json(row);
  } catch (err) {
    console.error("updateAsaArea:", err);
    if (err instanceof ForeignKeyConstraintError) {
      res.status(400).json({ message: "Invalid asaRegionId" });
      return;
    }
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Failed to update ASA area" });
  }
}

export async function deleteAsaArea(req: Request, res: Response): Promise<void> {
  const raw = req.params.id;
  const id =
    typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  if (!Number.isFinite(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  try {
    const deleted = await asaAreasService.deleteAsaArea(id);
    if (!deleted) {
      res.status(404).json({ message: "ASA area not found" });
      return;
    }
    res.status(204).send();
  } catch (err) {
    console.error("deleteAsaArea:", err);
    res.status(500).json({ message: "Failed to delete ASA area" });
  }
}
