/**
 * OpenAPI fragments for `asa-areas.routes.ts`.
 * Consumed by swagger-jsdoc via `config/swagger-config.ts` (`apis` glob); not imported at runtime.
 */

/**
 * @openapi
 * /content-management/asa-areas:
 *   get:
 *     tags: [Content management — ASA areas]
 *     summary: List ASA areas
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
 *                       areaName:
 *                         type: string
 *                       asaRegionId:
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
 *     tags: [Content management — ASA areas]
 *     summary: Create ASA area
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: false
 *             required:
 *               - areaName
 *               - asaRegionId
 *             properties:
 *               areaName:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 255
 *               asaRegionId:
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
 *                 areaName:
 *                   type: string
 *                 asaRegionId:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Validation error or invalid asaRegionId
 *       500:
 *         description: Server error
 */

/** Binds the preceding `@openapi` block into emitted `.js` for swagger-jsdoc. */
export const openapiDocAnchor0 = undefined;

/**
 * @openapi
 * /content-management/asa-areas/{id}:
 *   get:
 *     tags: [Content management — ASA areas]
 *     summary: Get ASA area
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
 *                 areaName:
 *                   type: string
 *                 asaRegionId:
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
 *     tags: [Content management — ASA areas]
 *     summary: Update ASA area
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
 *               - areaName
 *               - asaRegionId
 *             properties:
 *               areaName:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 255
 *               asaRegionId:
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
 *                 areaName:
 *                   type: string
 *                 asaRegionId:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Validation error, invalid id, or invalid asaRegionId
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 *   delete:
 *     tags: [Content management — ASA areas]
 *     summary: Delete ASA area
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
