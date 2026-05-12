import { RbacCategory } from "./rbac-categories.model";

export async function listCategories(): Promise<RbacCategory[]> {
  return RbacCategory.findAll({ order: [["id", "ASC"]] });
}

export async function createCategory(data: {
  categoryName: string;
}): Promise<RbacCategory> {
  return RbacCategory.create({
    category_name: data.categoryName,
  });
}

export async function getCategory(id: number): Promise<RbacCategory | null> {
  return RbacCategory.findByPk(id);
}

export async function updateCategory(
  id: number,
  data: { categoryName: string },
): Promise<RbacCategory | null> {
  const row = await RbacCategory.findByPk(id);
  if (!row) {
    return null;
  }
  await row.update({ category_name: data.categoryName });
  return row;
}

export async function deleteCategory(id: number): Promise<boolean> {
  const deleted = await RbacCategory.destroy({ where: { id } });
  return deleted > 0;
}
