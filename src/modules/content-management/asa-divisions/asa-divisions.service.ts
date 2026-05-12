import * as asaOperationsRepository from "../asa-operations/asa-operations.repository";
import type { AsaDivision } from "./asa-divisions.model";
import * as asaDivisionsRepository from "./asa-divisions.repository";

export async function listAsaDivisions(): Promise<AsaDivision[]> {
  return asaDivisionsRepository.listAsaDivisions();
}

export async function createAsaDivision(data: {
  divisionName: string;
  asaOperationId: number;
}): Promise<AsaDivision> {
  if (!data.divisionName || data.divisionName.trim() === "") {
    throw new Error("divisionName is required");
  }
  if (
    !Number.isFinite(data.asaOperationId) ||
    data.asaOperationId < 1 ||
    !Number.isInteger(data.asaOperationId)
  ) {
    throw new Error("asaOperationId must be a positive integer");
  }
  const operation = await asaOperationsRepository.getAsaOperation(
    data.asaOperationId,
  );
  if (!operation) {
    throw new Error("asaOperationId does not reference an existing ASA operation");
  }
  return asaDivisionsRepository.createAsaDivision({
    divisionName: data.divisionName.trim(),
    asaOperationId: data.asaOperationId,
  });
}

export async function getAsaDivision(id: number): Promise<AsaDivision | null> {
  return asaDivisionsRepository.getAsaDivision(id);
}

export async function updateAsaDivision(
  id: number,
  data: { divisionName: string; asaOperationId: number },
): Promise<AsaDivision | null> {
  if (!data.divisionName || data.divisionName.trim() === "") {
    throw new Error("divisionName is required");
  }
  if (
    !Number.isFinite(data.asaOperationId) ||
    data.asaOperationId < 1 ||
    !Number.isInteger(data.asaOperationId)
  ) {
    throw new Error("asaOperationId must be a positive integer");
  }
  const operation = await asaOperationsRepository.getAsaOperation(
    data.asaOperationId,
  );
  if (!operation) {
    throw new Error("asaOperationId does not reference an existing ASA operation");
  }
  return asaDivisionsRepository.updateAsaDivision(id, {
    divisionName: data.divisionName.trim(),
    asaOperationId: data.asaOperationId,
  });
}

export async function deleteAsaDivision(id: number): Promise<boolean> {
  return asaDivisionsRepository.deleteAsaDivision(id);
}
