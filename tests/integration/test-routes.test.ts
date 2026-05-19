import request from "supertest";
import { describe, expect, it } from "vitest";

import { createTestApp } from "../helpers/create-test-app";

describe("GET /api/v1/test", () => {
  const app = createTestApp();

  it("returns service info", async () => {
    const res = await request(app).get("/api/v1/test/");

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      status: true,
      data: { service: "backend-typescript" },
    });
  });
});

describe("GET /api/v1/test/health", () => {
  const app = createTestApp();

  it("returns health status", async () => {
    const res = await request(app).get("/api/v1/test/health");

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      status: true,
      message: "Health check OK",
      data: { status: "API is running" },
    });
  });
});

describe("GET /api/v1/test/protected/me", () => {
  const app = createTestApp();

  it("returns 401 without Authorization header", async () => {
    const res = await request(app).get("/api/v1/test/protected/me");

    expect(res.status).toBe(401);
    expect(res.body).toMatchObject({
      status: false,
      message: "Unauthorized",
      data: null,
    });
  });
});
