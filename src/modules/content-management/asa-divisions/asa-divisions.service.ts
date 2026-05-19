import { withTransaction } from "../../../shared/db/with-transaction";
import type { DbOptions } from "../../../shared/types/db-options";
import * as asaOperationsService from "../asa-operations/asa-operations.service";
import type { AsaDivision } from "./asa-divisions.model";
import * as asaDivisionsRepository from "./asa-divisions.repository";

export async function listAsaDivisions(): Promise<AsaDivision[]> {
  return asaDivisionsRepository.listAsaDivisions();
}

export async function createAsaDivision(
  data: { divisionName: string; asaOperationId: number },
  options: DbOptions = {},
): Promise<AsaDivision> {
  return withTransaction(async (opts) => {
    const operation = await asaOperationsService.getAsaOperation(
      data.asaOperationId,
    );
    if (!operation) {
      throw new Error(
        "asaOperationId does not reference an existing ASA operation",
      );
    }
    return asaDivisionsRepository.createAsaDivision(data, opts);
  }, options);
}

export async function getAsaDivision(id: number): Promise<AsaDivision | null> {
  return asaDivisionsRepository.getAsaDivision(id);
}

export async function updateAsaDivision(
  id: number,
  data: { divisionName: string; asaOperationId: number },
  options: DbOptions = {},
): Promise<AsaDivision | null> {
  return withTransaction(async (opts) => {
    const operation = await asaOperationsService.getAsaOperation(
      data.asaOperationId,
    );
    if (!operation) {
      throw new Error(
        "asaOperationId does not reference an existing ASA operation",
      );
    }
    return asaDivisionsRepository.updateAsaDivision(id, data, opts);
  }, options);
}

export async function deleteAsaDivision(
  id: number,
  options: DbOptions = {},
): Promise<boolean> {
  return withTransaction(
    (opts) => asaDivisionsRepository.deleteAsaDivision(id, opts),
    options,
  );
}
