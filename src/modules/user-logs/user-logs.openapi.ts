/**
 * OpenAPI fragments for `user-logs.routes.ts`.
 * Consumed by swagger-jsdoc via `config/swagger-config.ts` (`apis` glob); not imported at runtime.
 */

/**
 * @openapi
 * /user-logs:
 *   get:
 *     tags: [User logs]
 *     summary: List user logs
 *     responses:
 *       200:
 *         description: OK
 *   post:
 *     tags: [User logs]
 *     summary: Create user log
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Validation error
 */

export {};
