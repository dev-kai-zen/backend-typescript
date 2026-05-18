/**
 * OpenAPI fragments for `users.routes.ts`.
 * Consumed by swagger-jsdoc via `config/swagger-config.ts` (`apis` glob); not imported at runtime.
 */

/**
 * @openapi
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: List users
 *     parameters:
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: string
 *           enum: ["true", "false"]
 *         description: Filter by active flag
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Server error
 *   post:
 *     tags: [Users]
 *     summary: Create user
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
 *       409:
 *         description: Duplicate email or googleId
 */

/** Binds the preceding `@openapi` block into emitted `.js` for swagger-jsdoc. */
export const openapiDocAnchor0 = undefined;

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get user by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Invalid id
 *       404:
 *         description: Not found
 *   patch:
 *     tags: [Users]
 *     summary: Update user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
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
 *       404:
 *         description: Not found
 *   delete:
 *     tags: [Users]
 *     summary: Delete user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Deleted
 *       400:
 *         description: Invalid id
 *       404:
 *         description: Not found
 */

/** Binds the preceding `@openapi` block into emitted `.js` for swagger-jsdoc. */
export const openapiDocAnchor1 = undefined;
