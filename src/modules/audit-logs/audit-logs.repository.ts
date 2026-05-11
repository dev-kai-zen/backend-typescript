import type { WhereOptions } from "sequelize";

import { AuditLog } from "./audit-logs.model";
import type { CreateAuditLogInput, ListAuditLogsFilters } from "./audit-logs.types";

export async function listAuditLogs(
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

export async function createAuditLog(
  input: CreateAuditLogInput,
): Promise<AuditLog> {
  return AuditLog.create({
    userId: input.userId ?? null,
    action: input.action,
    entityType: input.entityType,
    entityId: input.entityId ?? null,
    oldValues: input.oldValues ?? null,
    newValues: input.newValues ?? null,
    changeFields: input.changeFields ?? null,
    ipAddress: input.ipAddress ?? null,
    userAgent: input.userAgent ?? null,
    timestamp: input.timestamp ?? new Date(),
  });
}

export async function createAuditLogs(
  inputs: CreateAuditLogInput[],
): Promise<AuditLog[]> {
  if (inputs.length === 0) {
    return [];
  }
  return AuditLog.bulkCreate(
    inputs.map((input) => ({
      userId: input.userId ?? null,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId ?? null,
      oldValues: input.oldValues ?? null,
      newValues: input.newValues ?? null,
      changeFields: input.changeFields ?? null,
      ipAddress: input.ipAddress ?? null,
      userAgent: input.userAgent ?? null,
      timestamp: input.timestamp ?? new Date(),
    })),
    { validate: true },
  );
}
