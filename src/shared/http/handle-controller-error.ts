import type { Response } from "express";
import {
  ForeignKeyConstraintError,
  UniqueConstraintError,
} from "sequelize";

import { sendError } from "./api-response";

export interface ControllerError extends Error {
  statusCode?: number;
}

/** Map thrown errors to a consistent API error response. */
export function handleControllerError(
  res: Response,
  err: unknown,
  logLabel: string,
  fallbackMessage: string,
): void {
  console.error(`${logLabel}:`, err);

  const e = err as ControllerError;
  if (e.statusCode != null) {
    sendError(res, e.statusCode, e.message);
    return;
  }

  if (err instanceof ForeignKeyConstraintError) {
    sendError(res, 400, "Referenced record does not exist");
    return;
  }

  if (err instanceof UniqueConstraintError) {
    sendError(res, 409, "A record with these unique fields already exists");
    return;
  }

  if (err instanceof Error && err.message) {
    sendError(res, 400, err.message);
    return;
  }

  sendError(res, 500, fallbackMessage);
}
