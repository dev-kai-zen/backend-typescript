import { sequelize } from "../../config/sequelize-config";
import type { DbOptions } from "../types/db-options";

/**
 * Reuse `options.transaction` when present; otherwise open one transaction for this call.
 * Use in public service methods; keep business logic in a `_helper` passed as `fn`.
 *
 * @example
 * export async function createCategory(data, options: DbOptions = {}) {
 *   return withTransaction((opts) => _createCategory(data, opts), options);
 * }
 */
export async function withTransaction<T>(
  fn: (options: DbOptions) => Promise<T>,
  options: DbOptions = {},
): Promise<T> {
  if (options.transaction) {
    return fn(options);
  }

  return sequelize.transaction(async (transaction) => {
    return fn({ ...options, transaction });
  });
}
