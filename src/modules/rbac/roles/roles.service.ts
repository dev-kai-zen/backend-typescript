import * as rolesRepository from "./roles.repository";
import type { Role } from "./roles.model";

export async function listRoles(): Promise<Role[]> {
  return rolesRepository.listRoles();
}

export async function createRole(data: {
  roleName: string;
  roleDescription?: string | null;
}): Promise<Role> {
  if (!data.roleName || data.roleName.trim() === "") {
    throw new Error("roleName is required");
  }
  return rolesRepository.createRole({
    roleName: data.roleName.trim(),
    roleDescription: data.roleDescription ?? null,
  });
}

export async function getRole(id: number): Promise<Role | null> {
  return rolesRepository.getRole(id);
}

export async function updateRole(
  id: number,
  data: {
    roleName?: string;
    roleDescription?: string | null;
  },
): Promise<Role | null> {
  if (
    data.roleName !== undefined &&
    (typeof data.roleName !== "string" || data.roleName.trim() === "")
  ) {
    throw new Error("roleName cannot be empty");
  }
  const patch: {
    roleName?: string;
    roleDescription?: string | null;
  } = {};
  if (data.roleName !== undefined) {
    patch.roleName = data.roleName.trim();
  }
  if (data.roleDescription !== undefined) {
    patch.roleDescription = data.roleDescription;
  }
  if (Object.keys(patch).length === 0) {
    throw new Error("No fields to update");
  }
  return rolesRepository.updateRole(id, patch);
}

export async function deleteRole(id: number): Promise<boolean> {
  return rolesRepository.deleteRole(id);
}
