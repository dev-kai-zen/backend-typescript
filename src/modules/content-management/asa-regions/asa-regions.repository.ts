import { AsaRegion } from "./asa-regions.model";

export async function listAsaRegions(): Promise<AsaRegion[]> {
  return AsaRegion.findAll({ order: [["id", "ASC"]] });
}

export async function createAsaRegion(data: {
  regionName: string;
  asaDivisionId: number;
}): Promise<AsaRegion> {
  return AsaRegion.create({
    regionName: data.regionName,
    asaDivisionId: data.asaDivisionId,
  });
}

export async function getAsaRegion(id: number): Promise<AsaRegion | null> {
  return AsaRegion.findByPk(id);
}

export async function updateAsaRegion(
  id: number,
  data: { regionName: string; asaDivisionId: number },
): Promise<AsaRegion | null> {
  const row = await AsaRegion.findByPk(id);
  if (!row) {
    return null;
  }
  await row.update({
    regionName: data.regionName,
    asaDivisionId: data.asaDivisionId,
  });
  return row;
}

export async function deleteAsaRegion(id: number): Promise<boolean> {
  const deleted = await AsaRegion.destroy({ where: { id } });
  return deleted > 0;
}
