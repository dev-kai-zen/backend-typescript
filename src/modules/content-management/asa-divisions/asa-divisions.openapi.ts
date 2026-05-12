/**
 * OpenAPI fragments for `asa-divisions.routes.ts`.
 * Consumed by swagger-jsdoc via `config/swagger-config.ts` (`apis` glob); not imported at runtime.
 */

/**
 * @openapi
 * /content-management/asa-divisions:
 *   get:
 *     tags: [Content management — ASA divisions]
 *     summary: List ASA divisions
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
 *                       divisionName:
 *                         type: string
 *                       asaOperationId:
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
 *     tags: [Content management — ASA divisions]
 *     summary: Create ASA division
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: false
 *             required:
 *               - divisionName
 *               - asaOperationId
 *             properties:
 *               divisionName:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 255
 *               asaOperationId:
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
 *                 divisionName:
 *                   type: string
 *                 asaOperationId:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Validation error or invalid asaOperationId
 *       500:
 *         description: Server error
 */

/**
 * @openapi
 * /content-management/asa-divisions/{id}:
 *   get:
 *     tags: [Content management — ASA divisions]
 *     summary: Get ASA division
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
 *                 divisionName:
 *                   type: string
 *                 asaOperationId:
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
 *     tags: [Content management — ASA divisions]
 *     summary: Update ASA division
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
 *               - divisionName
 *               - asaOperationId
 *             properties:
 *               divisionName:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 255
 *               asaOperationId:
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
 *                 divisionName:
 *                   type: string
 *                 asaOperationId:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Validation error, invalid id, or invalid asaOperationId
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 *   delete:
 *     tags: [Content management — ASA divisions]
 *     summary: Delete ASA division
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

export {};
