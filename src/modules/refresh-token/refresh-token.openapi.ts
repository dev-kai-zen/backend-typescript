/**
 * OpenAPI fragments for `refresh-token.routes.ts`.
 * Consumed by swagger-jsdoc via `config/swagger-config.ts` (`apis` glob); not imported at runtime.
 */

/**
 * @openapi
 * /refresh-tokens:
 *   get:
 *     tags: [Refresh tokens]
 *     summary: List refresh tokens
 *     responses:
 *       200:
 *         description: OK
 *   post:
 *     tags: [Refresh tokens]
 *     summary: Create refresh token
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

/** Binds the preceding `@openapi` block into emitted `.js` for swagger-jsdoc. */
export const openapiDocAnchor0 = undefined;

/**
 * @openapi
 * /refresh-tokens/revoke:
 *   post:
 *     tags: [Refresh tokens]
 *     summary: Revoke refresh token
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Validation error
 */

/** Binds the preceding `@openapi` block into emitted `.js` for swagger-jsdoc. */
export const openapiDocAnchor1 = undefined;

/**
 * @openapi
 * /refresh-tokens/{id}:
 *   get:
 *     tags: [Refresh tokens]
 *     summary: Get refresh token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 *   delete:
 *     tags: [Refresh tokens]
 *     summary: Delete refresh token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted
 *       404:
 *         description: Not found
 */

/** Binds the preceding `@openapi` block into emitted `.js` for swagger-jsdoc. */
export const openapiDocAnchor2 = undefined;
