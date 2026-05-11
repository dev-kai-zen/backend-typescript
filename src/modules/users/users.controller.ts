import type { Request, Response } from "express";
import { UniqueConstraintError } from "sequelize";

import { formatZodError } from "../../shared/validation/format-zod-error";
import { createUserBodySchema, updateUserBodySchema } from "./users.schemas";
import * as usersService from "./users.service";

export async function listUsers(req: Request, res: Response): Promise<void> {
  let isActive: boolean | undefined;
  if (req.query.isActive === "true") {
    isActive = true;
  } else if (req.query.isActive === "false") {
    isActive = false;
  }
  try {
    const users = await usersService.listUsers({ isActive });
    res.json({ data: users });
  } catch (err) {
    console.error("listUsers:", err);
    res.status(500).json({ message: "Failed to list users" });
  }
}

export async function createUser(req: Request, res: Response): Promise<void> {
  const parsed = createUserBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: formatZodError(parsed.error) });
    return;
  }
  try {
    const user = await usersService.createUser(parsed.data);
    res.status(201).json(user);
  } catch (err) {
    console.error("createUser:", err);
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({
        message: "A user with this email or googleId already exists",
      });
      return;
    }
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Failed to create user" });
  }
}

export async function getUser(req: Request, res: Response): Promise<void> {
  const raw = req.params.id;
  const id =
    typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  if (!Number.isFinite(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  try {
    const user = await usersService.getUser(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (err) {
    console.error("getUser:", err);
    res.status(500).json({ message: "Failed to get user" });
  }
}

export async function updateUser(req: Request, res: Response): Promise<void> {
  const raw = req.params.id;
  const id =
    typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  if (!Number.isFinite(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }

  const parsed = updateUserBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: formatZodError(parsed.error) });
    return;
  }

  try {
    const user = await usersService.updateUser(id, parsed.data);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (err) {
    console.error("updateUser:", err);
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({
        message: "A user with this email or googleId already exists",
      });
      return;
    }
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Failed to update user" });
  }
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  const raw = req.params.id;
  const id =
    typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  if (!Number.isFinite(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  try {
    const deleted = await usersService.deleteUser(id);
    if (!deleted) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(204).send();
  } catch (err) {
    console.error("deleteUser:", err);
    res.status(500).json({ message: "Failed to delete user" });
  }
}
