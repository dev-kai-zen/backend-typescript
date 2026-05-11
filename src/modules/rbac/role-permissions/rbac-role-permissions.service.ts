import * as rbacRolePermissionsRepository from "./rbac-role-permissions.repository";
import type { RbacRolePermission } from "./rbac-role-permissions.model";

export async function listRolePermissions(
  roleId: number,
): Promise<RbacRolePermission[]> {
  return rbacRolePermissionsRepository.listRolePermissions(roleId);
}

export async function createRolePermission(data: {
  roleId: number;
  permissionId: number;
}): Promise<RbacRolePermission> {
  return rbacRolePermissionsRepository.createRolePermission({
    roleId: data.roleId,
    permissionId: data.permissionId,
  });
}

export async function deleteRolePermission(
  roleId: number,
  permissionId: number,
): Promise<boolean> {
  return rbacRolePermissionsRepository.deleteRolePermission(
    roleId,
    permissionId,
  );
}
