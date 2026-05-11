import type { WhereOptions } from "sequelize";

import { User } from "./users.model";
import type { CreateUserInput, ListUsersFilters } from "./users.types";

export async function listUsers(
  filters: ListUsersFilters,
): Promise<User[]> {
  const where: WhereOptions<User> = {};
  if (filters.isActive !== undefined) {
    where.isActive = filters.isActive;
  }
  return User.findAll({
    where,
    order: [["id", "ASC"]],
  });
}

export async function createUser(data: CreateUserInput): Promise<User> {
  return User.create({
    email: data.email,
    googleId: data.googleId ?? null,
    fullName: data.fullName ?? null,
    pictureUrl: data.pictureUrl ?? null,
    isActive: data.isActive ?? true,
    lastLoginAt: null,
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
  await user.update(data);
  return user;
}

export async function deleteUser(id: number): Promise<boolean> {
  const deleted = await User.destroy({ where: { id } });
  return deleted > 0;
}
