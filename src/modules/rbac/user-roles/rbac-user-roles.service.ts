import { withTransaction } from "../../../shared/db/with-transaction";
import type { DbOptions } from "../../../shared/types/db-options";
import * as usersService from "../../users/users.service";
import * as rbacUserRolesRepository from "./rbac-user-roles.repository";
import type { RbacUserRole } from "./rbac-user-roles.model";
import type { UserRolesWithRoleDetails } from "./rbac-user-roles.types";

export async function listUserRoles(userId: number): Promise<RbacUserRole[]> {
  return rbacUserRolesRepository.listUserRoles(userId);
}

export async function setUserRoles(
  userId: number,
  roleIds: number[],
  assignedBy: number,
  options: DbOptions = {},
): Promise<RbacUserRole[] | null> {
  return withTransaction(async (opts) => {
    const user = await usersService.getUser(userId);
    if (!user) {
      return null;
    }
    const uniqueRoleIds = [...new Set(roleIds)];
    return rbacUserRolesRepository.setUserRolesForUser(
      userId,
      uniqueRoleIds,
      assignedBy,
      opts,
    );
  }, options);
}

export async function createUserRole(
  data: {
    userId: number;
    roleId: number;
    assignedBy: number;
  },
  options: DbOptions = {},
): Promise<RbacUserRole> {
  return withTransaction(
    (opts) =>
      rbacUserRolesRepository.createUserRole(
        {
          userId: data.userId,
          roleId: data.roleId,
          assignedBy: data.assignedBy,
        },
        opts,
      ),
    options,
  );
}

export async function deleteUserRole(
  userId: number,
  roleId: number,
  options: DbOptions = {},
): Promise<boolean> {
  return withTransaction(
    (opts) => rbacUserRolesRepository.deleteUserRole(userId, roleId, opts),
    options,
  );
}


export async function getUserRolesWithDescriptions(
  userId: number,
): Promise<UserRolesWithRoleDetails[]> {
  return rbacUserRolesRepository.getUserRolesWithDescriptions(userId);
}