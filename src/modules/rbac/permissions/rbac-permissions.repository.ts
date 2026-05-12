import type { WhereOptions } from "sequelize";

import { RbacPermission } from "./rbac-permissions.model";

export async function listPermissions(filters: {
  categoryId?: number;
}): Promise<RbacPermission[]> {
  const where: WhereOptions<RbacPermission> = {};
  if (filters.categoryId !== undefined) {
    where.category_id = filters.categoryId;
  }
  return RbacPermission.findAll({ where, order: [["id", "ASC"]] });
}

export async function createPermission(data: {
  permissionCode: string;
  permissionDescription: string | null;
  categoryId: number | null;
}): Promise<RbacPermission> {
  return RbacPermission.create({
    permission_code: data.permissionCode,
    permission_description: data.permissionDescription,
    category_id: data.categoryId,
  });
}

export async function getPermission(
  id: number,
): Promise<RbacPermission | null> {
  return RbacPermission.findByPk(id);
}

export async function updatePermission(
  id: number,
  data: {
    permissionCode?: string;
    permissionDescription?: string | null;
    categoryId?: number | null;
  },
): Promise<RbacPermission | null> {
  const row = await RbacPermission.findByPk(id);
  if (!row) {
    return null;
  }
  const patch: Partial<{
    permission_code: string;
    permission_description: string | null;
    category_id: number | null;
  }> = {};
  if (data.permissionCode !== undefined) {
    patch.permission_code = data.permissionCode;
  }
  if (data.permissionDescription !== undefined) {
    patch.permission_description = data.permissionDescription;
  }
  if (data.categoryId !== undefined) {
    patch.category_id = data.categoryId;
  }
  await row.update(patch);
  return row;
}

export async function deletePermission(id: number): Promise<boolean> {
  const deleted = await RbacPermission.destroy({ where: { id } });
  return deleted > 0;
}
