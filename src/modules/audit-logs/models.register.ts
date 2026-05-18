export const modelLoadDependencies: string[] = ["users"];

export async function registerModels(): Promise<void> {
  await import("./audit-logs.model.js");
}
