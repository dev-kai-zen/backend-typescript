import type { DbOptions } from "../../../shared/types/db-options";
import { AsaArea } from "./asa-areas.model";

export async function listAsaAreas(): Promise<AsaArea[]> {
  return AsaArea.findAll({ order: [["id", "ASC"]] });
}

export async function createAsaArea(
  data: { areaName: string; asaRegionId: number },
  options: DbOptions = {},
): Promise<AsaArea> {
  return AsaArea.create(
    {
      area_name: data.areaName,
      asa_region_id: data.asaRegionId,
    },
    options,
  );
}

export async function getAsaArea(id: number): Promise<AsaArea | null> {
  return AsaArea.findByPk(id);
}

export async function updateAsaArea(
  id: number,
  data: { areaName: string; asaRegionId: number },
  options: DbOptions = {},
): Promise<AsaArea | null> {
  const row = await AsaArea.findByPk(id, options);
  if (!row) {
    return null;
  }
  await row.update(
    {
      area_name: data.areaName,
      asa_region_id: data.asaRegionId,
    },
    options,
  );
  return row;
}

export async function deleteAsaArea(
  id: number,
  options: DbOptions = {},
): Promise<boolean> {
  const deleted = await AsaArea.destroy({ where: { id }, ...options });
  return deleted > 0;
}
