import { Router } from "express";

import * as usersController from "./users.controller";

export const usersRoutes = Router();

usersRoutes.get("/", usersController.listUsers);
usersRoutes.post("/", usersController.createUser);
usersRoutes.get("/:id", usersController.getUser);
usersRoutes.patch("/:id", usersController.updateUser);
usersRoutes.delete("/:id", usersController.deleteUser);
