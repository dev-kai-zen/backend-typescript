import { OAuth2Client } from "google-auth-library";

import { env } from "../../config/env-config";
import { User } from "../users/users.model";
import * as usersService from "../users/users.service";
import * as rbacUserRoleService from "../rbac/user-roles/rbac-user-roles.service";
import * as rbacRolePermissionsService from "../rbac/role-permissions/rbac-role-permissions.service";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../../shared/services/jwt-service";

let oauthClient: OAuth2Client | null = null;
function getGoogleOAuthClient(): OAuth2Client {
  if (!oauthClient) {
    oauthClient = new OAuth2Client(env.googleClientId);
  }
  return oauthClient;
}

/** Same derivation as `routes-guard` `principalFromDb`: dedupe role ids / permission codes. */
async function rolesAndPermissionsForJwt(userId: number): Promise<{
  roles: string[];
  permissions: string[];
}> {
  const userRoles =
    await rbacUserRoleService.getUserRolesWithDescriptions(userId);
  const roles = [...new Set(userRoles.map((r) => r.role.role_name))];
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

export async function loginWithGoogleIdToken(googleToken: string): Promise<{
  accessToken: string;
  refreshToken: string;
  user: User;
}> {
  const audience = env.googleClientId;
  const ticket = await getGoogleOAuthClient().verifyIdToken({
    idToken: googleToken,
    audience,
  });
  const payload = ticket.getPayload();
  if (!payload?.sub || !payload.email) {
    const err = new Error("Invalid Google token");
    (err as Error & { statusCode?: number }).statusCode = 401;
    throw err;
  }

  const googleId = payload.sub;
  const email = payload.email;
  const fullName = payload.name ?? null;
  const pictureUrl = payload.picture ?? null;

  let user = await User.findOne({ where: { google_id: googleId } });
  if (!user) {
    user = await User.findOne({ where: { email } });
  }

  if (!user) {
    user = await usersService.createUser({
      email,
      googleId,
      fullName,
      pictureUrl,
      isActive: true,
    });
  } else {
    await usersService.updateUser(user.id, {
      googleId: user.google_id ?? googleId,
      fullName: fullName ?? user.full_name,
      pictureUrl: pictureUrl ?? user.picture_url,
      lastLoginAt: new Date(),
    });
    const reloaded = await User.findByPk(user.id);
    if (!reloaded) {
      const err = new Error("User not found after update");
      (err as Error & { statusCode?: number }).statusCode = 500;
      throw err;
    }
    user = reloaded;
  }

  if (!user.is_active) {
    const err = new Error("Account disabled");
    (err as Error & { statusCode?: number }).statusCode = 403;
    throw err;
  }

  const { roles, permissions } = await rolesAndPermissionsForJwt(user.id);

  const accessToken = signAccessToken(user.id, roles, permissions);
  const refreshToken = signRefreshToken(user.id);

  return { accessToken, refreshToken, user };
}

export async function refreshAccessToken(
  refreshTokenFromCookie: string,
): Promise<string> {
  let userId: number;
  try {
    userId = verifyRefreshToken(refreshTokenFromCookie);
  } catch {
    const err = new Error("Invalid or expired refresh token");
    (err as Error & { statusCode?: number }).statusCode = 401;
    throw err;
  }

  const user = await User.findByPk(userId);
  if (!user || !user.is_active) {
    const err = new Error("Unauthorized");
    (err as Error & { statusCode?: number }).statusCode = 401;
    throw err;
  }

  const { roles, permissions } = await rolesAndPermissionsForJwt(user.id);
  return signAccessToken(user.id, roles, permissions);
}

export async function getMe(userId: number): Promise<{
  user: User;
  permissions: string[];
}> {
  const user = await usersService.getUser(userId);
  if (!user) {
    const err = new Error("User not found");
    (err as Error & { statusCode?: number }).statusCode = 404;
    throw err;
  }
  if (!user.is_active) {
    const err = new Error("Account disabled");
    (err as Error & { statusCode?: number }).statusCode = 403;
    throw err;
  }
  return { user, permissions: [] };
}
