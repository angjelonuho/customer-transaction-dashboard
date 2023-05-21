
/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: API endpoints for managing customers
 */


const express = require('express');
const router = express.Router();
const verifyToken = require("../middleware/authJWT")
const customersController = require('../controllers/customersController')

/**
 * @swagger
 * /v1/customers:
 *   get:
 *     summary: Get customers
 *     tags: [Customers]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved customers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/', verifyToken, customersController.customers)

module.exports = router;