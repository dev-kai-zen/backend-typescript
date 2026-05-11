import * as auditLogsRepository from "./audit-logs.repository";
import type { AuditLog } from "./audit-logs.model";
import type { CreateAuditLogInput, ListAuditLogsFilters } from "./audit-logs.types";

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 200;

export async function listAuditLogs(
  filters: ListAuditLogsFilters,
  options?: { limit?: number; offset?: number },
): Promise<AuditLog[]> {
  let limit = options?.limit ?? DEFAULT_LIMIT;
  if (limit > MAX_LIMIT) {
    limit = MAX_LIMIT;
  }
  const offset = options?.offset ?? 0;
  return auditLogsRepository.listAuditLogs(filters, { limit, offset });
}

export async function createAuditLog(
  input: CreateAuditLogInput,
): Promise<AuditLog> {
  return auditLogsRepository.createAuditLog(input);
}

export async function createAuditLogs(
  inputs: CreateAuditLogInput[],
): Promise<AuditLog[]> {
  return auditLogsRepository.createAuditLogs(inputs);
}
