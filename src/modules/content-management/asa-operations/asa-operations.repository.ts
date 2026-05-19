import type { DbOptions } from "../../../shared/types/db-options";
import { AsaOperation } from "./asa-operations.model";

export async function listAsaOperations(): Promise<AsaOperation[]> {
  return AsaOperation.findAll({ order: [["id", "ASC"]] });
}

export async function createAsaOperation(
  data: { operationName: string },
  options: DbOptions = {},
): Promise<AsaOperation> {
  return AsaOperation.create({ operation_name: data.operationName }, options);
}

export async function getAsaOperation(
  id: number,
): Promise<AsaOperation | null> {
  return AsaOperation.findByPk(id);
}

export async function updateAsaOperation(
  id: number,
  data: { operationName: string },
  options: DbOptions = {},
): Promise<AsaOperation | null> {
  const row = await AsaOperation.findByPk(id, options);
  if (!row) {
    return null;
  }
  await row.update({ operation_name: data.operationName }, options);
  return row;
}

export async function deleteAsaOperation(
  id: number,
  options: DbOptions = {},
): Promise<boolean> {
  const deleted = await AsaOperation.destroy({ where: { id }, ...options });
  return deleted > 0;
}
