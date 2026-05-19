import { withTransaction } from "../../../shared/db/with-transaction";
import type { DbOptions } from "../../../shared/types/db-options";
import * as asaAreasService from "../asa-areas/asa-areas.service";
import * as asaBranchTypeService from "../asa-branch-type/asa-branch-type.service";
import type { AsaBranch } from "./asa-branches.model";
import * as asaBranchesRepository from "./asa-branches.repository";

export async function listAsaBranches(): Promise<AsaBranch[]> {
  return asaBranchesRepository.listAsaBranches();
}

export async function createAsaBranch(
  data: {
    branchCode: string;
    branchName: string;
    asaAreaId: number;
    asaBranchTypeId: number;
  },
  options: DbOptions = {},
): Promise<AsaBranch> {
  return withTransaction(async (opts) => {
    const area = await asaAreasService.getAsaArea(data.asaAreaId);
    if (!area) {
      throw new Error("asaAreaId does not reference an existing ASA area");
    }
    const branchType = await asaBranchTypeService.getAsaBranchType(
      data.asaBranchTypeId,
    );
    if (!branchType) {
      throw new Error(
        "asaBranchTypeId does not reference an existing ASA branch type",
      );
    }
    return asaBranchesRepository.createAsaBranch(data, opts);
  }, options);
}

export async function getAsaBranch(id: number): Promise<AsaBranch | null> {
  return asaBranchesRepository.getAsaBranch(id);
}

export async function updateAsaBranch(
  id: number,
  data: {
    branchCode: string;
    branchName: string;
    asaAreaId: number;
    asaBranchTypeId: number;
  },
  options: DbOptions = {},
): Promise<AsaBranch | null> {
  return withTransaction(async (opts) => {
    const area = await asaAreasService.getAsaArea(data.asaAreaId);
    if (!area) {
      throw new Error("asaAreaId does not reference an existing ASA area");
    }
    const branchType = await asaBranchTypeService.getAsaBranchType(
      data.asaBranchTypeId,
    );
    if (!branchType) {
      throw new Error(
        "asaBranchTypeId does not reference an existing ASA branch type",
      );
    }
    return asaBranchesRepository.updateAsaBranch(id, data, opts);
  }, options);
}

export async function deleteAsaBranch(
  id: number,
  options: DbOptions = {},
): Promise<boolean> {
  return withTransaction(
    (opts) => asaBranchesRepository.deleteAsaBranch(id, opts),
    options,
  );
}
