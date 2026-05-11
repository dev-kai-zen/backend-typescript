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
): Promise<RefreshToken> {
  if (Number.isNaN(input.expiresAt.getTime())) {
    throw new Error("expiresAt is invalid");
  }
  return refreshTokenRepository.createRefreshToken({
    userId: input.userId,
    token: input.token.trim(),
    expiresAt: input.expiresAt,
  });
}

export async function getRefreshToken(
  id: number,
): Promise<RefreshToken | null> {
  return refreshTokenRepository.getRefreshToken(id);
}

export async function deleteRefreshToken(id: number): Promise<boolean> {
  return refreshTokenRepository.deleteRefreshToken(id);
}

export async function revokeRefreshToken(token: string): Promise<boolean> {
  return refreshTokenRepository.revokeRefreshToken(token.trim());
}
