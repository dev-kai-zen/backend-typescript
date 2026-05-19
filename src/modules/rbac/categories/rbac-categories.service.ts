import { withTransaction } from "../../../shared/db/with-transaction";
import type { DbOptions } from "../../../shared/types/db-options";
import * as rbacCategoriesRepository from "./rbac-categories.repository";
import type { RbacCategory } from "./rbac-categories.model";

export async function listCategories(): Promise<RbacCategory[]> {
  return rbacCategoriesRepository.listCategories();
}

export async function createCategory(
  data: { categoryName: string },
  options: DbOptions = {},
): Promise<RbacCategory> {
  return withTransaction(
    (opts) => rbacCategoriesRepository.createCategory(data, opts),
    options,
  );
}

export async function getCategory(id: number): Promise<RbacCategory | null> {
  return rbacCategoriesRepository.getCategory(id);
}

export async function updateCategory(
  id: number,
  data: { categoryName: string },
  options: DbOptions = {},
): Promise<RbacCategory | null> {
  return withTransaction(
    (opts) => rbacCategoriesRepository.updateCategory(id, data, opts),
    options,
  );
}

export async function deleteCategory(
  id: number,
  options: DbOptions = {},
): Promise<boolean> {
  return withTransaction(
    (opts) => rbacCategoriesRepository.deleteCategory(id, opts),
    options,
  );
}
