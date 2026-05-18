import {
  listModuleRegisterFiles,
  MODULES_DIR,
} from "./discover-module-registers";
import { pathToFileURL } from "node:url";
import { Router } from "express";

type RouteRegistrar = {
  name: string;
  register: (v1: Router) => void;
};

export async function buildV1ModulesRouter(): Promise<Router> {
  const registrars = await listModuleRegisterFiles(
    MODULES_DIR,
    "routes.register",
  );

  const discovered: RouteRegistrar[] = [];

  for (const { name, path } of registrars) {
    const mod = (await import(pathToFileURL(path).href)) as {
      registerV1Routes?: unknown;
    };

    const register = mod.registerV1Routes;

    if (typeof register !== "function") {
      throw new Error(
        `Module "${name}": routes.register must export function registerV1Routes(v1Router)`,
      );
    }

    discovered.push({
      name,
      register: register as (v1: Router) => void,
    });
  }

  discovered.sort((a, b) => a.name.localeCompare(b.name));

  const v1Router = Router();

  for (const { register } of discovered) {
    register(v1Router);
  }

  return v1Router;
}
