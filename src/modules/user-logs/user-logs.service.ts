import { withTransaction } from "../../shared/db/with-transaction";
import type { DbOptions } from "../../shared/types/db-options";
import * as userLogsRepository from "./user-logs.repository";
import type { UserLog } from "./user-logs.model";
import type { CreateUserLogInput, ListUserLogsFilters } from "./user-logs.types";

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 200;

export async function listUserLogs(
  filters: ListUserLogsFilters,
  options?: { limit?: number; offset?: number },
): Promise<UserLog[]> {
  let limit = options?.limit ?? DEFAULT_LIMIT;
  if (limit > MAX_LIMIT) {
    limit = MAX_LIMIT;
  }
  const offset = options?.offset ?? 0;
  return userLogsRepository.listUserLogs(filters, { limit, offset });
}

export async function createUserLog(
  input: CreateUserLogInput,
  options: DbOptions = {},
): Promise<UserLog> {
  return withTransaction(async (opts) => {
    if (!input.action || typeof input.action !== "string") {
      throw new Error("action is required");
    }
    const action = input.action.trim();
    if (action === "") {
      throw new Error("action is required");
    }

    return userLogsRepository.createUserLog(
      {
        userId: input.userId ?? null,
        action,
        module:
          typeof input.module === "string"
            ? input.module.trim() || null
            : null,
        description:
          typeof input.description === "string" ? input.description : null,
        method: typeof input.method === "string" ? input.method : null,
        route: typeof input.route === "string" ? input.route : null,
        statusCode:
          typeof input.statusCode === "number" &&
          Number.isFinite(input.statusCode)
            ? input.statusCode
            : null,
        ipAddress:
          typeof input.ipAddress === "string" ? input.ipAddress : null,
        userAgent:
          typeof input.userAgent === "string" ? input.userAgent : null,
        deviceType:
          typeof input.deviceType === "string" ? input.deviceType : null,
        browser: typeof input.browser === "string" ? input.browser : null,
        os: typeof input.os === "string" ? input.os : null,
        sessionId:
          typeof input.sessionId === "string" ? input.sessionId : null,
        metadata:
          input.metadata !== undefined && input.metadata !== null
            ? input.metadata
            : null,
      },
      opts,
    );
  }, options);
}
