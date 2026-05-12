/**
 * OpenAPI fragments for `asa-branches.routes.ts`.
 * Consumed by swagger-jsdoc via `config/swagger-config.ts` (`apis` glob); not imported at runtime.
 */

/**
 * @openapi
 * /content-management/asa-branches:
 *   get:
 *     tags: [Content management — ASA branches]
 *     summary: List ASA branches
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
 *                       branchCode:
 *                         type: string
 *                       branchName:
 *                         type: string
 *                       asaAreaId:
 *                         type: integer
 *                       asaBranchTypeId:
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
 *     tags: [Content management — ASA branches]
 *     summary: Create ASA branch
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: false
 *             required:
 *               - branchCode
 *               - branchName
 *               - asaAreaId
 *               - asaBranchTypeId
 *             properties:
 *               branchCode:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 64
 *               branchName:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 255
 *               asaAreaId:
 *                 type: integer
 *                 minimum: 1
 *               asaBranchTypeId:
 *                 type: integer
 *                 minimum: 1
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Validation error or invalid foreign keys
 *       409:
 *         description: branchCode already exists
 *       500:
 *         description: Server error
 */

/**
 * @openapi
 * /content-management/asa-branches/{id}:
 *   get:
 *     tags: [Content management — ASA branches]
 *     summary: Get ASA branch
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
 *       400:
 *         description: Invalid id
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 *   patch:
 *     tags: [Content management — ASA branches]
 *     summary: Update ASA branch
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
 *               - branchCode
 *               - branchName
 *               - asaAreaId
 *               - asaBranchTypeId
 *             properties:
 *               branchCode:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 64
 *               branchName:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 255
 *               asaAreaId:
 *                 type: integer
 *                 minimum: 1
 *               asaBranchTypeId:
 *                 type: integer
 *                 minimum: 1
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Validation error or invalid foreign keys
 *       404:
 *         description: Not found
 *       409:
 *         description: branchCode already exists
 *       500:
 *         description: Server error
 *   delete:
 *     tags: [Content management — ASA branches]
 *     summary: Delete ASA branch
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
