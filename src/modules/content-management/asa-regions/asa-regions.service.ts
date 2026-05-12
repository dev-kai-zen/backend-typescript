import * as asaDivisionsRepository from "../asa-divisions/asa-divisions.repository";
import type { AsaRegion } from "./asa-regions.model";
import * as asaRegionsRepository from "./asa-regions.repository";

export async function listAsaRegions(): Promise<AsaRegion[]> {
  return asaRegionsRepository.listAsaRegions();
}

export async function createAsaRegion(data: {
  regionName: string;
  asaDivisionId: number;
}): Promise<AsaRegion> {
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
  const division = await asaDivisionsRepository.getAsaDivision(data.asaDivisionId);
  if (!division) {
    throw new Error("asaDivisionId does not reference an existing ASA division");
  }
  return asaRegionsRepository.createAsaRegion({
    regionName: data.regionName.trim(),
    asaDivisionId: data.asaDivisionId,
  });
}

export async function getAsaRegion(id: number): Promise<AsaRegion | null> {
  return asaRegionsRepository.getAsaRegion(id);
}

export async function updateAsaRegion(
  id: number,
  data: { regionName: string; asaDivisionId: number },
): Promise<AsaRegion | null> {
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
  const division = await asaDivisionsRepository.getAsaDivision(data.asaDivisionId);
  if (!division) {
    throw new Error("asaDivisionId does not reference an existing ASA division");
  }
  return asaRegionsRepository.updateAsaRegion(id, {
    regionName: data.regionName.trim(),
    asaDivisionId: data.asaDivisionId,
  });
}

export async function deleteAsaRegion(id: number): Promise<boolean> {
  return asaRegionsRepository.deleteAsaRegion(id);
}
