import type { User } from "../users/users.model";

/**
 * Shape aligned with the legacy wellness frontend (`user.name`, `user.picture`, `google_id`).
 */
export function buildUserPayload(user: User) {
  return {
    id: user.id,
    google_id: user.googleId ?? null,
    name: user.fullName ?? "",
    email: user.email,
    picture: user.pictureUrl ?? "",
    role_id: null as number | null,
    role: null as { role_name: string } | null,
    group_id: null as number | null,
    is_active: user.isActive ? 1 : 0,
    permissions: [] as string[],
    flags: [] as string[],
    provider: "google",
  };
}
