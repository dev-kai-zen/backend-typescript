import { Role } from "./rbac-roles.model";

export async function listRoles(): Promise<Role[]> {
  return Role.findAll({ order: [["id", "ASC"]] });
}

export async function createRole(data: {
  roleName: string;
  roleDescription: string | null;
}): Promise<Role> {
  return Role.create({
    role_name: data.roleName,
    role_description: data.roleDescription,
  });
}

export async function getRole(id: number): Promise<Role | null> {
  return Role.findByPk(id);
}

export async function updateRole(
  id: number,
  data: {
    roleName?: string;
    roleDescription?: string | null;
  },
): Promise<Role | null> {
  const role = await Role.findByPk(id);
  if (!role) {
    return null;
  }
  const patch: Partial<{
    role_name: string;
    role_description: string | null;
  }> = {};
  if (data.roleName !== undefined) {
    patch.role_name = data.roleName;
  }
  if (data.roleDescription !== undefined) {
    patch.role_description = data.roleDescription;
  }
  await role.update(patch);
  return role;
}

export async function deleteRole(id: number): Promise<boolean> {
  const deleted = await Role.destroy({ where: { id } });
  return deleted > 0;
}
