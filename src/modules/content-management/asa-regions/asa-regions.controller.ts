import type { Request, Response } from "express";
import { ForeignKeyConstraintError } from "sequelize";

import { formatZodError } from "../../../shared/validation/format-zod-error";
import {
  createAsaRegionBodySchema,
  updateAsaRegionBodySchema,
} from "./asa-regions.schemas";
import * as asaRegionsService from "./asa-regions.service";

export async function listAsaRegions(
  _req: Request,
  res: Response,
): Promise<void> {
  try {
    const rows = await asaRegionsService.listAsaRegions();
    res.json({ data: rows });
  } catch (err) {
    console.error("listAsaRegions:", err);
    res.status(500).json({ message: "Failed to list ASA regions" });
  }
}

export async function createAsaRegion(req: Request, res: Response): Promise<void> {
  const parsed = createAsaRegionBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: formatZodError(parsed.error) });
    return;
  }
  try {
    const row = await asaRegionsService.createAsaRegion(parsed.data);
    res.status(201).json(row);
  } catch (err) {
    console.error("createAsaRegion:", err);
    if (err instanceof ForeignKeyConstraintError) {
      res.status(400).json({ message: "Invalid asaDivisionId" });
      return;
    }
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Failed to create ASA region" });
  }
}

export async function getAsaRegion(req: Request, res: Response): Promise<void> {
  const raw = req.params.id;
  const id =
    typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  if (!Number.isFinite(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  try {
    const row = await asaRegionsService.getAsaRegion(id);
    if (!row) {
      res.status(404).json({ message: "ASA region not found" });
      return;
    }
    res.json(row);
  } catch (err) {
    console.error("getAsaRegion:", err);
    res.status(500).json({ message: "Failed to get ASA region" });
  }
}

export async function updateAsaRegion(req: Request, res: Response): Promise<void> {
  const raw = req.params.id;
  const id =
    typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  if (!Number.isFinite(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  const parsed = updateAsaRegionBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: formatZodError(parsed.error) });
    return;
  }
  try {
    const row = await asaRegionsService.updateAsaRegion(id, parsed.data);
    if (!row) {
      res.status(404).json({ message: "ASA region not found" });
      return;
    }
    res.json(row);
  } catch (err) {
    console.error("updateAsaRegion:", err);
    if (err instanceof ForeignKeyConstraintError) {
      res.status(400).json({ message: "Invalid asaDivisionId" });
      return;
    }
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Failed to update ASA region" });
  }
}

export async function deleteAsaRegion(req: Request, res: Response): Promise<void> {
  const raw = req.params.id;
  const id =
    typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  if (!Number.isFinite(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  try {
    const deleted = await asaRegionsService.deleteAsaRegion(id);
    if (!deleted) {
      res.status(404).json({ message: "ASA region not found" });
      return;
    }
    res.status(204).send();
  } catch (err) {
    console.error("deleteAsaRegion:", err);
    res.status(500).json({ message: "Failed to delete ASA region" });
  }
}
