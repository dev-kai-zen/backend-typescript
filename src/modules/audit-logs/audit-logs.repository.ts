import type { WhereOptions } from "sequelize";

import { AuditLog } from "./audit-logs.model";
import type { CreateAuditLogInput, ListAuditLogsFilters } from "./audit-logs.types";

function withTimestamp(input: CreateAuditLogInput): Omit<
  CreateAuditLogInput,
  "timestamp"
> & { timestamp: Date } {
  const timestamp = input.timestamp ?? new Date();
  return { ...input, timestamp };
}

export async function findAuditLogs(
  filters: ListAuditLogsFilters,
  options: { limit: number; offset: number },
): Promise<AuditLog[]> {
  const where: WhereOptions<AuditLog> = {};
  if (filters.action !== undefined && filters.action !== "") {
    where.action = filters.action;
  }
  if (filters.entityType !== undefined && filters.entityType !== "") {
    where.entityType = filters.entityType;
  }

  return AuditLog.findAll({
    where,
    limit: options.limit,
    offset: options.offset,
    order: [["createdAt", "DESC"]],
  });
}

export async function insertAuditLog(input: CreateAuditLogInput): Promise<AuditLog> {
  const row = withTimestamp(input);
  return AuditLog.create({
    userId: row.userId ?? null,
    action: row.action,
    entityType: row.entityType,
    entityId: row.entityId ?? null,
    oldValues: row.oldValues ?? null,
    newValues: row.newValues ?? null,
    changeFields: row.changeFields ?? null,
    ipAddress: row.ipAddress ?? null,
    userAgent: row.userAgent ?? null,
    timestamp: row.timestamp,
  });
}

export async function insertAuditLogs(
  inputs: CreateAuditLogInput[],
): Promise<AuditLog[]> {
  if (inputs.length === 0) {
    return [];
  }
  const rows = inputs.map((input) => {
    const row = withTimestamp(input);
    return {
      userId: row.userId ?? null,
      action: row.action,
      entityType: row.entityType,
      entityId: row.entityId ?? null,
      oldValues: row.oldValues ?? null,
      newValues: row.newValues ?? null,
      changeFields: row.changeFields ?? null,
      ipAddress: row.ipAddress ?? null,
      userAgent: row.userAgent ?? null,
      timestamp: row.timestamp,
    };
  });
  return AuditLog.bulkCreate(rows, { validate: true });
}
