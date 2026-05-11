export interface ListAuditLogsFilters {
  action?: string;
  entityType?: string;
}

export interface CreateAuditLogInput {
  userId?: number | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  oldValues?: Record<string, unknown> | null;
  newValues?: Record<string, unknown> | null;
  changeFields?: string[] | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  /** Defaults to `new Date()` when omitted. */
  timestamp?: Date;
}
