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
  return withTransaction(
    (opts) =>
      rolesRepository.createRole(
        {
          roleName: data.roleName,
          roleDescription: data.roleDescription ?? null,
        },
        opts,
      ),
    options,
  );
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
  return withTransaction(
    (opts) => rolesRepository.updateRole(id, data, opts),
    options,
  );
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
