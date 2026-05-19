# How to add a new module

This guide walks through adding a feature module to the boilerplate: routes, optional database layer, auth, OpenAPI docs, and tests. You do **not** edit `src/app.ts` or a central route list—modules are **discovered automatically** from `src/modules/`.

**Example used below:** a `bookmarks` module with one table and standard CRUD under `/api/v1/bookmarks`.

---

## 1. Decide module shape

| Situation | What to create |
|-----------|----------------|
| New API area (users, orders, bookmarks) | Folder `src/modules/<module-name>/` |
| Several related resources (like ASA content) | One parent module + subfolders, each with its own `*.routes.ts` |
| No database (health, webhooks) | Skip `models.register.ts` and migrations |
| Model references another module’s table | Set `modelLoadDependencies` (see [§8](#8-models-and-load-order)) |

**Naming**

- Module folder: **kebab-case** (`bookmarks`, `content-management`).
- Files inside: **kebab-case** prefix matching the resource (`bookmarks.controller.ts`).
- URL segment in `routes.register.ts`: usually the same (`/bookmarks`).

---

## 2. Folder layout (checklist)

Minimum for a **database-backed** CRUD module:

```text
src/modules/bookmarks/
  routes.register.ts      # required — discovered at startup
  models.register.ts      # required if you have Sequelize models
  bookmarks.routes.ts
  bookmarks.controller.ts
  bookmarks.service.ts
  bookmarks.repository.ts
  bookmarks.model.ts
  bookmarks.schemas.ts
  bookmarks.types.ts      # optional — service input/filter types
  bookmarks.openapi.ts    # optional but recommended
  bookmarks.schemas.test.ts   # optional — colocated unit tests
```

Plus, when you need persistence:

```text
database/migrations/<timestamp>-create-bookmarks.js
```

After you add `routes.register.ts`, the server picks up the module on the next `npm run dev` restart—no bootstrap edits.

---

## 3. Register routes (`routes.register.ts`)

Every module that exposes HTTP handlers **must** export `registerV1Routes`:

```ts
import type { Router } from "express";

import { bookmarksRoutes } from "./bookmarks.routes";

export function registerV1Routes(v1Router: Router): void {
  v1Router.use("/bookmarks", bookmarksRoutes);
}
```

- Mount path is **relative to** `/api/v1` → full URL `GET /api/v1/bookmarks`.
- Bootstrap loads all `src/modules/*/routes.register.ts` files, validates `registerV1Routes`, sorts modules **alphabetically by folder name**, then mounts them.

Wire handlers in `bookmarks.routes.ts`:

```ts
import { Router } from "express";

import * as bookmarksController from "./bookmarks.controller";

export const bookmarksRoutes = Router();

bookmarksRoutes.get("/", bookmarksController.listBookmarks);
bookmarksRoutes.post("/", bookmarksController.createBookmark);
bookmarksRoutes.get("/:id", bookmarksController.getBookmark);
bookmarksRoutes.patch("/:id", bookmarksController.updateBookmark);
bookmarksRoutes.delete("/:id", bookmarksController.deleteBookmark);
```

**Nested resources** (pattern from `content-management`): keep one `routes.register.ts` on the parent, a parent `*.routes.ts` that `use()`s child routers, and child folders with their own `*.routes.ts` / controller / service / model.

---

## 4. Database migration

Create a migration (see [db-migrations.md](./db-migrations.md)):

```bash
npm run migration:create -- create-bookmarks
```

Implement `up` / `down` in `database/migrations/<timestamp>-create-bookmarks.js`. Match conventions from existing migrations:

- `utf8mb4` / `utf8mb4_unicode_ci` on `createTable`
- `created_at`, `updated_at` as `DATE(3)` with `CURRENT_TIMESTAMP(3)` defaults
- `deleted_at` nullable if the Sequelize model uses **paranoid** soft deletes

Apply locally:

```bash
npm run migration:up
npm run migration:status
```

Keep migration column names in **snake_case**; map to camelCase in Zod/schemas and services.

---

## 5. Sequelize model (`bookmarks.model.ts`)

Models live next to the module and use the shared `sequelize` instance:

```ts
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../../config/sequelize-config";

export class Bookmark extends Model<
  InferAttributes<Bookmark>,
  InferCreationAttributes<Bookmark>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare url: string;
  declare user_id: number;
}

Bookmark.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(2048),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "bookmarks",
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
  },
);
```

Register the model at startup in `models.register.ts`:

```ts
export const modelLoadDependencies: string[] = ["users"];

export async function registerModels(): Promise<void> {
  await import("./bookmarks.model.js");
}
```

- Use the **`.js`** extension in the dynamic import (matches compiled output under `dist/`).
- `modelLoadDependencies` lists **other module folder names** that must load first (here, `users` because of the FK). See [§8](#8-models-and-load-order).

If a module has **many** models, barrel-import them from one file (see `content-management.model.ts` / `rbac.model.ts`).

---

## 6. Layer responsibilities

Data flows **routes → controller → service → repository → model**.

| Layer | Responsibility |
|-------|----------------|
| **routes** | HTTP method + path only; attach middleware (`authenticateJwt`, `routesGuard`) |
| **controller** | Read `req` (params, query, body); Zod `safeParse`; call service; `sendSuccess` / `sendError` / `sendValidationError`; `handleControllerError` in `catch` |
| **service** | Business rules, FK checks, transactions (`withTransaction`) |
| **repository** | Sequelize queries only; accept optional `DbOptions` for transactions |
| **schemas** | Zod request bodies (and query objects if you prefer) |
| **types** | Plain TypeScript interfaces for service inputs (optional) |

### Repository

```ts
import type { DbOptions } from "../../shared/types/db-options";
import { Bookmark } from "./bookmarks.model";

export async function listBookmarks(): Promise<Bookmark[]> {
  return Bookmark.findAll({ order: [["id", "ASC"]] });
}

export async function createBookmark(
  data: { title: string; url: string; userId: number },
  options: DbOptions = {},
): Promise<Bookmark> {
  return Bookmark.create(
    {
      title: data.title,
      url: data.url,
      user_id: data.userId,
    },
    options,
  );
}
```

### Service

```ts
import { withTransaction } from "../../shared/db/with-transaction";
import type { DbOptions } from "../../shared/types/db-options";
import * as bookmarksRepository from "./bookmarks.repository";

export async function createBookmark(
  data: { title: string; url: string; userId: number },
  options: DbOptions = {},
) {
  return withTransaction(
    (opts) => bookmarksRepository.createBookmark(data, opts),
    options,
  );
}
```

Throw `new Error("…")` for predictable client errors (mapped to **400** by `handleControllerError`). For explicit status codes, throw an `Error` with a `statusCode` property (see `handle-controller-error.ts`).

### Schemas (Zod)

Use **camelCase** in JSON bodies; `.strict()` rejects unknown keys:

```ts
import { z } from "zod";

export const createBookmarkBodySchema = z
  .object({
    title: z.string().min(1, "title is required"),
    url: z.string().url("url must be a valid URL"),
    userId: z.coerce.number().int().positive(),
  })
  .strict();

export type CreateBookmarkBody = z.infer<typeof createBookmarkBodySchema>;
```

### Controller

Follow the same pattern as `users.controller.ts` / `asa-divisions.controller.ts`:

1. Validate body with `schema.safeParse(req.body)` → `sendValidationError` on failure.
2. Parse `:id` with `parseRouteId(req.params.id)` → `sendError(res, 400, "Invalid id")` if null.
3. Call service inside `try` / `catch` with `handleControllerError`.
4. Use `sendSuccess(res, data, { httpStatus: 201, message: "…" })` for creates.

Shared helpers:

- `src/shared/http/api-response.ts` — `sendSuccess`, `sendError`, `sendValidationError`
- `src/shared/http/parse-route-id.ts` — positive integer `:id`
- `src/shared/http/handle-controller-error.ts` — maps Sequelize and thrown errors

---

## 7. Authentication and RBAC

Protected routes add middleware on the **route** (not inside the controller).

```ts
import { authenticateJwt } from "../../shared/middlewares/auth-middleware";
import routesGuard from "../../shared/middlewares/routes-guard";

bookmarksRoutes.get(
  "/",
  authenticateJwt,
  routesGuard({ permissions: ["bookmark:view"], source: "token" }),
  bookmarksController.listBookmarks,
);
```

| Middleware | Purpose |
|------------|---------|
| `authenticateJwt` | Requires `Authorization: Bearer <access_token>`; sets `req.authUser`, `req.roles`, `req.permissions` |
| `routesGuard({ … })` | Requires `authUser` plus matching **roles** and/or **permissions** |

`routesGuard` options:

- `roles: ["admin"]` and/or `permissions: ["bookmark:view"]` — at least one list is required.
- `source: "token"` (default) — use claims from the JWT (fast, can be stale until token refresh).
- `source: "db"` — reload roles/permissions from MySQL (stricter, extra queries).

Working examples: `src/modules/test-routes/test-routes.ts` and its OpenAPI file.

**RBAC setup:** permission codes and roles must exist in the database (migrations create tables; you add rows via admin tools or your own seeders). Guard strings must match stored `permission_code` / `role_name` values or the guard returns **403**.

TypeScript knows about `req.authUser` via `src/shared/types/express.d.ts`.

---

## 8. Models and load order

On startup, `registerModuleModels()`:

1. Finds every `src/modules/*/models.register.ts`
2. Reads optional `modelLoadDependencies: string[]` (module **folder names**, e.g. `"users"`)
3. Topologically sorts modules, then runs each `registerModels()`

Example: `refresh-token` depends on `users`:

```ts
export const modelLoadDependencies: string[] = ["users"];
```

If module A’s table references module B’s table, list B in A’s dependencies. Cycles are rejected at startup.

Modules **without** a database skip `models.register.ts` entirely (`test-routes`).

---

## 9. OpenAPI (Swagger)

Add `bookmarks.openapi.ts` beside your routes file. Paths in `@openapi` blocks are **relative to** `/api/v1` (same as `servers` in `swagger-config.ts`):

```ts
/**
 * @openapi
 * /bookmarks:
 *   get:
 *     tags: [Bookmarks]
 *     summary: List bookmarks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */

/** Keeps JSDoc in emitted `.js` for swagger-jsdoc in production builds. */
export const openapiDocAnchor0 = undefined;
```

**Important:** export at least one `openapiDocAnchorN = undefined` sentinel per file so TypeScript preserves comments in `dist/**/*.openapi.js`. Without this, Swagger UI can be empty in production.

Docs are picked up automatically by the glob in `src/config/swagger-config.ts` (`src/modules/**/*.ts`).

Verify after `npm run dev`:

- UI: `http://localhost:3000/api-docs`
- JSON: `http://localhost:3000/api-docs.json`

---

## 10. Tests

| What | Where |
|------|--------|
| Zod schemas, pure helpers | Colocated `*.test.ts` next to source |
| HTTP status + JSON envelope | `tests/integration/<name>.test.ts` using `createTestApp()` or a custom router mount |

Run:

```bash
npm test
npm test -- src/modules/bookmarks/bookmarks.schemas.test.ts
```

Details: [how-to-create-test-file.md](./how-to-create-test-file.md).

Integration tests that need MySQL are not required by the boilerplate defaults; most teams add them when the feature stabilizes.

---

## 11. Verify end-to-end

1. **Env & DB:** `.env` with `DATABASE_URL`; `npm run migration:up`
2. **Start API:** `npm run dev` → listen on port from `env-config` (default `3000`)
3. **Smoke routes:**
   - `GET http://localhost:3000/api/v1/bookmarks`
   - Create / get / update / delete with your client or Swagger UI
4. **Tests:** `npm test`
5. **Build (optional):** `npm run build && npm start` — confirms `.js` model imports and OpenAPI anchors work in `dist/`

---

## 12. Quick reference

| Task | Command / location |
|------|---------------------|
| New migration | `npm run migration:create -- <name>` |
| Apply migrations | `npm run migration:up` |
| Module discovery | `src/bootstrap/register-module-routes.ts` |
| Model discovery | `src/bootstrap/register-module-models.ts` |
| Global middleware | `src/config/middleware-config.ts` |
| Env vars | `src/config/env-config.ts`, `env.example` |
| Sample auth/RBAC routes | `src/modules/test-routes/` |
| Full CRUD example | `src/modules/content-management/asa-divisions/` |

---

## 13. Common mistakes

| Problem | Fix |
|---------|-----|
| Routes not appearing | Add `routes.register.ts` exporting `registerV1Routes` |
| `registerV1Routes is not a function` | Export name must be exactly `registerV1Routes` |
| Model / table not found at runtime | Add `models.register.ts`; run migrations; check `DATABASE_URL` |
| FK errors on create | Migration `references` + service-level existence check |
| Swagger empty in production | Add `openapiDocAnchorN` exports in `*.openapi.ts` |
| Guard always 403 | Permission/role strings must exist in DB; user must have assignments |
| `import "./foo.model"` fails in `dist` | Use `await import("./foo.model.js")` in `models.register.ts` |

---

## Related docs

- [db-migrations.md](./db-migrations.md) — migrations in depth
- [how-to-create-test-file.md](./how-to-create-test-file.md) — Vitest and Supertest
- [deployment-guide.md](./deployment-guide.md) — Docker and production migrate workflow
- [README.md](../README.md) — env setup and what to remove from the template
