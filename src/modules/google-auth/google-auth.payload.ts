import type { User } from "../users/users.model";

/**
 * Shape aligned with the legacy wellness frontend (`user.name`, `user.picture`, `google_id`).
 */
export function buildUserPayload(user: User) {
  return {
    id: user.id,
    google_id: user.google_id ?? null,
    name: user.full_name ?? "",
    email: user.email,
    picture: user.picture_url ?? "",
    role_id: null as number | null,
    role: null as { role_name: string } | null,
    group_id: null as number | null,
    is_active: user.is_active ? 1 : 0,
    permissions: [] as string[],
    flags: [] as string[],
    provider: "google",
  };
}
