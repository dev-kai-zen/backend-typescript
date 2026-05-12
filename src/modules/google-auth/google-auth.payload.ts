import type { User } from "../users/users.model";

export function buildUserPayload(user: User) {
  return {
    id: user.id,
    name: user.full_name ?? "",
    email: user.email,
    picture: user.picture_url ?? "",
    is_active: user.is_active ? 1 : 0,
  };
}
