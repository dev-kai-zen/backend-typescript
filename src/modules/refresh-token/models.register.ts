export const modelLoadDependencies: string[] = ["users"];

export async function registerModels(): Promise<void> {
  await import("./refresh-token.model.js");
}
