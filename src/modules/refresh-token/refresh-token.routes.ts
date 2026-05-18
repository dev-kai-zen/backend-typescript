import { Router } from "express";

import * as refreshTokenController from "./refresh-token.controller";

export const refreshTokenRoutes = Router();

refreshTokenRoutes.get("/", refreshTokenController.listRefreshTokens);
refreshTokenRoutes.post("/", refreshTokenController.createRefreshToken);
refreshTokenRoutes.post("/revoke", refreshTokenController.revokeRefreshToken);
refreshTokenRoutes.get("/:id", refreshTokenController.getRefreshToken);
refreshTokenRoutes.delete("/:id", refreshTokenController.deleteRefreshToken);
