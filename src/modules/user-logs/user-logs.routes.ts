import { Router } from "express";

import { createUserLog, listUserLogs } from "./user-logs.controller";

export const userLogsRoutes = Router();

userLogsRoutes.get("/", listUserLogs);
userLogsRoutes.post("/", createUserLog);
