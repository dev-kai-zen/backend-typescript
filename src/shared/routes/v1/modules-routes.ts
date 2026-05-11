import { Router } from "express";

import { testRoutes } from "../../../modules/test-routes/test-routes";

export const v1ModulesRouter = Router();

v1ModulesRouter.use("/test", testRoutes);
