import { AsaBranchType } from "./asa-branch-type.model";

export async function listAsaBranchTypes(): Promise<AsaBranchType[]> {
  return AsaBranchType.findAll({ order: [["id", "ASC"]] });
}

export async function createAsaBranchType(data: {
  typeName: string;
}): Promise<AsaBranchType> {
  return AsaBranchType.create({ type_name: data.typeName });
}

export async function getAsaBranchType(
  id: number,
): Promise<AsaBranchType | null> {
  return AsaBranchType.findByPk(id);
}

export async function updateAsaBranchType(
  id: number,
  data: { typeName: string },
): Promise<AsaBranchType | null> {
  const row = await AsaBranchType.findByPk(id);
  if (!row) {
    return null;
  }
  await row.update({ type_name: data.typeName });
  return row;
}

export async function deleteAsaBranchType(id: number): Promise<boolean> {
  const deleted = await AsaBranchType.destroy({ where: { id } });
  return deleted > 0;
}
