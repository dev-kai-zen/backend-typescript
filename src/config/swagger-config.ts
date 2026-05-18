import type { Express } from "express";
import path from "node:path";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

/**
 * Paths consumed by swagger-jsdoc. Each "*.openapi.ts" file exports `openapiDocAnchorN`
 * sentinels so `tsc` keeps `@openapi` JSDoc in the emitted "*.openapi.js" files. A bare
 * `export {}` previously dropped those comments, which left Swagger UI empty in production.
 */
function routeDocGlobs(): string[] {
  const ext = __filename.endsWith(".ts") ? "ts" : "js";
  const root = path.join(__dirname, "..");
  return [
    path.join(root, "modules", "**", `*.${ext}`),
    path.join(root, "shared", "routes", "**", `*.${ext}`),
  ];
}

export function setupSwagger(app: Express): void {
  const openapiSpecification = swaggerJsdoc({
    definition: {
      openapi: "3.0.3",
      info: {
        title: "backend-typescript API",
        version: "1.0.0",
        description: "REST API documentation. Routes are mounted under `/api/v1`.",
      },
      servers: [{ url: "/api/v1" }],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
    apis: routeDocGlobs(),
  });

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(openapiSpecification, {
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: "API Docs",
    }),
  );

  /** Raw OpenAPI JSON (useful for code generators and Postman import). */
  app.get("/api-docs.json", (_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(openapiSpecification);
  });
}
