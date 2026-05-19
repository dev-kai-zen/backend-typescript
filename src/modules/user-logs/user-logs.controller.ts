import type { Request, Response } from "express";

import {
  sendSuccess,
  sendValidationError,
} from "../../shared/http/api-response";
import { handleControllerError } from "../../shared/http/handle-controller-error";
import {
  createUserLogBodySchema,
  listUserLogsQuerySchema,
} from "./user-logs.schemas";
import * as userLogsService from "./user-logs.service";

function firstQueryString(val: unknown): string | undefined {
  if (typeof val === "string") {
    return val;
  }
  if (Array.isArray(val) && typeof val[0] === "string") {
    return val[0];
  }
  return undefined;
}

export async function listUserLogs(
  req: Request,
  res: Response,
): Promise<void> {
  const parsed = listUserLogsQuerySchema.safeParse({
    userId: firstQueryString(req.query.userId),
    action: firstQueryString(req.query.action),
    module: firstQueryString(req.query.module),
    limit: firstQueryString(req.query.limit),
    offset: firstQueryString(req.query.offset),
  });
  if (!parsed.success) {
    sendValidationError(res, parsed.error);
    return;
  }
  const { limit, offset, ...filters } = parsed.data;
  try {
    const logs = await userLogsService.listUserLogs(filters, { limit, offset });
    sendSuccess(res, logs, { message: "User logs listed successfully" });
  } catch (err) {
    handleControllerError(res, err, "listUserLogs", "Failed to list user logs");
  }
}

export async function createUserLog(
  req: Request,
  res: Response,
): Promise<void> {
  const parsed = createUserLogBodySchema.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, parsed.error);
    return;
  }
  try {
    const log = await userLogsService.createUserLog({
      action: parsed.data.action,
      userId: parsed.data.userId ?? null,
      module: parsed.data.module ?? null,
      description: parsed.data.description ?? null,
      method: parsed.data.method ?? null,
      route: parsed.data.route ?? null,
      statusCode: parsed.data.statusCode ?? null,
      ipAddress: parsed.data.ipAddress ?? null,
      userAgent: parsed.data.userAgent ?? null,
      deviceType: parsed.data.deviceType ?? null,
      browser: parsed.data.browser ?? null,
      os: parsed.data.os ?? null,
      sessionId: parsed.data.sessionId ?? null,
      metadata: parsed.data.metadata ?? null,
    });
    sendSuccess(res, log, {
      httpStatus: 201,
      message: "User log created successfully",
    });
  } catch (err) {
    handleControllerError(res, err, "createUserLog", "Failed to create user log");
  }
}
