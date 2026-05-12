import { AsaOperation } from "./asa-operations.model";

export async function listAsaOperations(): Promise<AsaOperation[]> {
  return AsaOperation.findAll({ order: [["id", "ASC"]] });
}

export async function createAsaOperation(data: {
  operationName: string;
}): Promise<AsaOperation> {
  return AsaOperation.create({ operationName: data.operationName });
}

export async function getAsaOperation(
  id: number,
): Promise<AsaOperation | null> {
  return AsaOperation.findByPk(id);
}

export async function updateAsaOperation(
  id: number,
  data: { operationName: string },
): Promise<AsaOperation | null> {
  const row = await AsaOperation.findByPk(id);
  if (!row) {
    return null;
  }
  await row.update({ operationName: data.operationName });
  return row;
}

export async function deleteAsaOperation(id: number): Promise<boolean> {
  const deleted = await AsaOperation.destroy({ where: { id } });
  return deleted > 0;
}
