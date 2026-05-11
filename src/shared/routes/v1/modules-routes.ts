import { Router } from "express";

import { testRoutes } from "../../../modules/test-routes/test-routes";

/**
 * All feature modules for API v1. Add a line per module, e.g.:
 * v1ModulesRouter.use("/posts", postsRoutes);
 */
export const v1ModulesRouter = Router();

v1ModulesRouter.use("/test", testRoutes);
