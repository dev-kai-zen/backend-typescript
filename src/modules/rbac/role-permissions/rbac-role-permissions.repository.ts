import { RbacRolePermission } from "./rbac-role-permissions.model";

export async function listRolePermissions(
  roleId: number,
): Promise<RbacRolePermission[]> {
  return RbacRolePermission.findAll({
    where: { roleId },
    order: [["id", "ASC"]],
  });
}

export async function createRolePermission(data: {
  roleId: number;
  permissionId: number;
}): Promise<RbacRolePermission> {
  return RbacRolePermission.create({
    roleId: data.roleId,
    permissionId: data.permissionId,
  });
}

export async function deleteRolePermission(
  roleId: number,
  permissionId: number,
): Promise<boolean> {
  const deleted = await RbacRolePermission.destroy({
    where: { roleId, permissionId },
  });
  return deleted > 0;
}
