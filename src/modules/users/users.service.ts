import * as usersRepository from "./users.repository";
import type { User } from "./users.model";
import type {
  CreateUserInput,
  ListUsersFilters,
  UpdateUserInput,
} from "./users.types";

export async function listUsers(filters: ListUsersFilters): Promise<User[]> {
  return usersRepository.listUsers(filters);
}

export async function createUser(data: CreateUserInput): Promise<User> {
  if (!data.email || typeof data.email !== "string") {
    throw new Error("email is required");
  }
  const email = data.email.trim();
  if (email === "") {
    throw new Error("email is required");
  }

  let googleId: string | null = null;
  if (data.googleId !== undefined && data.googleId !== null) {
    if (typeof data.googleId !== "string") {
      throw new Error("googleId must be a string or null");
    }
    const t = data.googleId.trim();
    googleId = t === "" ? null : t;
  }

  let fullName: string | null = null;
  if (data.fullName !== undefined && data.fullName !== null) {
    if (typeof data.fullName !== "string") {
      throw new Error("fullName must be a string or null");
    }
    const t = data.fullName.trim();
    fullName = t === "" ? null : t;
  }

  let pictureUrl: string | null = null;
  if (data.pictureUrl !== undefined && data.pictureUrl !== null) {
    if (typeof data.pictureUrl !== "string") {
      throw new Error("pictureUrl must be a string or null");
    }
    const t = data.pictureUrl.trim();
    pictureUrl = t === "" ? null : t;
  }

  return usersRepository.createUser({
    email,
    googleId,
    fullName,
    pictureUrl,
    isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
  });
}

export async function getUser(id: number): Promise<User | null> {
  return usersRepository.getUser(id);
}

export async function updateUser(
  id: number,
  data: UpdateUserInput,
): Promise<User | null> {
  const patch: Partial<{
    email: string;
    googleId: string | null;
    fullName: string | null;
    pictureUrl: string | null;
    isActive: boolean;
    lastLoginAt: Date | null;
  }> = {};

  if (data.email !== undefined) {
    if (typeof data.email !== "string" || data.email.trim() === "") {
      throw new Error("email cannot be empty");
    }
    patch.email = data.email.trim();
  }

  if (data.googleId !== undefined) {
    patch.googleId =
      typeof data.googleId === "string" && data.googleId.trim() !== ""
        ? data.googleId.trim()
        : null;
  }

  if (data.fullName !== undefined) {
    patch.fullName =
      typeof data.fullName === "string" && data.fullName.trim() !== ""
        ? data.fullName.trim()
        : null;
  }

  if (data.pictureUrl !== undefined) {
    patch.pictureUrl =
      typeof data.pictureUrl === "string" && data.pictureUrl.trim() !== ""
        ? data.pictureUrl.trim()
        : null;
  }

  if (data.isActive !== undefined) {
    patch.isActive = Boolean(data.isActive);
  }

  if (data.lastLoginAt !== undefined) {
    patch.lastLoginAt = data.lastLoginAt;
  }

  if (Object.keys(patch).length === 0) {
    throw new Error("No fields to update");
  }

  return usersRepository.updateUser(id, patch);
}

export async function deleteUser(id: number): Promise<boolean> {
  return usersRepository.deleteUser(id);
}
