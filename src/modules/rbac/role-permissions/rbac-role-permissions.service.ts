import * as rolesRepository from "../roles/roles.repository";
import * as rbacRolePermissionsRepository from "./rbac-role-permissions.repository";
import type { RbacRolePermission } from "./rbac-role-permissions.model";

export async function setRolePermissions(
  roleId: number,
  permissionIds: number[],
): Promise<RbacRolePermission[] | null> {
  const role = await rolesRepository.getRole(roleId);
  if (!role) {
    return null;
  }
  const uniqueIds = [...new Set(permissionIds)];
  return rbacRolePermissionsRepository.setRolePermissionsForRole(
    roleId,
    uniqueIds,
  );
}

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
