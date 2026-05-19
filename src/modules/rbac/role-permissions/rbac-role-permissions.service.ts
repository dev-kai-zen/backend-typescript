import { withTransaction } from "../../../shared/db/with-transaction";
import type { DbOptions } from "../../../shared/types/db-options";
import * as rolesRepository from "../roles/rbac-roles.repository";
import * as rbacRolePermissionsRepository from "./rbac-role-permissions.repository";
import type { RbacRolePermission } from "./rbac-role-permissions.model";
import type { RolePermissionsWithPermissionDetails } from "./rbac-role-permissions.types";

export async function setRolePermissions(
  roleId: number,
  permissionIds: number[],
  options: DbOptions = {},
): Promise<RbacRolePermission[] | null> {
  return withTransaction(async (opts) => {
    const role = await rolesRepository.getRole(roleId);
    if (!role) {
      return null;
    }
    const uniqueIds = [...new Set(permissionIds)];
    return rbacRolePermissionsRepository.setRolePermissionsForRole(
      roleId,
      uniqueIds,
      opts,
    );
  }, options);
}

export async function listRolePermissions(
  roleId: number,
): Promise<RbacRolePermission[]> {
  return rbacRolePermissionsRepository.listRolePermissions(roleId);
}

export async function createRolePermission(
  data: {
    roleId: number;
    permissionId: number;
  },
  options: DbOptions = {},
): Promise<RbacRolePermission> {
  return withTransaction(
    (opts) =>
      rbacRolePermissionsRepository.createRolePermission(
        {
          roleId: data.roleId,
          permissionId: data.permissionId,
        },
        opts,
      ),
    options,
  );
}

export async function deleteRolePermission(
  roleId: number,
  permissionId: number,
  options: DbOptions = {},
): Promise<boolean> {
  return withTransaction(
    (opts) =>
      rbacRolePermissionsRepository.deleteRolePermission(
        roleId,
        permissionId,
        opts,
      ),
    options,
  );
}

export async function getRolePermissionsByRoleIds(roleIds: number[]): Promise<RolePermissionsWithPermissionDetails[]> {
  return rbacRolePermissionsRepository.getRolePermissionsByRoleIds(roleIds);
}
