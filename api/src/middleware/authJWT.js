require('dotenv').config()
const jwt = require("jsonwebtoken");

const secretKey = process.env.ACCESS_TOKEN_SECRET

// verify the JWT token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ error: 'unauthorized' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(498).json({ error: 'invalid_token' });
        }

        req.userId = decoded.id;
        next();
    });
}


module.exports = verifyToken