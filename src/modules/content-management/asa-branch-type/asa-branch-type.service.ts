import type { AsaBranchType } from "./asa-branch-type.model";
import * as asaBranchTypeRepository from "./asa-branch-type.repository";

export async function listAsaBranchTypes(): Promise<AsaBranchType[]> {
  return asaBranchTypeRepository.listAsaBranchTypes();
}

export async function createAsaBranchType(data: {
  typeName: string;
}): Promise<AsaBranchType> {
  if (!data.typeName || data.typeName.trim() === "") {
    throw new Error("typeName is required");
  }
  return asaBranchTypeRepository.createAsaBranchType({
    typeName: data.typeName.trim(),
  });
}

export async function getAsaBranchType(id: number): Promise<AsaBranchType | null> {
  return asaBranchTypeRepository.getAsaBranchType(id);
}

export async function updateAsaBranchType(
  id: number,
  data: { typeName: string },
): Promise<AsaBranchType | null> {
  if (!data.typeName || data.typeName.trim() === "") {
    throw new Error("typeName is required");
  }
  return asaBranchTypeRepository.updateAsaBranchType(id, {
    typeName: data.typeName.trim(),
  });
}

export async function deleteAsaBranchType(id: number): Promise<boolean> {
  return asaBranchTypeRepository.deleteAsaBranchType(id);
}
