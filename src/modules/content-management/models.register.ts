export const modelLoadDependencies: string[] = [];

export async function registerModels(): Promise<void> {
 await import("./content-management.model.js");
}
