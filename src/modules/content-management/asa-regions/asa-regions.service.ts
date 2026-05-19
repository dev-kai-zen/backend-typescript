import { withTransaction } from "../../../shared/db/with-transaction";
import type { DbOptions } from "../../../shared/types/db-options";
import * as asaDivisionsService from "../asa-divisions/asa-divisions.service";
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
    const division = await asaDivisionsService.getAsaDivision(
      data.asaDivisionId,
    );
    if (!division) {
      throw new Error(
        "asaDivisionId does not reference an existing ASA division",
      );
    }
    return asaRegionsRepository.createAsaRegion(data, opts);
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
    const division = await asaDivisionsService.getAsaDivision(
      data.asaDivisionId,
    );
    if (!division) {
      throw new Error(
        "asaDivisionId does not reference an existing ASA division",
      );
    }
    return asaRegionsRepository.updateAsaRegion(id, data, opts);
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
