import type { Request, Response } from "express";

import {
  sendError,
  sendSuccess,
  sendValidationError,
} from "../../../shared/http/api-response";
import { handleControllerError } from "../../../shared/http/handle-controller-error";
import { parseRouteId } from "../../../shared/http/parse-route-id";
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
    sendSuccess(res, categories, { message: "Categories listed successfully" });
  } catch (err) {
    handleControllerError(res, err, "listCategories", "Failed to list categories");
  }
}

export async function createCategory(req: Request, res: Response): Promise<void> {
  const parsed = createCategoryBodySchema.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, parsed.error);
    return;
  }
  try {
    const row = await rbacCategoriesService.createCategory(parsed.data);
    sendSuccess(res, row, {
      httpStatus: 201,
      message: "Category created successfully",
    });
  } catch (err) {
    handleControllerError(res, err, "createCategory", "Failed to create category");
  }
}

export async function getCategory(req: Request, res: Response): Promise<void> {
  const id = parseRouteId(req.params.id);
  if (id === null) {
    sendError(res, 400, "Invalid id");
    return;
  }
  try {
    const row = await rbacCategoriesService.getCategory(id);
    if (!row) {
      sendError(res, 404, "Category not found");
      return;
    }
    sendSuccess(res, row, { message: "Category fetched successfully" });
  } catch (err) {
    handleControllerError(res, err, "getCategory", "Failed to get category");
  }
}

export async function updateCategory(req: Request, res: Response): Promise<void> {
  const id = parseRouteId(req.params.id);
  if (id === null) {
    sendError(res, 400, "Invalid id");
    return;
  }
  const parsed = updateCategoryBodySchema.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, parsed.error);
    return;
  }
  try {
    const row = await rbacCategoriesService.updateCategory(id, parsed.data);
    if (!row) {
      sendError(res, 404, "Category not found");
      return;
    }
    sendSuccess(res, row, { message: "Category updated successfully" });
  } catch (err) {
    handleControllerError(res, err, "updateCategory", "Failed to update category");
  }
}

export async function deleteCategory(req: Request, res: Response): Promise<void> {
  const id = parseRouteId(req.params.id);
  if (id === null) {
    sendError(res, 400, "Invalid id");
    return;
  }
  try {
    const deleted = await rbacCategoriesService.deleteCategory(id);
    if (!deleted) {
      sendError(res, 404, "Category not found");
      return;
    }
    sendSuccess(res, null, { message: "Category deleted successfully" });
  } catch (err) {
    handleControllerError(res, err, "deleteCategory", "Failed to delete category");
  }
}
