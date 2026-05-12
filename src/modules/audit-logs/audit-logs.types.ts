export interface ListAuditLogsFilters {
  action?: string;
  entity_type?: string;
}

export interface CreateAuditLogInput {
  user_id?: number | null;
  action: string;
  entity_type: string;
  entity_id?: string | null;
  old_values?: Record<string, unknown> | null;
  new_values?: Record<string, unknown> | null;
  change_fields?: string[] | null;
  ip_address?: string | null;
  user_agent?: string | null;
  /** Defaults to `new Date()` when omitted. */
  timestamp?: Date;
}
