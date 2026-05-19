import { withTransaction } from "../../shared/db/with-transaction";
import type { DbOptions } from "../../shared/types/db-options";
import type { RefreshToken } from "./refresh-token.model";
import * as refreshTokenRepository from "./refresh-token.repository";
import type {
  CreateRefreshTokenInput,
  ListRefreshTokensFilters,
} from "./refresh-token.types";

export async function listRefreshTokens(
  filters: ListRefreshTokensFilters,
): Promise<RefreshToken[]> {
  return refreshTokenRepository.listRefreshTokens(filters);
}

export async function createRefreshToken(
  input: CreateRefreshTokenInput,
  options: DbOptions = {},
): Promise<RefreshToken> {
  return withTransaction(async (opts) => {
    if (Number.isNaN(input.expiresAt.getTime())) {
      throw new Error("expiresAt is invalid");
    }
    return refreshTokenRepository.createRefreshToken(
      {
        userId: input.userId,
        token: input.token.trim(),
        expiresAt: input.expiresAt,
      },
      opts,
    );
  }, options);
}

export async function getRefreshToken(
  id: number,
): Promise<RefreshToken | null> {
  return refreshTokenRepository.getRefreshToken(id);
}

export async function deleteRefreshToken(
  id: number,
  options: DbOptions = {},
): Promise<boolean> {
  return withTransaction(
    (opts) => refreshTokenRepository.deleteRefreshToken(id, opts),
    options,
  );
}

export async function revokeRefreshToken(
  token: string,
  options: DbOptions = {},
): Promise<boolean> {
  return withTransaction(
    (opts) => refreshTokenRepository.revokeRefreshToken(token.trim(), opts),
    options,
  );
}
