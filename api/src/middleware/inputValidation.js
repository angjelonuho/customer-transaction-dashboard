const validateLoginData = (req, res, next) => {
    // TODO: COMPLETE VALIDATION LOGIG
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    next();
}

module.exports = {
    validateLoginData,
};
