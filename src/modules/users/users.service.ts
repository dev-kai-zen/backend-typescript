import { withTransaction } from "../../shared/db/with-transaction";
import type { DbOptions } from "../../shared/types/db-options";
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

export async function createUser(
  data: CreateUserInput,
  options: DbOptions = {},
): Promise<User> {
  return withTransaction(
    (opts) =>
      usersRepository.createUser(
        {
          email: data.email,
          googleId: data.googleId ?? null,
          fullName: data.fullName ?? null,
          pictureUrl: data.pictureUrl ?? null,
          isActive: data.isActive ?? true,
        },
        opts,
      ),
    options,
  );
}

export async function getUser(id: number): Promise<User | null> {
  return usersRepository.getUser(id);
}

export async function findUserByGoogleId(
  googleId: string,
): Promise<User | null> {
  return usersRepository.findUserByGoogleId(googleId);
}

export async function findUserByEmail(email: string): Promise<User | null> {
  return usersRepository.findUserByEmail(email);
}

export async function updateUser(
  id: number,
  data: UpdateUserInput,
  options: DbOptions = {},
): Promise<User | null> {
  return withTransaction((opts) => usersRepository.updateUser(id, data, opts), options);
}

export async function deleteUser(
  id: number,
  options: DbOptions = {},
): Promise<boolean> {
  return withTransaction(
    (opts) => usersRepository.deleteUser(id, opts),
    options,
  );
}
