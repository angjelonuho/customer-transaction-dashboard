const express = require('express');
const router = express.Router();
const verifyToken = require("../middleware/authJWT")
const customersController = require('../controllers/customersController')

router.get('/', verifyToken, customersController.customers)

module.exports = router;