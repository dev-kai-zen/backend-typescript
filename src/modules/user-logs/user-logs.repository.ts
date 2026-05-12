import type { WhereOptions } from "sequelize";

import { UserLog } from "./user-logs.model";
import type {
  CreateUserLogInput,
  ListUserLogsFilters,
} from "./user-logs.types";

export async function listUserLogs(
  filters: ListUserLogsFilters,
  options: { limit: number; offset: number },
): Promise<UserLog[]> {
  const where: WhereOptions<UserLog> = {};
  if (filters.userId !== undefined && Number.isFinite(filters.userId)) {
    where.user_id = filters.userId;
  }
  if (filters.action !== undefined && filters.action !== "") {
    where.action = filters.action;
  }
  if (filters.module !== undefined && filters.module !== "") {
    where.module = filters.module;
  }

  return UserLog.findAll({
    where,
    limit: options.limit,
    offset: options.offset,
    order: [["created_at", "DESC"]],
  });
}

export async function createUserLog(
  input: CreateUserLogInput,
): Promise<UserLog> {
  return UserLog.create({
    user_id: input.userId ?? null,
    action: input.action,
    module: input.module ?? null,
    description: input.description ?? null,
    method: input.method ?? null,
    route: input.route ?? null,
    status_code: input.statusCode ?? null,
    ip_address: input.ipAddress ?? null,
    user_agent: input.userAgent ?? null,
    device_type: input.deviceType ?? null,
    browser: input.browser ?? null,
    os: input.os ?? null,
    session_id: input.sessionId ?? null,
    metadata: input.metadata ?? null,
  });
}
