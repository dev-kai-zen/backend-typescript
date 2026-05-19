import { withTransaction } from "../../../shared/db/with-transaction";
import type { DbOptions } from "../../../shared/types/db-options";
import * as asaRegionsService from "../asa-regions/asa-regions.service";
import type { AsaArea } from "./asa-areas.model";
import * as asaAreasRepository from "./asa-areas.repository";

export async function listAsaAreas(): Promise<AsaArea[]> {
  return asaAreasRepository.listAsaAreas();
}

export async function createAsaArea(
  data: { areaName: string; asaRegionId: number },
  options: DbOptions = {},
): Promise<AsaArea> {
  return withTransaction(async (opts) => {
    const region = await asaRegionsService.getAsaRegion(data.asaRegionId);
    if (!region) {
      throw new Error("asaRegionId does not reference an existing ASA region");
    }
    return asaAreasRepository.createAsaArea(data, opts);
  }, options);
}

export async function getAsaArea(id: number): Promise<AsaArea | null> {
  return asaAreasRepository.getAsaArea(id);
}

export async function updateAsaArea(
  id: number,
  data: { areaName: string; asaRegionId: number },
  options: DbOptions = {},
): Promise<AsaArea | null> {
  return withTransaction(async (opts) => {
    const region = await asaRegionsService.getAsaRegion(data.asaRegionId);
    if (!region) {
      throw new Error("asaRegionId does not reference an existing ASA region");
    }
    return asaAreasRepository.updateAsaArea(id, data, opts);
  }, options);
}

export async function deleteAsaArea(
  id: number,
  options: DbOptions = {},
): Promise<boolean> {
  return withTransaction(
    (opts) => asaAreasRepository.deleteAsaArea(id, opts),
    options,
  );
}
