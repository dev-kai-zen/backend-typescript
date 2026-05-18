export const modelLoadDependencies: string[] = [];

export async function registerModels(): Promise<void> {
  await import("./users.model.js");
}
