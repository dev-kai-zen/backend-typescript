import * as rbacPermissionsRepository from "./rbac-permissions.repository";
import type { RbacPermission } from "./rbac-permissions.model";

export async function listPermissions(filters: {
  groupId?: number;
}): Promise<RbacPermission[]> {
  return rbacPermissionsRepository.listPermissions(filters);
}

export async function createPermission(data: {
  permissionCode: string;
  permissionDescription?: string | null;
  groupId?: number | null;
}): Promise<RbacPermission> {
  if (!data.permissionCode || data.permissionCode.trim() === "") {
    throw new Error("permissionCode is required");
  }
  return rbacPermissionsRepository.createPermission({
    permissionCode: data.permissionCode.trim(),
    permissionDescription: data.permissionDescription ?? null,
    groupId: data.groupId ?? null,
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
    groupId?: number | null;
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
    groupId?: number | null;
  } = {};
  if (data.permissionCode !== undefined) {
    patch.permissionCode = data.permissionCode.trim();
  }
  if (data.permissionDescription !== undefined) {
    patch.permissionDescription = data.permissionDescription;
  }
  if (data.groupId !== undefined) {
    patch.groupId = data.groupId;
  }
  if (Object.keys(patch).length === 0) {
    throw new Error("No fields to update");
  }
  return rbacPermissionsRepository.updatePermission(id, patch);
}

export async function deletePermission(id: number): Promise<boolean> {
  return rbacPermissionsRepository.deletePermission(id);
}
