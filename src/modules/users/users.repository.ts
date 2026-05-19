import { Op, type WhereOptions } from "sequelize";

import type { DbOptions } from "../../shared/types/db-options";
import { RbacUserRole } from "../rbac/user-roles/rbac-user-roles.model";
import { User } from "./users.model";
import type { CreateUserInput, ListUsersFilters } from "./users.types";

export async function listUsers(filters: ListUsersFilters): Promise<User[]> {
  const where: WhereOptions<User> = {};
  if (filters.isActive !== undefined) {
    where.is_active = filters.isActive;
  }
  if (
    filters.roleId !== undefined &&
    typeof filters.roleId === "number" &&
    Number.isFinite(filters.roleId)
  ) {
    const links = await RbacUserRole.findAll({
      attributes: ["user_id"],
      where: { role_id: filters.roleId },
      raw: true,
    });
    const ids = [...new Set(links.map((l) => l.user_id))];
    if (ids.length === 0) {
      return [];
    }
    where.id = { [Op.in]: ids };
  }
  return User.findAll({
    where,
    order: [["id", "ASC"]],
  });
}

export async function createUser(
  data: CreateUserInput,
  options: DbOptions = {},
): Promise<User> {
  return User.create(
    {
      email: data.email,
      google_id: data.googleId ?? null,
      full_name: data.fullName ?? null,
      picture_url: data.pictureUrl ?? null,
      is_active: data.isActive ?? true,
      last_login_at: null,
    },
    options,
  );
}

export async function getUser(id: number): Promise<User | null> {
  return User.findByPk(id);
}

export async function findUserByGoogleId(
  googleId: string,
): Promise<User | null> {
  return User.findOne({ where: { google_id: googleId } });
}

export async function findUserByEmail(email: string): Promise<User | null> {
  return User.findOne({ where: { email } });
}

export async function updateUser(
  id: number,
  data: Partial<{
    email: string;
    googleId: string | null;
    fullName: string | null;
    pictureUrl: string | null;
    isActive: boolean;
    lastLoginAt: Date | null;
  }>,
  options: DbOptions = {},
): Promise<User | null> {
  const user = await User.findByPk(id, options);
  if (!user) {
    return null;
  }
  const patch: Partial<{
    email: string;
    google_id: string | null;
    full_name: string | null;
    picture_url: string | null;
    is_active: boolean;
    last_login_at: Date | null;
  }> = {};
  if (data.email !== undefined) {
    patch.email = data.email;
  }
  if (data.googleId !== undefined) {
    patch.google_id = data.googleId;
  }
  if (data.fullName !== undefined) {
    patch.full_name = data.fullName;
  }
  if (data.pictureUrl !== undefined) {
    patch.picture_url = data.pictureUrl;
  }
  if (data.isActive !== undefined) {
    patch.is_active = data.isActive;
  }
  if (data.lastLoginAt !== undefined) {
    patch.last_login_at = data.lastLoginAt;
  }
  await user.update(patch, options);
  return user.reload(options);
}

export async function deleteUser(
  id: number,
  options: DbOptions = {},
): Promise<boolean> {
  const user = await User.findByPk(id, options);
  if (!user) {
    return false;
  }
  await user.destroy(options);
  return true;
}
