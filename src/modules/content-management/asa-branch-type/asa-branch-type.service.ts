import { withTransaction } from "../../../shared/db/with-transaction";
import type { DbOptions } from "../../../shared/types/db-options";
import type { AsaBranchType } from "./asa-branch-type.model";
import * as asaBranchTypeRepository from "./asa-branch-type.repository";

export async function listAsaBranchTypes(): Promise<AsaBranchType[]> {
  return asaBranchTypeRepository.listAsaBranchTypes();
}

export async function createAsaBranchType(
  data: { typeName: string },
  options: DbOptions = {},
): Promise<AsaBranchType> {
  return withTransaction(async (opts) => {
    if (!data.typeName || data.typeName.trim() === "") {
      throw new Error("typeName is required");
    }
    return asaBranchTypeRepository.createAsaBranchType(
      { typeName: data.typeName.trim() },
      opts,
    );
  }, options);
}

export async function getAsaBranchType(
  id: number,
): Promise<AsaBranchType | null> {
  return asaBranchTypeRepository.getAsaBranchType(id);
}

export async function updateAsaBranchType(
  id: number,
  data: { typeName: string },
  options: DbOptions = {},
): Promise<AsaBranchType | null> {
  return withTransaction(async (opts) => {
    if (!data.typeName || data.typeName.trim() === "") {
      throw new Error("typeName is required");
    }
    return asaBranchTypeRepository.updateAsaBranchType(
      id,
      { typeName: data.typeName.trim() },
      opts,
    );
  }, options);
}

export async function deleteAsaBranchType(
  id: number,
  options: DbOptions = {},
): Promise<boolean> {
  return withTransaction(
    (opts) => asaBranchTypeRepository.deleteAsaBranchType(id, opts),
    options,
  );
}
