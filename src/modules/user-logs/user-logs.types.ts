export interface ListUserLogsFilters {
  userId?: number;
  action?: string;
  module?: string;
}

export interface CreateUserLogInput {
  userId?: number | null;
  action: string;
  module?: string | null;
  description?: string | null;
  method?: string | null;
  route?: string | null;
  statusCode?: number | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  deviceType?: string | null;
  browser?: string | null;
  os?: string | null;
  sessionId?: string | null;
  metadata?: Record<string, unknown> | null;
}
