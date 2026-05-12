import type { NextFunction, Request, Response } from "express";

import * as rbacRolePermissionsService from "../../modules/rbac/role-permissions/rbac-role-permissions.service";
import * as rbacUserRolesService from "../../modules/rbac/user-roles/rbac-user-roles.service";

export interface GuardOptions {
  roles?: string[];
  permissions?: string[];
  /**
   * - `"db"` — load current role names + permission codes from the database (`authUser` required).
   * - `"token"` (default) — use `req.roles` / `req.permissions` from the access JWT (set by `authenticateJwt`).
   */
  source?: "token" | "db";
}

type AuthPrincipal = {
  roles: string[];
  permissions: string[];
};

async function principalFromDb(userId: number): Promise<AuthPrincipal> {
  const userRoles =
    await rbacUserRolesService.getUserRolesWithDescriptions(userId);
  const roles = userRoles.map((r) => r.role.role_name);
  const roleIds = [...new Set(userRoles.map((r) => r.role_id))];
  if (roleIds.length === 0) {
    return { roles, permissions: [] };
  }
  const links =
    await rbacRolePermissionsService.getRolePermissionsByRoleIds(roleIds);
  const permissions = [
    ...new Set(
      links.map((row) => row.permission.permission_code),
    ),
  ];
  return { roles, permissions };
}

function normalizedRoleRequirement(role?: string[]): string[] | undefined {
  return role?.length ? role : undefined;
}

function normalizedPermissionRequirement(
  permissions?: string[],
): string[] | undefined {
  return permissions?.length ? permissions : undefined;
}

function validateGuardOptions(options: GuardOptions): void {
  const needsRole = normalizedRoleRequirement(options.roles);
  const needsPerms = normalizedPermissionRequirement(options.permissions);
  if (!needsRole && !needsPerms) {
    throw new Error(
      "routesGuard: either `roles` or `permissions` must be provided",
    );
  }
}

function hasAccess(principal: AuthPrincipal, options: GuardOptions): boolean {
  const roleReq = normalizedRoleRequirement(options.roles);
  const permReq = normalizedPermissionRequirement(options.permissions);

  if (roleReq) {
    if (!roleReq.some((role) => principal.roles.includes(role))) {
      return false;
    }
  }

  if (permReq) {
    const granted = principal.permissions;
    if (!permReq.every((p) => granted.includes(p))) {
      return false;
    }
  }

  return true;
}

function routesGuard(options: GuardOptions) {
  validateGuardOptions(options);
  const source = options.source ?? "token";

  return async function routesGuardMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const authUser = req.authUser;
    if (!authUser) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    let principal: AuthPrincipal;

    if (source === "db") {
      principal = await principalFromDb(authUser.id);
    } else {
      principal = {
        roles: req.roles ?? [],
        permissions: req.permissions ?? [],
      };
    }

    if (!hasAccess(principal, options)) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    next();
  };
}

export default routesGuard;
