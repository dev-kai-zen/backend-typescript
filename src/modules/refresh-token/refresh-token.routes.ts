import { Router } from "express";

import {
  createRefreshToken,
  deleteRefreshToken,
  getRefreshToken,
  listRefreshTokens,
  revokeRefreshToken,
} from "./refresh-token.controller";

export const refreshTokenRoutes = Router();

refreshTokenRoutes.get("/", listRefreshTokens);
refreshTokenRoutes.post("/", createRefreshToken);
refreshTokenRoutes.post("/revoke", revokeRefreshToken);
refreshTokenRoutes.get("/:id", getRefreshToken);
refreshTokenRoutes.delete("/:id", deleteRefreshToken);
