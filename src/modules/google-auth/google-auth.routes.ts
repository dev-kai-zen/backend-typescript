import { Router } from "express";

import { authenticateJwt } from "../../shared/middlewares/auth-middleware";
import { authLimiter } from "../../shared/middlewares/rate-limiter";
import * as googleAuthController from "./google-auth.controller";

export const googleAuthRoutes = Router();

googleAuthRoutes.post("/login", authLimiter, googleAuthController.login);
googleAuthRoutes.post("/refresh", authLimiter, googleAuthController.refresh);
googleAuthRoutes.post("/logout", googleAuthController.logout);
googleAuthRoutes.get("/me", authenticateJwt, googleAuthController.me);
