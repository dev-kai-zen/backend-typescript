import type { WhereOptions } from "sequelize";

import type { DbOptions } from "../../shared/types/db-options";
import type {
  CreateRefreshTokenInput,
  ListRefreshTokensFilters,
} from "./refresh-token.types";
import { RefreshToken } from "./refresh-token.model";

export async function listRefreshTokens(
  filters: ListRefreshTokensFilters,
): Promise<RefreshToken[]> {
  const where: WhereOptions<RefreshToken> = {};
  if (filters.userId !== undefined && Number.isFinite(filters.userId)) {
    where.user_id = filters.userId;
  }
  return RefreshToken.findAll({
    where,
    order: [["created_at", "DESC"]],
  });
}

export async function createRefreshToken(
  input: CreateRefreshTokenInput,
  options: DbOptions = {},
): Promise<RefreshToken> {
  return RefreshToken.create(
    {
      user_id: input.userId,
      token: input.token,
      expires_at: input.expiresAt,
    },
    options,
  );
}

export async function getRefreshToken(
  id: number,
): Promise<RefreshToken | null> {
  return RefreshToken.findByPk(id);
}

export async function deleteRefreshToken(
  id: number,
  options: DbOptions = {},
): Promise<boolean> {
  const deleted = await RefreshToken.destroy({ where: { id }, ...options });
  return deleted > 0;
}

export async function revokeRefreshToken(
  token: string,
  options: DbOptions = {},
): Promise<boolean> {
  const deleted = await RefreshToken.destroy({ where: { token }, ...options });
  return deleted > 0;
}
