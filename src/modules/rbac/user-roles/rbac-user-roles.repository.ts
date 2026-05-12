import { RbacUserRole } from "./rbac-user-roles.model";

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
