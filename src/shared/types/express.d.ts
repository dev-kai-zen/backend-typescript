import type { User } from "../../modules/users/users.model";

declare global {
  namespace Express {
    interface Request {
      /** Set by `authenticateJwt` after a valid Bearer token. */
      authUser?: User;
    }
  }
}

export {};
