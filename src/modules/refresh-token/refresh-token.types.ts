export interface ListRefreshTokensFilters {
  userId?: number;
}

export interface CreateRefreshTokenInput {
  userId: number;
  token: string;
  expiresAt: Date;
}
