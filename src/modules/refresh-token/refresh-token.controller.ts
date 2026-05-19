import type { Request, Response } from "express";

import {
  sendError,
  sendSuccess,
  sendValidationError,
} from "../../shared/http/api-response";
import { handleControllerError } from "../../shared/http/handle-controller-error";
import { parseRouteId } from "../../shared/http/parse-route-id";
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
    sendValidationError(res, parsed.error);
    return;
  }
  try {
    const rows = await refreshTokenService.listRefreshTokens(parsed.data);
    sendSuccess(res, rows, { message: "Refresh tokens listed successfully" });
  } catch (err) {
    handleControllerError(
      res,
      err,
      "listRefreshTokens",
      "Failed to list refresh tokens",
    );
  }
}

export async function createRefreshToken(
  req: Request,
  res: Response,
): Promise<void> {
  const parsed = createRefreshTokenBodySchema.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, parsed.error);
    return;
  }
  try {
    const row = await refreshTokenService.createRefreshToken(parsed.data);
    sendSuccess(res, row, {
      httpStatus: 201,
      message: "Refresh token created successfully",
    });
  } catch (err) {
    handleControllerError(
      res,
      err,
      "createRefreshToken",
      "Failed to create refresh token",
    );
  }
}

export async function getRefreshToken(
  req: Request,
  res: Response,
): Promise<void> {
  const id = parseRouteId(req.params.id);
  if (id === null) {
    sendError(res, 400, "Invalid id");
    return;
  }
  try {
    const row = await refreshTokenService.getRefreshToken(id);
    if (!row) {
      sendError(res, 404, "Refresh token not found");
      return;
    }
    sendSuccess(res, row, { message: "Refresh token fetched successfully" });
  } catch (err) {
    handleControllerError(
      res,
      err,
      "getRefreshToken",
      "Failed to get refresh token",
    );
  }
}

export async function deleteRefreshToken(
  req: Request,
  res: Response,
): Promise<void> {
  const id = parseRouteId(req.params.id);
  if (id === null) {
    sendError(res, 400, "Invalid id");
    return;
  }
  try {
    const deleted = await refreshTokenService.deleteRefreshToken(id);
    if (!deleted) {
      sendError(res, 404, "Refresh token not found");
      return;
    }
    sendSuccess(res, null, { message: "Refresh token deleted successfully" });
  } catch (err) {
    handleControllerError(
      res,
      err,
      "deleteRefreshToken",
      "Failed to delete refresh token",
    );
  }
}

export async function revokeRefreshToken(
  req: Request,
  res: Response,
): Promise<void> {
  const parsed = revokeRefreshTokenBodySchema.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, parsed.error);
    return;
  }
  try {
    const deleted = await refreshTokenService.revokeRefreshToken(
      parsed.data.token,
    );
    if (!deleted) {
      sendError(res, 404, "Refresh token not found");
      return;
    }
    sendSuccess(res, null, { message: "Refresh token revoked successfully" });
  } catch (err) {
    handleControllerError(
      res,
      err,
      "revokeRefreshToken",
      "Failed to revoke refresh token",
    );
  }
}
