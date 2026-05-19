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
  return withTransaction(
    (opts) => asaOperationsRepository.createAsaOperation(data, opts),
    options,
  );
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
  return withTransaction(
    (opts) => asaOperationsRepository.updateAsaOperation(id, data, opts),
    options,
  );
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
