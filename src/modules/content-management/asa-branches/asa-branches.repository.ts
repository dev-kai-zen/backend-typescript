import { AsaBranch } from "./asa-branches.model";

export async function listAsaBranches(): Promise<AsaBranch[]> {
  return AsaBranch.findAll({ order: [["id", "ASC"]] });
}

export async function createAsaBranch(data: {
  branchCode: string;
  branchName: string;
  asaAreaId: number;
  asaBranchTypeId: number;
}): Promise<AsaBranch> {
  return AsaBranch.create({
    branch_code: data.branchCode,
    branch_name: data.branchName,
    asa_area_id: data.asaAreaId,
    asa_branch_type_id: data.asaBranchTypeId,
  });
}

export async function getAsaBranch(id: number): Promise<AsaBranch | null> {
  return AsaBranch.findByPk(id);
}

export async function updateAsaBranch(
  id: number,
  data: {
    branchCode: string;
    branchName: string;
    asaAreaId: number;
    asaBranchTypeId: number;
  },
): Promise<AsaBranch | null> {
  const row = await AsaBranch.findByPk(id);
  if (!row) {
    return null;
  }
  await row.update({
    branch_code: data.branchCode,
    branch_name: data.branchName,
    asa_area_id: data.asaAreaId,
    asa_branch_type_id: data.asaBranchTypeId,
  });
  return row;
}

export async function deleteAsaBranch(id: number): Promise<boolean> {
  const deleted = await AsaBranch.destroy({ where: { id } });
  return deleted > 0;
}
