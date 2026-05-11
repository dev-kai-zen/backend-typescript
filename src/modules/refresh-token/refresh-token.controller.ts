import type { Request, Response } from "express";
import { UniqueConstraintError } from "sequelize";

import { formatZodError } from "../../shared/validation/format-zod-error";
import {
  createRefreshTokenBodySchema,
  listRefreshTokensQuerySchema,
  revokeRefreshTokenBodySchema,
} from "./refresh-token.schemas";
import * as refreshTokenService from "./refresh-token.service";

function firstQueryString(val: unknown): string | undefined {
  if (typeof val === "string") {
    return val;
  }
  if (Array.isArray(val) && typeof val[0] === "string") {
    return val[0];
  }
  return undefined;
}

export async function listRefreshTokens(
  req: Request,
  res: Response,
): Promise<void> {
  const parsed = listRefreshTokensQuerySchema.safeParse({
    userId: firstQueryString(req.query.userId),
  });
  if (!parsed.success) {
    res.status(400).json({ message: formatZodError(parsed.error) });
    return;
  }
  try {
    const rows = await refreshTokenService.listRefreshTokens(parsed.data);
    res.json({ data: rows });
  } catch (err) {
    console.error("listRefreshTokens:", err);
    res.status(500).json({ message: "Failed to list refresh tokens" });
  }
}

export async function createRefreshToken(
  req: Request,
  res: Response,
): Promise<void> {
  const parsed = createRefreshTokenBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: formatZodError(parsed.error) });
    return;
  }
  try {
    const row = await refreshTokenService.createRefreshToken(parsed.data);
    res.status(201).json(row);
  } catch (err) {
    console.error("createRefreshToken:", err);
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({ message: "token value already exists" });
      return;
    }
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Failed to create refresh token" });
  }
}

export async function getRefreshToken(
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
    const row = await refreshTokenService.getRefreshToken(id);
    if (!row) {
      res.status(404).json({ message: "Refresh token not found" });
      return;
    }
    res.json(row);
  } catch (err) {
    console.error("getRefreshToken:", err);
    res.status(500).json({ message: "Failed to get refresh token" });
  }
}

export async function deleteRefreshToken(
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
    const deleted = await refreshTokenService.deleteRefreshToken(id);
    if (!deleted) {
      res.status(404).json({ message: "Refresh token not found" });
      return;
    }
    res.status(204).send();
  } catch (err) {
    console.error("deleteRefreshToken:", err);
    res.status(500).json({ message: "Failed to delete refresh token" });
  }
}

export async function revokeRefreshToken(
  req: Request,
  res: Response,
): Promise<void> {
  const parsed = revokeRefreshTokenBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: formatZodError(parsed.error) });
    return;
  }
  try {
    const deleted = await refreshTokenService.revokeRefreshToken(
      parsed.data.token,
    );
    if (!deleted) {
      res.status(404).json({ message: "Refresh token not found" });
      return;
    }
    res.status(204).send();
  } catch (err) {
    console.error("revokeRefreshToken:", err);
    res.status(500).json({ message: "Failed to revoke refresh token" });
  }
}
