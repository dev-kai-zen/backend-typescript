export const modelLoadDependencies: string[] = [];

export async function registerModels(): Promise<void> {
  await import("./categories/rbac-categories.model.js");
  await import("./roles/rbac-roles.model.js");
  await import("./permissions/rbac-permissions.model.js");
  await import("./role-permissions/rbac-role-permissions.model.js");
  await import("./user-roles/rbac-user-roles.model.js");
}
