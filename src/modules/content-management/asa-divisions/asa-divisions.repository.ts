import type { DbOptions } from "../../../shared/types/db-options";
import { AsaDivision } from "./asa-divisions.model";

export async function listAsaDivisions(): Promise<AsaDivision[]> {
  return AsaDivision.findAll({ order: [["id", "ASC"]] });
}

export async function createAsaDivision(
  data: { divisionName: string; asaOperationId: number },
  options: DbOptions = {},
): Promise<AsaDivision> {
  return AsaDivision.create(
    {
      division_name: data.divisionName,
      asa_operation_id: data.asaOperationId,
    },
    options,
  );
}

export async function getAsaDivision(id: number): Promise<AsaDivision | null> {
  return AsaDivision.findByPk(id);
}

export async function updateAsaDivision(
  id: number,
  data: { divisionName: string; asaOperationId: number },
  options: DbOptions = {},
): Promise<AsaDivision | null> {
  const row = await AsaDivision.findByPk(id, options);
  if (!row) {
    return null;
  }
  await row.update(
    {
      division_name: data.divisionName,
      asa_operation_id: data.asaOperationId,
    },
    options,
  );
  return row;
}

export async function deleteAsaDivision(
  id: number,
  options: DbOptions = {},
): Promise<boolean> {
  const deleted = await AsaDivision.destroy({ where: { id }, ...options });
  return deleted > 0;
}
