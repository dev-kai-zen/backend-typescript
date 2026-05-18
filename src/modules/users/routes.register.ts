import type { Router } from "express";

import { usersRoutes } from "./users.routes";

export const routeRegistrationOrder = 80;

export function registerV1Routes(v1Router: Router): void {
  v1Router.use("/users", usersRoutes);
}
