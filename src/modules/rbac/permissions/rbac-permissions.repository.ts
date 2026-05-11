import type { WhereOptions } from "sequelize";

import { RbacPermission } from "./rbac-permissions.model";

export async function listPermissions(filters: {
  groupId?: number;
}): Promise<RbacPermission[]> {
  const where: WhereOptions<RbacPermission> = {};
  if (filters.groupId !== undefined) {
    where.groupId = filters.groupId;
  }
  return RbacPermission.findAll({ where, order: [["id", "ASC"]] });
}

export async function createPermission(data: {
  permissionCode: string;
  permissionDescription: string | null;
  groupId: number | null;
}): Promise<RbacPermission> {
  return RbacPermission.create({
    permissionCode: data.permissionCode,
    permissionDescription: data.permissionDescription,
    groupId: data.groupId,
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
    groupId?: number | null;
  },
): Promise<RbacPermission | null> {
  const row = await RbacPermission.findByPk(id);
  if (!row) {
    return null;
  }
  await row.update(data);
  return row;
}

export async function deletePermission(id: number): Promise<boolean> {
  const deleted = await RbacPermission.destroy({ where: { id } });
  return deleted > 0;
}
