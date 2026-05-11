import { Router } from "express";

import {
  createUser,
  deleteUser,
  getUser,
  listUsers,
  updateUser,
} from "./users.controller";

export const usersRoutes = Router();

usersRoutes.get("/", listUsers);
usersRoutes.post("/", createUser);
usersRoutes.get("/:id", getUser);
usersRoutes.patch("/:id", updateUser);
usersRoutes.delete("/:id", deleteUser);
