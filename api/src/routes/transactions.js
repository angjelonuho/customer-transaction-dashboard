const express = require('express');
const router = express.Router();
const verifyToken = require("../middleware/authJWT")
const transactionsController = require("../controllers/transactionsController")

router.get('/', verifyToken, transactionsController.allTransactions)
router.get('/:id', verifyToken, transactionsController.transactionsById)


module.exports = router;