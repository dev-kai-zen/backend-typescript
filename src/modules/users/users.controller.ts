import type { Request, Response } from "express";
import { UniqueConstraintError } from "sequelize";

import type { UpdateUserInput } from "./users.types";
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
  const body = req.body as {
    email?: string;
    googleId?: string | null;
    fullName?: string | null;
    pictureUrl?: string | null;
    isActive?: boolean;
  };
  if (!body.email || typeof body.email !== "string") {
    res.status(400).json({ message: "email is required" });
    return;
  }
  try {
    const user = await usersService.createUser({
      email: body.email,
      googleId: body.googleId,
      fullName: body.fullName,
      pictureUrl: body.pictureUrl,
      isActive: body.isActive,
    });
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

  const body = req.body as {
    email?: string;
    googleId?: string | null;
    fullName?: string | null;
    pictureUrl?: string | null;
    isActive?: boolean;
    lastLoginAt?: string | null;
  };

  const payload: UpdateUserInput = {};
  if ("email" in body) {
    if (typeof body.email !== "string") {
      res.status(400).json({ message: "email must be a string when provided" });
      return;
    }
    payload.email = body.email;
  }
  if ("googleId" in body) {
    if (body.googleId !== null && typeof body.googleId !== "string") {
      res.status(400).json({ message: "googleId must be a string or null" });
      return;
    }
    payload.googleId = body.googleId;
  }
  if ("fullName" in body) {
    if (body.fullName !== null && typeof body.fullName !== "string") {
      res.status(400).json({ message: "fullName must be a string or null" });
      return;
    }
    payload.fullName = body.fullName;
  }
  if ("pictureUrl" in body) {
    if (body.pictureUrl !== null && typeof body.pictureUrl !== "string") {
      res.status(400).json({ message: "pictureUrl must be a string or null" });
      return;
    }
    payload.pictureUrl = body.pictureUrl;
  }
  if ("isActive" in body) {
    if (typeof body.isActive !== "boolean") {
      res.status(400).json({ message: "isActive must be a boolean" });
      return;
    }
    payload.isActive = body.isActive;
  }
  if ("lastLoginAt" in body) {
    if (body.lastLoginAt === null || body.lastLoginAt === "") {
      payload.lastLoginAt = null;
    } else if (typeof body.lastLoginAt === "string") {
      const d = new Date(body.lastLoginAt);
      if (Number.isNaN(d.getTime())) {
        res.status(400).json({ message: "lastLoginAt must be a valid ISO date" });
        return;
      }
      payload.lastLoginAt = d;
    } else {
      res.status(400).json({ message: "lastLoginAt must be null or an ISO date string" });
      return;
    }
  }

  try {
    const user = await usersService.updateUser(id, payload);
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
