import {
  listModuleRegisterFiles,
  MODULES_DIR,
} from "./discover-module-registers";
import { pathToFileURL } from "node:url";

type ModelRegistrar = {
  deps: string[];
  registerModels: () => Promise<void>;
};

export async function registerModuleModels(): Promise<void> {
  const registrars = await listModuleRegisterFiles(
    MODULES_DIR,
    "models.register",
  );

  const discovered = new Map<string, ModelRegistrar>();

  for (const { name, path } of registrars) {
    const mod = (await import(pathToFileURL(path).href)) as {
      modelLoadDependencies?: unknown;
      registerModels?: unknown;
    };

    const deps = Array.isArray(mod.modelLoadDependencies)
      ? (mod.modelLoadDependencies as string[])
      : [];
    const registerModels = mod.registerModels;

    if (typeof registerModels !== "function") {
      throw new Error(
        `Module "${name}": models.register must export function registerModels()`,
      );
    }

    discovered.set(name, {
      deps,
      registerModels: registerModels as () => Promise<void>,
    });
  }

  const order = topologicalSortModules(discovered);

  for (const name of order) {
    await discovered.get(name)!.registerModels();
  }
}

function topologicalSortModules(
  discovered: Map<string, { deps: string[] }>,
): string[] {
  const names = [...discovered.keys()];
  const indegree = new Map<string, number>();
  const adj = new Map<string, string[]>();

  for (const n of names) {
    indegree.set(n, 0);
    adj.set(n, []);
  }

  for (const name of names) {
    const { deps } = discovered.get(name)!;
    for (const d of deps) {
      if (!discovered.has(d)) {
        throw new Error(
          `Module "${name}": modelLoadDependencies references "${d}" but that module has no models.register`,
        );
      }
      indegree.set(name, (indegree.get(name) ?? 0) + 1);
      adj.get(d)!.push(name);
    }
  }

  const queue = names.filter((n) => (indegree.get(n) ?? 0) === 0).sort();
  const out: string[] = [];

  while (queue.length > 0) {
    const n = queue.shift()!;
    out.push(n);
    for (const m of adj.get(n)!) {
      indegree.set(m, (indegree.get(m) ?? 0) - 1);
      if ((indegree.get(m) ?? 0) === 0) {
        queue.push(m);
        queue.sort();
      }
    }
  }

  if (out.length !== names.length) {
    throw new Error("Cycle detected in modelLoadDependencies.");
  }

  return out;
}
