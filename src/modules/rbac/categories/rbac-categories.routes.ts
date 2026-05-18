import { Router } from "express";

import * as rbacCategoryController from "./rbac-categories.controller";

export const rbacCategoriesRoutes = Router();

rbacCategoriesRoutes.get("/", rbacCategoryController.listCategories);
rbacCategoriesRoutes.post("/", rbacCategoryController.createCategory);
rbacCategoriesRoutes.get("/:id", rbacCategoryController.getCategory);
rbacCategoriesRoutes.patch("/:id", rbacCategoryController.updateCategory);
rbacCategoriesRoutes.delete("/:id", rbacCategoryController.deleteCategory);
