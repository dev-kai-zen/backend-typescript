import { withTransaction } from "../../../shared/db/with-transaction";
import type { DbOptions } from "../../../shared/types/db-options";
import * as asaDivisionsRepository from "../asa-divisions/asa-divisions.repository";
import type { AsaRegion } from "./asa-regions.model";
import * as asaRegionsRepository from "./asa-regions.repository";

export async function listAsaRegions(): Promise<AsaRegion[]> {
  return asaRegionsRepository.listAsaRegions();
}

export async function createAsaRegion(
  data: { regionName: string; asaDivisionId: number },
  options: DbOptions = {},
): Promise<AsaRegion> {
  return withTransaction(async (opts) => {
    if (!data.regionName || data.regionName.trim() === "") {
      throw new Error("regionName is required");
    }
    if (
      !Number.isFinite(data.asaDivisionId) ||
      data.asaDivisionId < 1 ||
      !Number.isInteger(data.asaDivisionId)
    ) {
      throw new Error("asaDivisionId must be a positive integer");
    }
    const division = await asaDivisionsRepository.getAsaDivision(
      data.asaDivisionId,
    );
    if (!division) {
      throw new Error(
        "asaDivisionId does not reference an existing ASA division",
      );
    }
    return asaRegionsRepository.createAsaRegion(
      {
        regionName: data.regionName.trim(),
        asaDivisionId: data.asaDivisionId,
      },
      opts,
    );
  }, options);
}

export async function getAsaRegion(id: number): Promise<AsaRegion | null> {
  return asaRegionsRepository.getAsaRegion(id);
}

export async function updateAsaRegion(
  id: number,
  data: { regionName: string; asaDivisionId: number },
  options: DbOptions = {},
): Promise<AsaRegion | null> {
  return withTransaction(async (opts) => {
    if (!data.regionName || data.regionName.trim() === "") {
      throw new Error("regionName is required");
    }
    if (
      !Number.isFinite(data.asaDivisionId) ||
      data.asaDivisionId < 1 ||
      !Number.isInteger(data.asaDivisionId)
    ) {
      throw new Error("asaDivisionId must be a positive integer");
    }
    const division = await asaDivisionsRepository.getAsaDivision(
      data.asaDivisionId,
    );
    if (!division) {
      throw new Error(
        "asaDivisionId does not reference an existing ASA division",
      );
    }
    return asaRegionsRepository.updateAsaRegion(
      id,
      {
        regionName: data.regionName.trim(),
        asaDivisionId: data.asaDivisionId,
      },
      opts,
    );
  }, options);
}

export async function deleteAsaRegion(
  id: number,
  options: DbOptions = {},
): Promise<boolean> {
  return withTransaction(
    (opts) => asaRegionsRepository.deleteAsaRegion(id, opts),
    options,
  );
}
