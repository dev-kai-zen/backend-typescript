import type { WhereOptions } from "sequelize";

import { User } from "./users.model";
import type { CreateUserInput, ListUsersFilters } from "./users.types";

export async function listUsers(filters: ListUsersFilters): Promise<User[]> {
  const where: WhereOptions<User> = {};
  if (filters.isActive !== undefined) {
    where.is_active = filters.isActive;
  }
  return User.findAll({
    where,
    order: [["id", "ASC"]],
  });
}

export async function createUser(data: CreateUserInput): Promise<User> {
  return User.create({
    email: data.email,
    google_id: data.googleId ?? null,
    full_name: data.fullName ?? null,
    picture_url: data.pictureUrl ?? null,
    is_active: data.isActive ?? true,
    last_login_at: null,
  });
}

export async function getUser(id: number): Promise<User | null> {
  return User.findByPk(id);
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
): Promise<User | null> {
  const user = await User.findByPk(id);
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
  await user.update(patch);
  return user;
}

export async function deleteUser(id: number): Promise<boolean> {
  const deleted = await User.destroy({ where: { id } });
  return deleted > 0;
}
