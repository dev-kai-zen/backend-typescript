export const modelLoadDependencies: string[] = [];

export async function registerModels(): Promise<void> {
  await import("./asa-operations/asa-operations.model.js");
  await import("./asa-divisions/asa-divisions.model.js");
  await import("./asa-regions/asa-regions.model.js");
  await import("./asa-areas/asa-areas.model.js");
  await import("./asa-branch-type/asa-branch-type.model.js");
  await import("./asa-branches/asa-branches.model.js");
}
