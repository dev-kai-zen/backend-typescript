import type { Response } from "express";
import type { ZodError } from "zod";

import { formatZodError } from "../validation/format-zod-error";

export interface ApiResponseBody<T = unknown> {
  status: boolean;
  message: string;
  data: T | null;
}

export function sendSuccess<T>(
  res: Response,
  data: T,
  options?: { httpStatus?: number; message?: string },
): void {
  const httpStatus = options?.httpStatus ?? 200;
  res.status(httpStatus).json({
    status: true,
    message: options?.message ?? "OK",
    data,
  } satisfies ApiResponseBody<T>);
}

export function sendError(
  res: Response,
  httpStatus: number,
  message: string,
  data: null = null,
): void {
  res.status(httpStatus).json({
    status: false,
    message,
    data,
  } satisfies ApiResponseBody<null>);
}

export function sendValidationError(res: Response, error: ZodError): void {
  sendError(res, 400, formatZodError(error));
}
