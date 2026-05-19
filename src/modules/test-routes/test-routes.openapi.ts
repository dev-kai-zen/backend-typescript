/**
 * OpenAPI fragments for `test-routes.ts`.
 * Consumed by swagger-jsdoc via `config/swagger-config.ts` (`apis` glob); not imported at runtime.
 *
 * All JSON responses use the shared envelope from `sendSuccess` / `sendError`:
 * `{ status: boolean, message: string, data: T | null }`.
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
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiEnvelope'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         service:
 *                           type: string
 *             example:
 *               status: true
 *               message: backend-typescript APIs
 *               data:
 *                 service: backend-typescript
 */

/** Binds the preceding `@openapi` block into emitted `.js` for swagger-jsdoc. */
export const openapiDocAnchor0 = undefined;

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
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiEnvelope'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         status:
 *                           type: string
 *                           description: Health message (not the envelope `status` boolean)
 *             example:
 *               status: true
 *               message: Health check OK
 *               data:
 *                 status: API is running
 */

/** Binds the preceding `@openapi` block into emitted `.js` for swagger-jsdoc. */
export const openapiDocAnchor1 = undefined;

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
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiEnvelope'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         userId:
 *                           type: integer
 *                         email:
 *                           type: string
 *                         rolesFromJwt:
 *                           type: array
 *                           items:
 *                             type: string
 *                         permissionsFromJwt:
 *                           type: array
 *                           items:
 *                             type: string
 *             example:
 *               status: true
 *               message: Authenticated profile from JWT
 *               data:
 *                 userId: 1
 *                 email: user@example.com
 *                 rolesFromJwt: ["admin"]
 *                 permissionsFromJwt: ["user:view"]
 *       401:
 *         description: Missing/invalid Bearer token or inactive user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiEnvelope'
 *             example:
 *               status: false
 *               message: Unauthorized
 *               data: null
 */

/** Binds the preceding `@openapi` block into emitted `.js` for swagger-jsdoc. */
export const openapiDocAnchor2 = undefined;

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
 *               $ref: '#/components/schemas/ApiEnvelope'
 *             example:
 *               status: true
 *               message: OK — JWT contained a matching role
 *               data: null
 *       401:
 *         description: Missing/invalid Bearer token or inactive user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiEnvelope'
 *             example:
 *               status: false
 *               message: Unauthorized
 *               data: null
 *       403:
 *         description: Authenticated but required role missing from JWT
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiEnvelope'
 *             example:
 *               status: false
 *               message: Forbidden
 *               data: null
 */

/** Binds the preceding `@openapi` block into emitted `.js` for swagger-jsdoc. */
export const openapiDocAnchor3 = undefined;

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
 *               $ref: '#/components/schemas/ApiEnvelope'
 *             example:
 *               status: true
 *               message: OK — current DB RBAC grants the required permission code
 *               data: null
 *       401:
 *         description: Missing/invalid Bearer token or inactive user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiEnvelope'
 *             example:
 *               status: false
 *               message: Unauthorized
 *               data: null
 *       403:
 *         description: Forbidden (no `authUser`) or permission not granted for this user in DB
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiEnvelope'
 *             example:
 *               status: false
 *               message: Forbidden
 *               data: null
 */

/** Binds the preceding `@openapi` block into emitted `.js` for swagger-jsdoc. */
export const openapiDocAnchor4 = undefined;
