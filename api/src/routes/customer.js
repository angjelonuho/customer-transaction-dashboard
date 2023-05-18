const express = require('express');
const router = express.Router();
const verifyToken = require("../middleware/authJWT")

router.get('/', verifyToken, (req, res) => {
    res.send(req.body);
})

module.exports = router;