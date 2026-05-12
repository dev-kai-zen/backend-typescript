import * as rbacCategoriesRepository from "./rbac-categories.repository";
import type { RbacCategory } from "./rbac-categories.model";

export async function listCategories(): Promise<RbacCategory[]> {
  return rbacCategoriesRepository.listCategories();
}

export async function createCategory(data: {
  categoryName: string;
}): Promise<RbacCategory> {
  if (!data.categoryName || data.categoryName.trim() === "") {
    throw new Error("categoryName is required");
  }
  return rbacCategoriesRepository.createCategory({
    categoryName: data.categoryName.trim(),
  });
}

export async function getCategory(id: number): Promise<RbacCategory | null> {
  return rbacCategoriesRepository.getCategory(id);
}

export async function updateCategory(
  id: number,
  data: { categoryName: string },
): Promise<RbacCategory | null> {
  if (!data.categoryName || data.categoryName.trim() === "") {
    throw new Error("categoryName is required");
  }
  return rbacCategoriesRepository.updateCategory(id, {
    categoryName: data.categoryName.trim(),
  });
}

export async function deleteCategory(id: number): Promise<boolean> {
  return rbacCategoriesRepository.deleteCategory(id);
}
