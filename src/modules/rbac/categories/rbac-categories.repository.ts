import type { DbOptions } from "../../../shared/types/db-options";
import { RbacCategory } from "./rbac-categories.model";

export async function listCategories(): Promise<RbacCategory[]> {
  return RbacCategory.findAll({ order: [["id", "ASC"]] });
}

export async function createCategory(
  data: { categoryName: string },
  options: DbOptions = {},
): Promise<RbacCategory> {
  return RbacCategory.create({ category_name: data.categoryName }, options);
}

export async function getCategory(id: number): Promise<RbacCategory | null> {
  return RbacCategory.findByPk(id);
}

export async function updateCategory(
  id: number,
  data: { categoryName: string },
  options: DbOptions = {},
): Promise<RbacCategory | null> {
  const row = await RbacCategory.findByPk(id, options);
  if (!row) {
    return null;
  }
  await row.update({ category_name: data.categoryName }, options);
  return row;
}

export async function deleteCategory(
  id: number,
  options: DbOptions = {},
): Promise<boolean> {
  const deleted = await RbacCategory.destroy({ where: { id }, ...options });
  return deleted > 0;
}
