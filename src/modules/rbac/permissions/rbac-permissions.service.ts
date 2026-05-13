import * as rbacPermissionsRepository from "./rbac-permissions.repository";
import type { RbacPermission } from "./rbac-permissions.model";

export async function listPermissions(filters: {
  categoryId?: number;
}): Promise<RbacPermission[]> {
  return rbacPermissionsRepository.listPermissions(filters);
}

export async function createPermission(data: {
  permissionCode: string;
  permissionDescription?: string | null;
  categoryId?: number | null;
}): Promise<RbacPermission> {
  if (!data.permissionCode || data.permissionCode.trim() === "") {
    throw new Error("permissionCode is required");
  }
  return rbacPermissionsRepository.createPermission({
    permissionCode: data.permissionCode.trim(),
    permissionDescription: data.permissionDescription ?? null,
    categoryId: data.categoryId ?? null,
  });
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
): Promise<RbacPermission | null> {
  if (
    data.permissionCode !== undefined &&
    (typeof data.permissionCode !== "string" ||
      data.permissionCode.trim() === "")
  ) {
    throw new Error("permissionCode cannot be empty");
  }
  const patch: {
    permissionCode?: string;
    permissionDescription?: string | null;
    categoryId?: number | null;
    isActive?: boolean;
  } = {};
  if (data.permissionCode !== undefined) {
    patch.permissionCode = data.permissionCode.trim();
  }
  if (data.permissionDescription !== undefined) {
    patch.permissionDescription = data.permissionDescription;
  }
  if (data.categoryId !== undefined) {
    patch.categoryId = data.categoryId;
  }
  if (data.isActive !== undefined) {
    patch.isActive = data.isActive;
  }
  if (Object.keys(patch).length === 0) {
    throw new Error("No fields to update");
  }
  return rbacPermissionsRepository.updatePermission(id, patch);
}

export async function deletePermission(id: number): Promise<boolean> {
  return rbacPermissionsRepository.deletePermission(id);
}

export async function permissionDefinitionsEligibleForGuard(
  permissionCodes: string[],
): Promise<boolean> {
  return rbacPermissionsRepository.permissionDefinitionsEligibleForGuard(
    permissionCodes,
  );
}
