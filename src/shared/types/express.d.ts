import type { User } from "../../modules/users/users.model";

declare global {
  namespace Express {
    interface Request {
      /** Set by `authenticateJwt` after a valid Bearer token. */
      authUser?: User;
      /** Role names from the access JWT (via `authenticateJwt`). */
      roles?: string[];
      /** Permission codes from the access JWT (via `authenticateJwt`). */
      permissions?: string[];
    }
  }
}

export {};
