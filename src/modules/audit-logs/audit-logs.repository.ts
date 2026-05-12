import type { WhereOptions } from "sequelize";

import { AuditLog } from "./audit-logs.model";
import type {
  CreateAuditLogInput,
  ListAuditLogsFilters,
} from "./audit-logs.types";

export async function listAuditLogs(
  filters: ListAuditLogsFilters,
  options: { limit: number; offset: number },
): Promise<AuditLog[]> {
  const where: WhereOptions<AuditLog> = {};
  if (filters.action !== undefined && filters.action !== "") {
    where.action = filters.action;
  }
  if (filters.entity_type !== undefined && filters.entity_type !== "") {
    where.entity_type = filters.entity_type;
  }

  return AuditLog.findAll({
    where,
    limit: options.limit,
    offset: options.offset,
    order: [["created_at", "DESC"]],
  });
}

export async function createAuditLog(
  input: CreateAuditLogInput,
): Promise<AuditLog> {
  return AuditLog.create({
    user_id: input.user_id ?? null,
    action: input.action,
    entity_type: input.entity_type,
    entity_id: input.entity_id ?? null,
    old_values: input.old_values ?? null,
    new_values: input.new_values ?? null,
    change_fields: input.change_fields ?? null,
    ip_address: input.ip_address ?? null,
    user_agent: input.user_agent ?? null,
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
      user_id: input.user_id ?? null,
      action: input.action,
      entity_type: input.entity_type,
      entity_id: input.entity_id ?? null,
      old_values: input.old_values ?? null,
      new_values: input.new_values ?? null,
      change_fields: input.change_fields ?? null,
      ip_address: input.ip_address ?? null,
      user_agent: input.user_agent ?? null,
      timestamp: input.timestamp ?? new Date(),
    })),
    { validate: true },
  );
}
