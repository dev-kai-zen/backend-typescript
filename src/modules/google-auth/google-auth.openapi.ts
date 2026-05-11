/**
 * OpenAPI fragments for `google-auth.routes.ts`.
 * Consumed by swagger-jsdoc via `config/swagger-config.ts` (`apis` glob); not imported at runtime.
 */

/**
 * @openapi
 * /google-auth/login:
 *   post:
 *     tags: [Google auth]
 *     summary: Exchange Google ID token for API access token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - googleToken
 *             properties:
 *               googleToken:
 *                 type: string
 *                 description: Google ID token (credential) from Sign-In
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Missing token
 *       401:
 *         description: Invalid Google token
 */

/**
 * @openapi
 * /google-auth/refresh:
 *   post:
 *     tags: [Google auth]
 *     summary: Issue a new access token using the httpOnly refresh cookie
 *     responses:
 *       200:
 *         description: New access token in JSON body
 *       401:
 *         description: Missing or invalid refresh cookie
 */

/**
 * @openapi
 * /google-auth/logout:
 *   post:
 *     tags: [Google auth]
 *     summary: Clear refresh cookie and sign out
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @openapi
 * /google-auth/me:
 *   get:
 *     tags: [Google auth]
 *     summary: Current user from JWT
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 */

export {};
