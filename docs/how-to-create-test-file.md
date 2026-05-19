# How to create a test file (junior guide)

This guide explains how to add automated tests in this backend boilerplate. You do **not** need a running database for most unit tests.

**Tools used:** [Vitest](https://vitest.dev/) (test runner) and [Supertest](https://github.com/ladjs/supertest) (HTTP requests against Express).

---

## 1. What is a test?

A test is a small program that checks your real code behaves as you expect.

- You call a function (or hit an API route).
- You **assert** the result (e.g. “returns 200”, “throws on invalid email”).
- You run all tests with `npm test`. If any assertion fails, the command exits with an error so you catch bugs before deploy.

**Goal:** When you change code later, tests tell you quickly if something broke.

---

## 2. Before you start

From the project root:

```bash
npm install   # once
npm test      # run all tests
```

While writing tests:

```bash
npm run test:watch   # re-runs when you save files
```

Run **one file** only (faster while you work):

```bash
npm test -- src/modules/users/users.schemas.test.ts
```

You do **not** need a `.env` file for unit tests. `tests/setup.ts` sets fake values for `DATABASE_URL`, `JWT_SECRET`, etc.

---

## 3. Where to put the file

| What you are testing | Where to create the file | Example |
|----------------------|---------------------------|---------|
| Code inside a module (schema, service, helper) | **Next to** the source file | `users.schemas.ts` → `users.schemas.test.ts` |
| Full HTTP route (GET/POST + status + JSON) | `tests/integration/` | `tests/integration/users.test.ts` |

### File name rule

The name **must** end with `.test.ts`:

- ✅ `users.schemas.test.ts`
- ❌ `users.test.ts` (Vitest will not pick it up)
- ❌ `test.ts`

Vitest automatically finds:

- Every `*.test.ts` under `src/`
- Every `*.test.ts` under `tests/`

Config: `vitest.config.mts`.

---

## 4. Minimum template (copy and adapt)

Create a file next to what you test, for example `src/modules/users/users.schemas.test.ts`:

```ts
import { describe, expect, it } from "vitest";

import { createUserBodySchema } from "./users.schemas";

describe("createUserBodySchema", () => {
  it("accepts a valid email", () => {
    const result = createUserBodySchema.safeParse({
      email: "user@example.com",
    });

    expect(result.success).toBe(true);
  });
});
```

### The three building blocks

| Piece | Meaning |
|-------|---------|
| `describe("name", () => { ... })` | Groups related tests (one function, one schema, one route). |
| `it("what should happen", () => { ... })` | **One** behavior. Name it like a sentence: `"rejects missing email"`. |
| `expect(value).toBe(...)` | Check the result. If it is wrong, the test fails. |

### Imports you need

Always import test helpers from Vitest:

```ts
import { describe, expect, it } from "vitest";
```

Import the **real code** you test with a relative path:

```ts
import { createUserBodySchema } from "./users.schemas";
```

---

## 5. Your first test (recommended): Zod schemas

**Why start here:** Schemas only validate JSON shapes. No database, no HTTP, no mocks.

**File to copy from:** `src/modules/users/users.schemas.test.ts`

### Happy path (valid input)

```ts
it("accepts a minimal valid body", () => {
  const result = createUserBodySchema.safeParse({
    email: "user@example.com",
  });

  expect(result.success).toBe(true);
  if (result.success) {
    expect(result.data.email).toBe("user@example.com");
  }
});
```

Use `safeParse` so invalid input does not throw — you check `result.success`.

### Sad path (invalid input)

```ts
it("rejects missing email", () => {
  const result = createUserBodySchema.safeParse({});

  expect(result.success).toBe(false);
  if (!result.success) {
    expect(result.error.issues[0]?.message).toMatch(/required/i);
  }
});
```

### Several cases at once (`it.each`)

```ts
it.each(["", "   "])("rejects empty email (%j)", (email) => {
  const result = createUserBodySchema.safeParse({ email });
  expect(result.success).toBe(false);
});
```

---

## 6. Common `expect` matchers

```ts
expect(1 + 1).toBe(2);                    // strict equality
expect({ a: 1 }).toEqual({ a: 1 });       // deep equality (objects/arrays)
expect(result.success).toBe(true);
expect(result.success).toBe(false);
expect("hello world").toMatch(/world/);  // regex on strings
expect(() => fn()).toThrow();             // function must throw
expect(() => fn()).toThrow("some message");
```

For API responses (integration tests):

```ts
expect(res.status).toBe(200);
expect(res.body).toMatchObject({
  status: true,
  data: { status: "API is running" },
});
```

---

## 7. What to test (easiest → harder)

Work through this order as you learn.

### Level 1 — Schemas and pure helpers (start here)

**Examples in repo:**

- `src/modules/users/users.schemas.test.ts`
- `src/shared/validation/parse-input.test.ts`
- `src/shared/http/parse-route-id.test.ts`
- `src/shared/services/jwt-service.test.ts`

**Test:** Valid input passes, invalid input fails, edge cases (empty string, wrong type).

---

### Level 2 — Services (mock the database layer)

Services call repositories (Sequelize). In unit tests you **mock** the repository so no real MySQL is used.

Create `src/modules/users/users.service.test.ts`:

```ts
import { beforeEach, describe, expect, it, vi } from "vitest";

import * as usersRepository from "./users.repository";
import { getUser } from "./users.service";

// Replace the real repository with fakes for this file only
vi.mock("./users.repository");

describe("getUser", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns the user when the repository finds one", async () => {
    const fakeUser = { id: 1, email: "a@b.com" } as never;
    vi.mocked(usersRepository.getUser).mockResolvedValue(fakeUser);

    const result = await getUser(1);

    expect(result).toEqual(fakeUser);
    expect(usersRepository.getUser).toHaveBeenCalledWith(1);
  });

  it("returns null when the repository finds nothing", async () => {
    vi.mocked(usersRepository.getUser).mockResolvedValue(null);

    const result = await getUser(999);

    expect(result).toBeNull();
  });
});
```

**Idea:** You test **your** service logic; the mock pretends the DB returned whatever you need.

---

### Level 3 — HTTP routes (integration)

You send real HTTP requests to the Express app and check status + JSON.

**Examples in repo:**

- `tests/integration/test-routes.test.ts`
- Helper: `tests/helpers/create-test-app.ts` (builds a small app without starting the server on a port)

Template:

```ts
import request from "supertest";
import { describe, expect, it } from "vitest";

import { createTestApp } from "../helpers/create-test-app";

describe("GET /api/v1/test/health", () => {
  const app = createTestApp();

  it("returns 200 and health payload", async () => {
    const res = await request(app).get("/api/v1/test/health");

    expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);
  });
});
```

**Note:** Routes that use `authenticateJwt` or Sequelize need a valid JWT and/or DB (or more mocking). Start with **public** routes like health checks.

To test **your** module’s routes, extend `create-test-app.ts` to mount your router (same pattern as test routes).

---

## 8. Step-by-step checklist for a new test file

1. Decide **what** you test (schema? pure function? service? route?).
2. Create `something.test.ts` beside the source **or** under `tests/integration/`.
3. Add imports: `describe`, `expect`, `it` from `vitest`, plus your module.
4. Add one `describe` block named after the unit.
5. Add one `it` for the **happy path** — run `npm test` and make sure it passes.
6. Add `it` blocks for **sad paths** (invalid input, not found, unauthorized).
7. Run `npm run test:watch` while you edit.

---

## 9. Good test names and habits

**Do:**

- One behavior per `it` (one reason to fail).
- Name tests as sentences: `"rejects email without @"`, not `"test1"`.
- Test behavior users care about, not implementation details.

**Avoid:**

- Tests that depend on order (test A must run before test B).
- Hitting a real production database in unit tests.
- Giant tests that assert ten unrelated things.

---

## 10. Troubleshooting

| Problem | What to do |
|---------|------------|
| `No test files found` | File must end with `.test.ts` and live under `src/` or `tests/`. |
| `Cannot find module` | Fix the import path (`./users.schemas` from the same folder). |
| Test fails but app “works” in Postman | Test might be wrong, or app manual test used different input — check `expect` vs actual in the error output. |
| Comment block breaks the file | Do not write `*/` inside block comments (e.g. avoid glob patterns with `**` in `/* ... */`). |
| Need env vars | Rely on `tests/setup.ts`; do not commit secrets for tests. |
| Service test talks to real DB | Add `vi.mock("./your.repository")` like in section 7 Level 2. |

When a test fails, Vitest prints **Expected** vs **Received** — read that diff first.

---

## 11. Example files in this repo (read these)

| Topic | File |
|-------|------|
| Full guided example (users module) | `src/modules/users/users.schemas.test.ts` |
| Zod + `parseInput` | `src/shared/validation/parse-input.test.ts` |
| JWT sign/verify | `src/shared/services/jwt-service.test.ts` |
| Route param parsing | `src/shared/http/parse-route-id.test.ts` |
| HTTP integration | `tests/integration/test-routes.test.ts` |
| Test env setup | `tests/setup.ts` |
| Vitest config | `vitest.config.mts` |

---

## 12. Quick reference

```bash
npm test                                              # all tests
npm run test:watch                                    # watch mode
npm test -- src/modules/users/users.schemas.test.ts   # one file
```

```ts
import { describe, expect, it, vi, beforeEach } from "vitest";
```

**File naming:** `<module-or-feature>.test.ts` next to source, or under `tests/integration/` for HTTP.

**Start with:** schema tests → then services with mocks → then Supertest for routes.

If you get stuck, open `src/modules/users/users.schemas.test.ts`, copy a `describe` / `it` block, change the imports and assertions, and run `npm test`.
