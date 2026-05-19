# backend-typescript

Express + TypeScript REST API boilerplate with MySQL (Sequelize), JWT auth, Google sign-in, RBAC, OpenAPI/Swagger, and a modular `src/modules/` layout.

Use this document **before** you run the app for a new project. It covers configuration, secrets, database setup, and what to remove or rename so the repo matches your product—not the template defaults.

---

## Before you use this boilerplate

Complete these steps when you clone or fork the repo for a real project. Skipping them leaves demo credentials, sample routes, and example domain tables in place.

### 1. Copy environment variables

```bash
cp env.example .env
```

Never commit `.env`. It is already in `.gitignore`.

Required variables (validated at startup in `src/config/env-config.ts`):

| Variable | What to set |
|----------|-------------|
| `DATABASE_URL` | MySQL connection string for the database this API will use |
| `JWT_SECRET` | Long random string (not the example value) |
| `GOOGLE_CLIENT_ID` | OAuth 2.0 **Web client** ID from [Google Cloud Console](https://console.cloud.google.com/) |
| `FRONTEND_ORIGIN` | URL of your frontend (CORS); default `http://localhost:5173` |

Optional: `PORT`, `NODE_ENV`, rate-limit overrides (see `env.example`).

**Google auth:** The value in `env.example` is only a placeholder. Create your own OAuth client, add authorized JavaScript origins and redirect URIs for your frontend, and put your client ID in `.env` (and in Compose if you use Docker).

**JWT:** Generate a strong secret for each environment (e.g. `openssl rand -base64 48`). Do not reuse the docker-compose default in production.

### 2. Align MySQL with `DATABASE_URL`

Pick one approach and make sure `DATABASE_URL` matches it.

**Docker Compose (recommended for local dev)**

From the repo root:

```bash
docker compose up -d db
```

Default service settings (`docker-compose.yml`):

- Host port: **3390** → container `3306`
- Database: `boilerplate_db`
- User / password: `boilerplate` / `boilerplate_pass`

Example `DATABASE_URL` on your machine:

```text
DATABASE_URL=mysql://boilerplate:boilerplate_pass@127.0.0.1:3390/boilerplate_db
```

Rename database name, user, or passwords in **both** `docker-compose.yml` and `.env` if you change them.

**Existing MySQL (WSL, local install, managed DB)**

Point `DATABASE_URL` at your instance. Create an empty database first, then use credentials that can run DDL (migrations).

`env.example` shows a WSL-style URL (`localhost:3307`); adjust host, port, user, and database name to yours.

### 3. Install dependencies and run migrations

```bash
npm install
npm run migration:up
```

Migrations live in `database/migrations/` and create users, RBAC, refresh tokens, audit logs, and the sample **ASA** content-management tables. Details: [docs/db-migrations.md](docs/db-migrations.md).

Check status:

```bash
npm run migration:status
```

There are no bundled seeders; add RBAC roles/permissions and users via your own seeds or admin flows.

### 4. Rename the project (optional but recommended)

Update identifiers so logs, Swagger, and packages reflect your app:

- `package.json` → `name`, `description`, `repository`
- `src/config/swagger-config.ts` → API `title` / `description`
- Response strings in `src/modules/test-routes/` if you keep that module temporarily

Search the repo for `backend-typescript` and `boilerplate` and replace where it still makes sense.

### 5. Remove or adapt template-only code

| Area | Action |
|------|--------|
| **`src/modules/test-routes/`** | Sample health/JWT/RBAC demo routes under `/api/v1/test`. Delete the folder (and its `routes.register.ts`) when you no longer need examples. |
| **`src/modules/content-management/`** | Example CRUD for ASA divisions/regions/areas/etc. Remove the module and drop related migrations if your domain does not need them—or keep as a pattern for new modules. |
| **Other modules** | `users`, `google-auth`, `refresh-token`, `rbac`, `user-logs`, `audit-logs` are core to auth and authorization; keep or trim based on your product. |

New features: add a folder under `src/modules/<name>/` with `routes.register.ts` exporting `registerV1Routes`. The bootstrap in `src/bootstrap/register-module-routes.ts` discovers registers automatically.

### 6. Production and Docker checklist

- Set real `JWT_SECRET`, `GOOGLE_CLIENT_ID`, and `FRONTEND_ORIGIN` (Compose can read them from `.env` next to `docker-compose.yml`).
- Run migrations **explicitly** before relying on new schema—do not rely on auto-migrate in production. See [docs/deployment-guide.md](docs/deployment-guide.md).
- Rebuild the API image after `src/` changes: `docker compose build api`.
- Do not commit secrets; use your platform’s secret store in deployed environments.

---

## Quick start (after the steps above)

**Local Node (development)**

```bash
npm run dev
```

- API base: `http://localhost:3000/api/v1`
- Swagger UI: `http://localhost:3000/api-docs`
- OpenAPI JSON: `http://localhost:3000/api-docs.json`

**Full stack with Docker**

```bash
docker compose build api
docker compose run --rm api migrate   # apply schema
docker compose up -d
```

See [docs/deployment-guide.md](docs/deployment-guide.md) for health checks, ports, troubleshooting, and rollback notes.

---

## Documentation

| Topic | File |
|-------|------|
| Migrations (create, up, down, status) | [docs/db-migrations.md](docs/db-migrations.md) |
| Docker deploy and migrate workflow | [docs/deployment-guide.md](docs/deployment-guide.md) |
| Git workflow reference | [docs/git-commands.md](docs/git-commands.md) |

---

## Stack (reference)

- **Runtime:** Node 22, TypeScript, Express 5
- **DB:** MySQL 8, Sequelize 6, Sequelize CLI migrations
- **Auth:** Google ID token verification, JWT access + refresh cookies
- **API docs:** swagger-jsdoc + swagger-ui-express
- **Validation:** Zod
