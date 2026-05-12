import { sequelize } from "../../../config/sequelize-config";
import { User } from "../../users/users.model";
import { RbacUserRole } from "./rbac-user-roles.model";

/** Hard-delete existing links for the user, then insert the new set (unique + paranoid; same idea as role-permissions). */
export async function setUserRolesForUser(
  userId: number,
  roleIds: number[],
  assignedBy: number,
): Promise<RbacUserRole[] | null> {
  const user = await User.findByPk(userId);
  if (!user) {
    return null;
  }
  const uniqueRoleIds = [...new Set(roleIds)];
  return sequelize.transaction(async (transaction) => {
    await RbacUserRole.destroy({
      where: { user_id: userId },
      force: true,
      transaction,
    });
    if (uniqueRoleIds.length === 0) {
      return [];
    }
    return RbacUserRole.bulkCreate(
      uniqueRoleIds.map((role_id) => ({
        user_id: userId,
        role_id,
        assigned_by: assignedBy,
      })),
      { transaction, validate: true },
    );
  });
}

export async function listUserRoles(userId: number): Promise<RbacUserRole[]> {
  return RbacUserRole.findAll({
    where: { user_id: userId },
    order: [["id", "ASC"]],
  });
}

export async function createUserRole(data: {
  userId: number;
  roleId: number;
  assignedBy: number;
}): Promise<RbacUserRole> {
  return RbacUserRole.create({
    user_id: data.userId,
    role_id: data.roleId,
    assigned_by: data.assignedBy,
  });
}

export async function deleteUserRole(
  userId: number,
  roleId: number,
): Promise<boolean> {
  const deleted = await RbacUserRole.destroy({
    where: { user_id: userId, role_id: roleId },
  });
  return deleted > 0;
}
