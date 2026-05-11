/**
 * OpenAPI fragments for `rbac-permissions.routes.ts`.
 * Consumed by swagger-jsdoc via `config/swagger-config.ts` (`apis` glob); not imported at runtime.
 */

/**
 * @openapi
 * /rbac/permissions:
 *   get:
 *     tags: [RBAC — Permissions]
 *     summary: List permissions
 *     responses:
 *       200:
 *         description: OK
 *   post:
 *     tags: [RBAC — Permissions]
 *     summary: Create permission
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

/**
 * @openapi
 * /rbac/permissions/{id}:
 *   get:
 *     tags: [RBAC — Permissions]
 *     summary: Get permission
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
 *   patch:
 *     tags: [RBAC — Permissions]
 *     summary: Update permission
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *     tags: [RBAC — Permissions]
 *     summary: Delete permission
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

export {};
