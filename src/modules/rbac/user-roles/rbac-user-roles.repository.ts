import { RbacUserRole } from "./rbac-user-roles.model";

export async function listUserRoles(userId: number): Promise<RbacUserRole[]> {
  return RbacUserRole.findAll({
    where: { userId },
    order: [["id", "ASC"]],
  });
}

export async function createUserRole(data: {
  userId: number;
  roleId: number;
  assignedBy: number;
}): Promise<RbacUserRole> {
  return RbacUserRole.create({
    userId: data.userId,
    roleId: data.roleId,
    assignedBy: data.assignedBy,
  });
}

export async function deleteUserRole(
  userId: number,
  roleId: number,
): Promise<boolean> {
  const deleted = await RbacUserRole.destroy({
    where: { userId, roleId },
  });
  return deleted > 0;
}
