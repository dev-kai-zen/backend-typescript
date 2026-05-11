import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

import { User } from "../users/users.model";
import * as usersService from "../users/users.service";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v || v.trim() === "") {
    throw new Error(`${name} is not set`);
  }
  return v.trim();
}

let oauthClient: OAuth2Client | null = null;
function getGoogleOAuthClient(): OAuth2Client {
  if (!oauthClient) {
    oauthClient = new OAuth2Client(requireEnv("GOOGLE_CLIENT_ID"));
  }
  return oauthClient;
}

export async function loginWithGoogleIdToken(googleToken: string): Promise<{
  accessToken: string;
  user: User;
}> {
  const audience = requireEnv("GOOGLE_CLIENT_ID");
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

  let user = await User.findOne({ where: { googleId } });
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
      googleId: user.googleId ?? googleId,
      fullName: fullName ?? user.fullName,
      pictureUrl: pictureUrl ?? user.pictureUrl,
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

  if (!user.isActive) {
    const err = new Error("Account disabled");
    (err as Error & { statusCode?: number }).statusCode = 403;
    throw err;
  }

  const secret = requireEnv("JWT_SECRET");
  const accessToken = jwt.sign({ sub: user.id }, secret, { expiresIn: "7d" });

  return { accessToken, user };
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
  if (!user.isActive) {
    const err = new Error("Account disabled");
    (err as Error & { statusCode?: number }).statusCode = 403;
    throw err;
  }
  return { user, permissions: [] };
}
