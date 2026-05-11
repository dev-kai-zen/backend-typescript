import * as rbacGroupsRepository from "./rbac-groups.repository";
import type { RbacGroup } from "./rbac-groups.model";

export async function listGroups(): Promise<RbacGroup[]> {
  return rbacGroupsRepository.listGroups();
}

export async function createGroup(data: {
  groupName: string;
}): Promise<RbacGroup> {
  if (!data.groupName || data.groupName.trim() === "") {
    throw new Error("groupName is required");
  }
  return rbacGroupsRepository.createGroup({
    groupName: data.groupName.trim(),
  });
}

export async function getGroup(id: number): Promise<RbacGroup | null> {
  return rbacGroupsRepository.getGroup(id);
}

export async function updateGroup(
  id: number,
  data: { groupName: string },
): Promise<RbacGroup | null> {
  if (!data.groupName || data.groupName.trim() === "") {
    throw new Error("groupName is required");
  }
  return rbacGroupsRepository.updateGroup(id, {
    groupName: data.groupName.trim(),
  });
}

export async function deleteGroup(id: number): Promise<boolean> {
  return rbacGroupsRepository.deleteGroup(id);
}
