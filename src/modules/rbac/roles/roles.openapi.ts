/**
 * OpenAPI fragments for `roles.routes.ts`.
 * Consumed by swagger-jsdoc via `config/swagger-config.ts` (`apis` glob); not imported at runtime.
 */

/**
 * @openapi
 * /rbac/roles:
 *   get:
 *     tags: [RBAC — Roles]
 *     summary: List roles
 *     responses:
 *       200:
 *         description: OK
 *   post:
 *     tags: [RBAC — Roles]
 *     summary: Create role
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
 * /rbac/roles/{id}/permissions:
 *   get:
 *     tags: [RBAC — Roles]
 *     summary: List permissions linked to role
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *   post:
 *     tags: [RBAC — Roles]
 *     summary: Link permission to role
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
 *       201:
 *         description: Created
 *       400:
 *         description: Validation error
 */

/**
 * @openapi
 * /rbac/roles/{id}/permissions/{permissionId}:
 *   delete:
 *     tags: [RBAC — Roles]
 *     summary: Unlink permission from role
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: permissionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted
 *       404:
 *         description: Not found
 */

/**
 * @openapi
 * /rbac/roles/{id}:
 *   get:
 *     tags: [RBAC — Roles]
 *     summary: Get role
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
 *     tags: [RBAC — Roles]
 *     summary: Update role
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
 *     tags: [RBAC — Roles]
 *     summary: Delete role
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
