import type { DbOptions } from "../../../shared/types/db-options";
import { AsaRegion } from "./asa-regions.model";

export async function listAsaRegions(): Promise<AsaRegion[]> {
  return AsaRegion.findAll({ order: [["id", "ASC"]] });
}

export async function createAsaRegion(
  data: { regionName: string; asaDivisionId: number },
  options: DbOptions = {},
): Promise<AsaRegion> {
  return AsaRegion.create(
    {
      region_name: data.regionName,
      asa_division_id: data.asaDivisionId,
    },
    options,
  );
}

export async function getAsaRegion(id: number): Promise<AsaRegion | null> {
  return AsaRegion.findByPk(id);
}

export async function updateAsaRegion(
  id: number,
  data: { regionName: string; asaDivisionId: number },
  options: DbOptions = {},
): Promise<AsaRegion | null> {
  const row = await AsaRegion.findByPk(id, options);
  if (!row) {
    return null;
  }
  await row.update(
    {
      region_name: data.regionName,
      asa_division_id: data.asaDivisionId,
    },
    options,
  );
  return row;
}

export async function deleteAsaRegion(
  id: number,
  options: DbOptions = {},
): Promise<boolean> {
  const deleted = await AsaRegion.destroy({ where: { id }, ...options });
  return deleted > 0;
}
