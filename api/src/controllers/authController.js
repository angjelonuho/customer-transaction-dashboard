require('dotenv').config()
const jwt = require('jsonwebtoken');

// Mock users db
const { users } = require('../models/users.json')

const secretKey = process.env.ACCESS_TOKEN_SECRET;
const refreshSecretKey = process.env.REFRESH_TOKEN_SECRET;

//no db so we put it here
let refreshTokens = []

// Handles user login
exports.login = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    console.log(user)

    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const accessToken = signAccessToken(user)
    const refreshToken = jwt.sign(user, refreshSecretKey)
    refreshTokens.push(refreshToken)
    res.json({ accessToken, refreshToken });
}

// Generates a new access token using a refresh token
exports.token = (req, res) => {
    const refreshToken = req.body.token

    if (refreshToken == null) return res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

    jwt.verify(refreshToken, refreshSecretKey, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = signAccessToken({ name: user.name })
        res.json({ accessToken })
    })
}

// Handles user logout and removes the refresh token
exports.logout = (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
}

// Signs an access token for a given user
const signAccessToken = (user) => {
    return jwt.sign(user, secretKey, { expiresIn: '1h' })
}