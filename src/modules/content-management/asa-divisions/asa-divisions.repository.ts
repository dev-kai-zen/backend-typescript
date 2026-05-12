import { AsaDivision } from "./asa-divisions.model";

export async function listAsaDivisions(): Promise<AsaDivision[]> {
  return AsaDivision.findAll({ order: [["id", "ASC"]] });
}

export async function createAsaDivision(data: {
  divisionName: string;
  asaOperationId: number;
}): Promise<AsaDivision> {
  return AsaDivision.create({
    divisionName: data.divisionName,
    asaOperationId: data.asaOperationId,
  });
}

export async function getAsaDivision(id: number): Promise<AsaDivision | null> {
  return AsaDivision.findByPk(id);
}

export async function updateAsaDivision(
  id: number,
  data: { divisionName: string; asaOperationId: number },
): Promise<AsaDivision | null> {
  const row = await AsaDivision.findByPk(id);
  if (!row) {
    return null;
  }
  await row.update({
    divisionName: data.divisionName,
    asaOperationId: data.asaOperationId,
  });
  return row;
}

export async function deleteAsaDivision(id: number): Promise<boolean> {
  const deleted = await AsaDivision.destroy({ where: { id } });
  return deleted > 0;
}
