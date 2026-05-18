import {
  listModuleRegisterFiles,
  MODULES_DIR,
} from "./discover-module-registers";
import { pathToFileURL } from "node:url";
import { Router } from "express";

const DEFAULT_ROUTE_ORDER = 1_000;

type RouteRegistrar = {
  name: string;
  order: number;
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
      routeRegistrationOrder?: unknown;
      registerV1Routes?: unknown;
    };

    const register = mod.registerV1Routes;

    if (typeof register !== "function") {
      throw new Error(
        `Module "${name}": routes.register must export function registerV1Routes(v1Router)`,
      );
    }

    const order =
      typeof mod.routeRegistrationOrder === "number"
        ? mod.routeRegistrationOrder
        : DEFAULT_ROUTE_ORDER;

    discovered.push({
      name,
      order,
      register: register as (v1: Router) => void,
    });
  }

  discovered.sort((a, b) => {
    if (a.order !== b.order) {
      return a.order - b.order;
    }
    return a.name.localeCompare(b.name);
  });

  const v1Router = Router();

  for (const { register } of discovered) {
    register(v1Router);
  }

  return v1Router;
}
