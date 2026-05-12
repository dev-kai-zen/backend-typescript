import type { Request, Response } from "express";
import { UniqueConstraintError } from "sequelize";

import { formatZodError } from "../../../shared/validation/format-zod-error";
import {
  createCategoryBodySchema,
  updateCategoryBodySchema,
} from "./rbac-categories.schemas";
import * as rbacCategoriesService from "./rbac-categories.service";

export async function listCategories(
  _req: Request,
  res: Response,
): Promise<void> {
  try {
    const categories = await rbacCategoriesService.listCategories();
    res.json({ data: categories });
  } catch (err) {
    console.error("listCategories:", err);
    res.status(500).json({ message: "Failed to list categories" });
  }
}

export async function createCategory(req: Request, res: Response): Promise<void> {
  const parsed = createCategoryBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: formatZodError(parsed.error) });
    return;
  }
  try {
    const row = await rbacCategoriesService.createCategory(parsed.data);
    res.status(201).json(row);
  } catch (err) {
    console.error("createCategory:", err);
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({ message: "categoryName already exists" });
      return;
    }
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Failed to create category" });
  }
}

export async function getCategory(req: Request, res: Response): Promise<void> {
  const raw = req.params.id;
  const id =
    typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  if (!Number.isFinite(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  try {
    const row = await rbacCategoriesService.getCategory(id);
    if (!row) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.json(row);
  } catch (err) {
    console.error("getCategory:", err);
    res.status(500).json({ message: "Failed to get category" });
  }
}

export async function updateCategory(req: Request, res: Response): Promise<void> {
  const raw = req.params.id;
  const id =
    typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  if (!Number.isFinite(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  const parsed = updateCategoryBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: formatZodError(parsed.error) });
    return;
  }
  try {
    const row = await rbacCategoriesService.updateCategory(id, parsed.data);
    if (!row) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.json(row);
  } catch (err) {
    console.error("updateCategory:", err);
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({ message: "categoryName already exists" });
      return;
    }
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Failed to update category" });
  }
}

export async function deleteCategory(req: Request, res: Response): Promise<void> {
  const raw = req.params.id;
  const id =
    typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  if (!Number.isFinite(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  try {
    const deleted = await rbacCategoriesService.deleteCategory(id);
    if (!deleted) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.status(204).send();
  } catch (err) {
    console.error("deleteCategory:", err);
    res.status(500).json({ message: "Failed to delete category" });
  }
}
