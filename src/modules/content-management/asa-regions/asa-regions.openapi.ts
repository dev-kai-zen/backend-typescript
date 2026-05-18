/**
 * OpenAPI fragments for `asa-regions.routes.ts`.
 * Consumed by swagger-jsdoc via `config/swagger-config.ts` (`apis` glob); not imported at runtime.
 */

/**
 * @openapi
 * /content-management/asa-regions:
 *   get:
 *     tags: [Content management — ASA regions]
 *     summary: List ASA regions
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       regionName:
 *                         type: string
 *                       asaDivisionId:
 *                         type: integer
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: Server error
 *   post:
 *     tags: [Content management — ASA regions]
 *     summary: Create ASA region
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: false
 *             required:
 *               - regionName
 *               - asaDivisionId
 *             properties:
 *               regionName:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 255
 *               asaDivisionId:
 *                 type: integer
 *                 minimum: 1
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 regionName:
 *                   type: string
 *                 asaDivisionId:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Validation error or invalid asaDivisionId
 *       500:
 *         description: Server error
 */

/** Binds the preceding `@openapi` block into emitted `.js` for swagger-jsdoc. */
export const openapiDocAnchor0 = undefined;

/**
 * @openapi
 * /content-management/asa-regions/{id}:
 *   get:
 *     tags: [Content management — ASA regions]
 *     summary: Get ASA region
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 regionName:
 *                   type: string
 *                 asaDivisionId:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Invalid id
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 *   patch:
 *     tags: [Content management — ASA regions]
 *     summary: Update ASA region
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: false
 *             required:
 *               - regionName
 *               - asaDivisionId
 *             properties:
 *               regionName:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 255
 *               asaDivisionId:
 *                 type: integer
 *                 minimum: 1
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 regionName:
 *                   type: string
 *                 asaDivisionId:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Validation error, invalid id, or invalid asaDivisionId
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 *   delete:
 *     tags: [Content management — ASA regions]
 *     summary: Delete ASA region
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       204:
 *         description: Deleted
 *       400:
 *         description: Invalid id
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

/** Binds the preceding `@openapi` block into emitted `.js` for swagger-jsdoc. */
export const openapiDocAnchor1 = undefined;
