import { withTransaction } from "../../../shared/db/with-transaction";
import type { DbOptions } from "../../../shared/types/db-options";
import * as asaOperationsRepository from "./asa-operations.repository";
import type { AsaOperation } from "./asa-operations.model";

export async function listAsaOperations(): Promise<AsaOperation[]> {
  return asaOperationsRepository.listAsaOperations();
}

export async function createAsaOperation(
  data: { operationName: string },
  options: DbOptions = {},
): Promise<AsaOperation> {
  return withTransaction(async (opts) => {
    if (!data.operationName || data.operationName.trim() === "") {
      throw new Error("operationName is required");
    }
    return asaOperationsRepository.createAsaOperation(
      { operationName: data.operationName.trim() },
      opts,
    );
  }, options);
}

export async function getAsaOperation(
  id: number,
): Promise<AsaOperation | null> {
  return asaOperationsRepository.getAsaOperation(id);
}

export async function updateAsaOperation(
  id: number,
  data: { operationName: string },
  options: DbOptions = {},
): Promise<AsaOperation | null> {
  return withTransaction(async (opts) => {
    if (!data.operationName || data.operationName.trim() === "") {
      throw new Error("operationName is required");
    }
    return asaOperationsRepository.updateAsaOperation(
      id,
      { operationName: data.operationName.trim() },
      opts,
    );
  }, options);
}

export async function deleteAsaOperation(
  id: number,
  options: DbOptions = {},
): Promise<boolean> {
  return withTransaction(
    (opts) => asaOperationsRepository.deleteAsaOperation(id, opts),
    options,
  );
}
