import { withTransaction } from "../../../shared/db/with-transaction";
import type { DbOptions } from "../../../shared/types/db-options";
import * as rolesRepository from "./rbac-roles.repository";
import type { Role } from "./rbac-roles.model";

export async function listRoles(): Promise<Role[]> {
  return rolesRepository.listRoles();
}

export async function createRole(
  data: {
    roleName: string;
    roleDescription?: string | null;
  },
  options: DbOptions = {},
): Promise<Role> {
  return withTransaction(async (opts) => {
    if (!data.roleName || data.roleName.trim() === "") {
      throw new Error("roleName is required");
    }
    return rolesRepository.createRole(
      {
        roleName: data.roleName.trim(),
        roleDescription: data.roleDescription ?? null,
      },
      opts,
    );
  }, options);
}

export async function getRole(id: number): Promise<Role | null> {
  return rolesRepository.getRole(id);
}

export async function updateRole(
  id: number,
  data: {
    roleName?: string;
    roleDescription?: string | null;
    isActive?: boolean;
  },
  options: DbOptions = {},
): Promise<Role | null> {
  return withTransaction(async (opts) => {
    if (
      data.roleName !== undefined &&
      (typeof data.roleName !== "string" || data.roleName.trim() === "")
    ) {
      throw new Error("roleName cannot be empty");
    }
    const patch: {
      roleName?: string;
      roleDescription?: string | null;
      isActive?: boolean;
    } = {};
    if (data.roleName !== undefined) {
      patch.roleName = data.roleName.trim();
    }
    if (data.roleDescription !== undefined) {
      patch.roleDescription = data.roleDescription;
    }
    if (data.isActive !== undefined) {
      patch.isActive = data.isActive;
    }
    if (Object.keys(patch).length === 0) {
      throw new Error("No fields to update");
    }
    return rolesRepository.updateRole(id, patch, opts);
  }, options);
}

export async function deleteRole(
  id: number,
  options: DbOptions = {},
): Promise<boolean> {
  return withTransaction(
    (opts) => rolesRepository.deleteRole(id, opts),
    options,
  );
}

export async function roleDefinitionsEligibleForGuard(
  roleNames: string[],
): Promise<boolean> {
  return rolesRepository.roleDefinitionsEligibleForGuard(roleNames);
}
