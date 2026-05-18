export const modelLoadDependencies: string[] = ["users"];

export async function registerModels(): Promise<void> {
  await import("./user-logs.model.js");
}
