import type { Request, Response } from "express";

import { formatZodError } from "../../../shared/validation/format-zod-error";
import {
  createAsaOperationBodySchema,
  updateAsaOperationBodySchema,
} from "./asa-operations.schemas";
import * as asaOperationsService from "./asa-operations.service";

export async function listAsaOperations(
  _req: Request,
  res: Response,
): Promise<void> {
  try {
    const rows = await asaOperationsService.listAsaOperations();
    res.json({ data: rows });
  } catch (err) {
    console.error("listAsaOperations:", err);
    res.status(500).json({ message: "Failed to list ASA operations" });
  }
}

export async function createAsaOperation(
  req: Request,
  res: Response,
): Promise<void> {
  const parsed = createAsaOperationBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: formatZodError(parsed.error) });
    return;
  }
  try {
    const row = await asaOperationsService.createAsaOperation(parsed.data);
    res.status(201).json(row);
  } catch (err) {
    console.error("createAsaOperation:", err);
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Failed to create ASA operation" });
  }
}

export async function getAsaOperation(req: Request, res: Response): Promise<void> {
  const raw = req.params.id;
  const id =
    typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  if (!Number.isFinite(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  try {
    const row = await asaOperationsService.getAsaOperation(id);
    if (!row) {
      res.status(404).json({ message: "ASA operation not found" });
      return;
    }
    res.json(row);
  } catch (err) {
    console.error("getAsaOperation:", err);
    res.status(500).json({ message: "Failed to get ASA operation" });
  }
}

export async function updateAsaOperation(
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
  const parsed = updateAsaOperationBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: formatZodError(parsed.error) });
    return;
  }
  try {
    const row = await asaOperationsService.updateAsaOperation(id, parsed.data);
    if (!row) {
      res.status(404).json({ message: "ASA operation not found" });
      return;
    }
    res.json(row);
  } catch (err) {
    console.error("updateAsaOperation:", err);
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Failed to update ASA operation" });
  }
}

export async function deleteAsaOperation(
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
    const deleted = await asaOperationsService.deleteAsaOperation(id);
    if (!deleted) {
      res.status(404).json({ message: "ASA operation not found" });
      return;
    }
    res.status(204).send();
  } catch (err) {
    console.error("deleteAsaOperation:", err);
    res.status(500).json({ message: "Failed to delete ASA operation" });
  }
}
