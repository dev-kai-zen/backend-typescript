import type { DbOptions } from "../../../shared/types/db-options";
import { AsaBranchType } from "./asa-branch-type.model";

export async function listAsaBranchTypes(): Promise<AsaBranchType[]> {
  return AsaBranchType.findAll({ order: [["id", "ASC"]] });
}

export async function createAsaBranchType(
  data: { typeName: string },
  options: DbOptions = {},
): Promise<AsaBranchType> {
  return AsaBranchType.create({ type_name: data.typeName }, options);
}

export async function getAsaBranchType(
  id: number,
): Promise<AsaBranchType | null> {
  return AsaBranchType.findByPk(id);
}

export async function updateAsaBranchType(
  id: number,
  data: { typeName: string },
  options: DbOptions = {},
): Promise<AsaBranchType | null> {
  const row = await AsaBranchType.findByPk(id, options);
  if (!row) {
    return null;
  }
  await row.update({ type_name: data.typeName }, options);
  return row;
}

export async function deleteAsaBranchType(
  id: number,
  options: DbOptions = {},
): Promise<boolean> {
  const deleted = await AsaBranchType.destroy({ where: { id }, ...options });
  return deleted > 0;
}
