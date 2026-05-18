import { Router } from "express";

import * as userLogsController from "./user-logs.controller";

export const userLogsRoutes = Router();

userLogsRoutes.get("/", userLogsController.listUserLogs);
userLogsRoutes.post("/", userLogsController.createUserLog);
