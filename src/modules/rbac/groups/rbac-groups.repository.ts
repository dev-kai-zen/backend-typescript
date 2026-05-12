import { RbacGroup } from "./rbac-groups.model";

export async function listGroups(): Promise<RbacGroup[]> {
  return RbacGroup.findAll({ order: [["id", "ASC"]] });
}

export async function createGroup(data: {
  groupName: string;
}): Promise<RbacGroup> {
  return RbacGroup.create({ group_name: data.groupName });
}

export async function getGroup(id: number): Promise<RbacGroup | null> {
  return RbacGroup.findByPk(id);
}

export async function updateGroup(
  id: number,
  data: { groupName: string },
): Promise<RbacGroup | null> {
  const group = await RbacGroup.findByPk(id);
  if (!group) {
    return null;
  }
  await group.update({ group_name: data.groupName });
  return group;
}

export async function deleteGroup(id: number): Promise<boolean> {
  const deleted = await RbacGroup.destroy({ where: { id } });
  return deleted > 0;
}
