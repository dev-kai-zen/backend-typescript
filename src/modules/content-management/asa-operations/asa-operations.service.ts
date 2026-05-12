import * as asaOperationsRepository from "./asa-operations.repository";
import type { AsaOperation } from "./asa-operations.model";

export async function listAsaOperations(): Promise<AsaOperation[]> {
  return asaOperationsRepository.listAsaOperations();
}

export async function createAsaOperation(data: {
  operationName: string;
}): Promise<AsaOperation> {
  if (!data.operationName || data.operationName.trim() === "") {
    throw new Error("operationName is required");
  }
  return asaOperationsRepository.createAsaOperation({
    operationName: data.operationName.trim(),
  });
}

export async function getAsaOperation(id: number): Promise<AsaOperation | null> {
  return asaOperationsRepository.getAsaOperation(id);
}

export async function updateAsaOperation(
  id: number,
  data: { operationName: string },
): Promise<AsaOperation | null> {
  if (!data.operationName || data.operationName.trim() === "") {
    throw new Error("operationName is required");
  }
  return asaOperationsRepository.updateAsaOperation(id, {
    operationName: data.operationName.trim(),
  });
}

export async function deleteAsaOperation(id: number): Promise<boolean> {
  return asaOperationsRepository.deleteAsaOperation(id);
}
