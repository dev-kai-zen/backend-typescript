import * as rbacUserRolesRepository from "./rbac-user-roles.repository";
import type { RbacUserRole } from "./rbac-user-roles.model";

export async function listUserRoles(userId: number): Promise<RbacUserRole[]> {
  return rbacUserRolesRepository.listUserRoles(userId);
}

export async function createUserRole(data: {
  userId: number;
  roleId: number;
  assignedBy: number;
}): Promise<RbacUserRole> {
  return rbacUserRolesRepository.createUserRole({
    userId: data.userId,
    roleId: data.roleId,
    assignedBy: data.assignedBy,
  });
}

export async function deleteUserRole(
  userId: number,
  roleId: number,
): Promise<boolean> {
  return rbacUserRolesRepository.deleteUserRole(userId, roleId);
}
