export interface CreateUserInput {
  email: string;
  googleId?: string | null;
  fullName?: string | null;
  pictureUrl?: string | null;
  isActive?: boolean;
}

export interface UpdateUserInput {
  email?: string;
  googleId?: string | null;
  fullName?: string | null;
  pictureUrl?: string | null;
  isActive?: boolean;
  lastLoginAt?: Date | null;
}

export interface ListUsersFilters {
  isActive?: boolean;
  /** When set, only users assigned this RBAC role (`rbac_user_roles`). */
  roleId?: number;
}
