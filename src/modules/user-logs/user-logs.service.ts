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
  return withTransaction(
    (opts) => userLogsRepository.createUserLog(input, opts),
    options,
  );
}
