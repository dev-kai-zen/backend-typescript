/**
 * OpenAPI fragments for `rbac-roles.routes.ts`.
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

/** Binds the preceding `@openapi` block into emitted `.js` for swagger-jsdoc. */
export const openapiDocAnchor0 = undefined;

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
 *   put:
 *     tags: [RBAC — Roles]
 *     summary: Replace all permissions for role
 *     description: Removes existing role-permission rows for this role, then inserts the given list. Send an empty permissionIds array to clear all.
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
 *             required: [permissionIds]
 *             properties:
 *               permissionIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: OK — returns the new link rows
 *       400:
 *         description: Validation or invalid permission id
 *       404:
 *         description: Role not found
 */

/** Binds the preceding `@openapi` block into emitted `.js` for swagger-jsdoc. */
export const openapiDocAnchor1 = undefined;

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

/** Binds the preceding `@openapi` block into emitted `.js` for swagger-jsdoc. */
export const openapiDocAnchor2 = undefined;

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

/** Binds the preceding `@openapi` block into emitted `.js` for swagger-jsdoc. */
export const openapiDocAnchor3 = undefined;
