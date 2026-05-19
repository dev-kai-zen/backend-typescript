import type { DbOptions } from "../../../shared/types/db-options";
import { RbacRole } from "../roles/rbac-roles.model";
import { RbacUserRole } from "./rbac-user-roles.model";
import type { UserRolesWithRoleDetails } from "./rbac-user-roles.types";

/** Hard-delete existing links for the user, then insert the new set (unique + paranoid; same idea as role-permissions). */
export async function setUserRolesForUser(
  userId: number,
  roleIds: number[],
  assignedBy: number,
  options: DbOptions = {},
): Promise<RbacUserRole[]> {
  await RbacUserRole.destroy({
    where: { user_id: userId },
    force: true,
    ...options,
  });
  if (roleIds.length === 0) {
    return [];
  }
  return RbacUserRole.bulkCreate(
    roleIds.map((role_id) => ({
      user_id: userId,
      role_id,
      assigned_by: assignedBy,
    })),
    { ...options, validate: true },
  );
}

export async function listUserRoles(userId: number): Promise<RbacUserRole[]> {
  return RbacUserRole.findAll({
    where: { user_id: userId },
    order: [["id", "ASC"]],
  });
}

export async function createUserRole(
  data: {
    userId: number;
    roleId: number;
    assignedBy: number;
  },
  options: DbOptions = {},
): Promise<RbacUserRole> {
  return RbacUserRole.create(
    {
      user_id: data.userId,
      role_id: data.roleId,
      assigned_by: data.assignedBy,
    },
    options,
  );
}

export async function deleteUserRole(
  userId: number,
  roleId: number,
  options: DbOptions = {},
): Promise<boolean> {
  const deleted = await RbacUserRole.destroy({
    where: { user_id: userId, role_id: roleId },
    ...options,
  });
  return deleted > 0;
}

/** User-role links with nested `role` as plain JSON (matches `Model#toJSON()`). */
export async function getUserRolesWithDescriptions(
  userId: number,
): Promise<UserRolesWithRoleDetails[]> {
  const rows = await RbacUserRole.findAll({
    where: { user_id: userId },
    order: [["id", "ASC"]],
    include: [
      {
        model: RbacRole,
        as: "role",
        attributes: ["role_name", "role_description"],
        where: { is_active: true },
        required: true,
      },
    ],
  });

  return rows.map((row) => row.toJSON() as UserRolesWithRoleDetails);
}
