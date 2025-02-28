const jwt = require('jsonwebtoken')
require('dotenv').config()

const auth_middleware = (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) {
        return res.status(401).json({ message: 'Access denied, token required' })
    }

    try{
        const token_is_valid = jwt.verify(token.replace('Bearer ', ""), process.env.JWT_SECRET)
        req.user = token_is_valid
        next()
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' })
    }
}

module.exports = auth_middleware