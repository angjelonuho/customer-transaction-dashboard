/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 */

require('dotenv').config()
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')

/**
 * @swagger
 * /v1/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: john_doe
 *               password: password123
 *     responses:
 *       200:
 *         description: Successfully logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: Access token
 *                 refreshToken:
 *                   type: string
 *                   description: Refresh token
 *       401:
 *         description: Invalid credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error.
 */

router.post('/login', authController.login);

/**
 * @swagger
 * /v1/auth/token:
 *   post:
 *     summary: Refresh access token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Refresh token
 *             example:
 *               token: <refresh_token_value>
 *     responses:
 *       200:
 *         description: New access token generated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: Access token
 *       401:
 *         description: Unauthorized. Refresh token is missing or invalid.
 *       403:
 *         description: Forbidden. Refresh token not found in the list of valid tokens.
 *       500:
 *         description: Internal server error.
 */
router.post('/token', authController.token);


 /**
 * @swagger
 * /v1/auth/logout:
 *   delete:
 *     summary: User logout
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Refresh token
 *             example:
 *               token: <refresh_token_value>
 *     responses:
 *       204:
 *         description: Successfully logged out.
 *       500:
 *         description: Internal server error.
 */
router.delete('/logout', authController.logout)

module.exports = router;

