import { withTransaction } from "../../../shared/db/with-transaction";
import type { DbOptions } from "../../../shared/types/db-options";
import * as asaAreasRepository from "../asa-areas/asa-areas.repository";
import * as asaBranchTypeRepository from "../asa-branch-type/asa-branch-type.repository";
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
    if (!data.branchCode || data.branchCode.trim() === "") {
      throw new Error("branchCode is required");
    }
    if (!data.branchName || data.branchName.trim() === "") {
      throw new Error("branchName is required");
    }
    if (
      !Number.isFinite(data.asaAreaId) ||
      data.asaAreaId < 1 ||
      !Number.isInteger(data.asaAreaId)
    ) {
      throw new Error("asaAreaId must be a positive integer");
    }
    if (
      !Number.isFinite(data.asaBranchTypeId) ||
      data.asaBranchTypeId < 1 ||
      !Number.isInteger(data.asaBranchTypeId)
    ) {
      throw new Error("asaBranchTypeId must be a positive integer");
    }
    const area = await asaAreasRepository.getAsaArea(data.asaAreaId);
    if (!area) {
      throw new Error("asaAreaId does not reference an existing ASA area");
    }
    const branchType = await asaBranchTypeRepository.getAsaBranchType(
      data.asaBranchTypeId,
    );
    if (!branchType) {
      throw new Error(
        "asaBranchTypeId does not reference an existing ASA branch type",
      );
    }
    return asaBranchesRepository.createAsaBranch(
      {
        branchCode: data.branchCode.trim(),
        branchName: data.branchName.trim(),
        asaAreaId: data.asaAreaId,
        asaBranchTypeId: data.asaBranchTypeId,
      },
      opts,
    );
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
    if (!data.branchCode || data.branchCode.trim() === "") {
      throw new Error("branchCode is required");
    }
    if (!data.branchName || data.branchName.trim() === "") {
      throw new Error("branchName is required");
    }
    if (
      !Number.isFinite(data.asaAreaId) ||
      data.asaAreaId < 1 ||
      !Number.isInteger(data.asaAreaId)
    ) {
      throw new Error("asaAreaId must be a positive integer");
    }
    if (
      !Number.isFinite(data.asaBranchTypeId) ||
      data.asaBranchTypeId < 1 ||
      !Number.isInteger(data.asaBranchTypeId)
    ) {
      throw new Error("asaBranchTypeId must be a positive integer");
    }
    const area = await asaAreasRepository.getAsaArea(data.asaAreaId);
    if (!area) {
      throw new Error("asaAreaId does not reference an existing ASA area");
    }
    const branchType = await asaBranchTypeRepository.getAsaBranchType(
      data.asaBranchTypeId,
    );
    if (!branchType) {
      throw new Error(
        "asaBranchTypeId does not reference an existing ASA branch type",
      );
    }
    return asaBranchesRepository.updateAsaBranch(
      id,
      {
        branchCode: data.branchCode.trim(),
        branchName: data.branchName.trim(),
        asaAreaId: data.asaAreaId,
        asaBranchTypeId: data.asaBranchTypeId,
      },
      opts,
    );
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
