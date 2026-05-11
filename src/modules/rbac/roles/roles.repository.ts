import { Role } from "./roles.model";

export async function listRoles(): Promise<Role[]> {
  return Role.findAll({ order: [["id", "ASC"]] });
}

export async function createRole(data: {
  roleName: string;
  roleDescription: string | null;
}): Promise<Role> {
  return Role.create({
    roleName: data.roleName,
    roleDescription: data.roleDescription,
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
  await role.update(data);
  return role;
}

export async function deleteRole(id: number): Promise<boolean> {
  const deleted = await Role.destroy({ where: { id } });
  return deleted > 0;
}
