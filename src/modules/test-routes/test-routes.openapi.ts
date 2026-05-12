/**
 * OpenAPI fragments for `test-routes.ts`.
 * Consumed by swagger-jsdoc via `config/swagger-config.ts` (`apis` glob); not imported at runtime.
 *
 * Swagger `servers.url` is `/api/v1`, so paths here are `/test/...`.
 */

/**
 * @openapi
 * /test:
 *   get:
 *     tags: [Test]
 *     summary: Sample greeting
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @openapi
 * /test/health:
 *   get:
 *     tags: [Test]
 *     summary: Health check
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 */

/**
 * @openapi
 * /test/protected/me:
 *   get:
 *     tags: [Test]
 *     summary: Sample protected route — requires Bearer access JWT
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Caller identity and JWT role/permission claims
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 rolesFromJwt:
 *                   type: array
 *                   items:
 *                     type: string
 *                 permissionsFromJwt:
 *                   type: array
 *                   items:
 *                     type: string
 *       401:
 *         description: Missing/invalid Bearer token or inactive user
 */

/**
 * @openapi
 * /test/protected/by-jwt-role:
 *   get:
 *     tags: [Test]
 *     summary: Sample routesGuard — match role names from the JWT (`source token`)
 *     description: |
 *       Demonstrates `routesGuard({ roles: ["admin"], source: "token" })`.
 *       Replace the configured role names in code to match your `rbac_roles.role_name` values.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User had at least one required role embedded in the access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Missing/invalid Bearer token or inactive user
 *       403:
 *         description: Authenticated but required role missing from JWT
 */

/**
 * @openapi
 * /test/protected/by-db-permission:
 *   get:
 *     tags: [Test]
 *     summary: Sample routesGuard — permissions loaded from DB (`source db`)
 *     description: |
 *       Demonstrates `routesGuard({ permissions: ["user:view"], source: "db" })`.
 *       Replace the permission codes in code to match your `rbac_permissions.permission_code` values.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current DB RBAC grants all required permission codes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Missing/invalid Bearer token or inactive user
 *       403:
 *         description: Forbidden (no `authUser`) or permission not granted for this user in DB
 */

export {};
