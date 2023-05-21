/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: API endpoints for managing transactions
 */

const express = require('express');
const router = express.Router();
const verifyToken = require("../middleware/authJWT")
const transactionsController = require("../controllers/transactionsController")

/**
 * @swagger
 * /v1/transactions:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: Successfully retrieved transactions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       500:
 *         description: Internal server error.
 */

router.get('/', verifyToken, transactionsController.allTransactions)


/**
 * @swagger
 * /v1/transactions/{id}:
 *   get:
 *     summary: Get transactions by customer ID
 *     tags: [Transactions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the customer
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved transactions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *       404:
 *         description: Customer not found or no transactions available.
 *       500:
 *         description: Internal server error.
 */
router.get('/:id', verifyToken, transactionsController.transactionsById)


module.exports = router;