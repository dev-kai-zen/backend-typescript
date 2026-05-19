import { withTransaction } from "../../../shared/db/with-transaction";
import type { DbOptions } from "../../../shared/types/db-options";
import * as rbacPermissionsRepository from "./rbac-permissions.repository";
import type { RbacPermission } from "./rbac-permissions.model";

export async function listPermissions(filters: {
  categoryId?: number;
}): Promise<RbacPermission[]> {
  return rbacPermissionsRepository.listPermissions(filters);
}

export async function createPermission(
  data: {
    permissionCode: string;
    permissionDescription?: string | null;
    categoryId?: number | null;
  },
  options: DbOptions = {},
): Promise<RbacPermission> {
  return withTransaction(
    (opts) =>
      rbacPermissionsRepository.createPermission(
        {
          permissionCode: data.permissionCode,
          permissionDescription: data.permissionDescription ?? null,
          categoryId: data.categoryId ?? null,
        },
        opts,
      ),
    options,
  );
}

export async function getPermission(
  id: number,
): Promise<RbacPermission | null> {
  return rbacPermissionsRepository.getPermission(id);
}

export async function updatePermission(
  id: number,
  data: {
    permissionCode?: string;
    permissionDescription?: string | null;
    categoryId?: number | null;
    isActive?: boolean;
  },
  options: DbOptions = {},
): Promise<RbacPermission | null> {
  return withTransaction(
    (opts) => rbacPermissionsRepository.updatePermission(id, data, opts),
    options,
  );
}

export async function deletePermission(
  id: number,
  options: DbOptions = {},
): Promise<boolean> {
  return withTransaction(
    (opts) => rbacPermissionsRepository.deletePermission(id, opts),
    options,
  );
}

export async function permissionDefinitionsEligibleForGuard(
  permissionCodes: string[],
): Promise<boolean> {
  return rbacPermissionsRepository.permissionDefinitionsEligibleForGuard(
    permissionCodes,
  );
}
