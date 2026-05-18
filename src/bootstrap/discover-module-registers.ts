import { existsSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { join } from "node:path";

/** Absolute path to `src/modules` or `dist/modules` (sibling of `bootstrap/`). */
export const MODULES_DIR = join(__dirname, "../modules");

/**
 * Resolve `models.register` / `routes.register` for `tsx` (`.ts` in src) or `node dist` (`.js`).
 */
function resolveRegisterFile(
  modulesDir: string,
  moduleName: string,
  baseName: string,
): string | null {
  const tsPath = join(modulesDir, moduleName, `${baseName}.ts`);
  const jsPath = join(modulesDir, moduleName, `${baseName}.js`);
  if (existsSync(tsPath)) {
    return tsPath;
  }
  if (existsSync(jsPath)) {
    return jsPath;
  }
  return null;
}

/**
 * Lists first-level module folders that contain `<baseName>.ts` or `<baseName>.js`.
 * Returns absolute file paths ready for `import(pathToFileURL(file).href)`.
 */
export async function listModuleRegisterFiles(
  modulesDir: string,
  baseName: string,
): Promise<{ name: string; path: string }[]> {
  const entries = await readdir(modulesDir, { withFileTypes: true });
  const moduleNames = entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name);

  const out: { name: string; path: string }[] = [];

  for (const name of moduleNames) {
    const resolved = resolveRegisterFile(modulesDir, name, baseName);
    if (resolved === null) {
      continue;
    }
    out.push({ name, path: resolved });
  }

  return out;
}
