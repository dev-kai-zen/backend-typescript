import { Op } from "sequelize";

import type { DbOptions } from "../../../shared/types/db-options";
import { RbacPermission } from "../permissions/rbac-permissions.model";
import { RbacRolePermission } from "./rbac-role-permissions.model";
import { RolePermissionsWithPermissionDetails } from "./rbac-role-permissions.types";

/** Hard-deletes existing links for the role, then inserts the new set (see model unique + paranoid). */
export async function setRolePermissionsForRole(
  roleId: number,
  permissionIds: number[],
  options: DbOptions = {},
): Promise<RbacRolePermission[]> {
  const existing = await RbacRolePermission.findAll({
    where: { role_id: roleId },
    ...options,
  });
  if (existing.length > 0) {
    await RbacRolePermission.destroy({
      where: { role_id: roleId },
      force: true,
      ...options,
    });
  }
  if (permissionIds.length === 0) {
    return [];
  }
  return RbacRolePermission.bulkCreate(
    permissionIds.map((permission_id) => ({
      role_id: roleId,
      permission_id,
    })),
    { ...options, validate: true },
  );
}

export async function listRolePermissions(
  roleId: number,
): Promise<RbacRolePermission[]> {
  return RbacRolePermission.findAll({
    where: { role_id: roleId },
    order: [["id", "ASC"]],
  });
}

export async function createRolePermission(
  data: {
    roleId: number;
    permissionId: number;
  },
  options: DbOptions = {},
): Promise<RbacRolePermission> {
  return RbacRolePermission.create(
    {
      role_id: data.roleId,
      permission_id: data.permissionId,
    },
    options,
  );
}

export async function deleteRolePermission(
  roleId: number,
  permissionId: number,
  options: DbOptions = {},
): Promise<boolean> {
  const deleted = await RbacRolePermission.destroy({
    where: { role_id: roleId, permission_id: permissionId },
    ...options,
  });
  return deleted > 0;
}


export async function getRolePermissionsByRoleIds(roleIds: number[]): Promise<RolePermissionsWithPermissionDetails[]> {
  const rows = await  RbacRolePermission.findAll({
    where: { role_id: { [Op.in]: roleIds } },
    include: [
      {
        model: RbacPermission,
        as: "permission",
        attributes: ["permission_code"],
        where: { is_active: true },
        required: true,
      },
    ],
  });

  return rows.map((row) => row.toJSON() as RolePermissionsWithPermissionDetails);
}