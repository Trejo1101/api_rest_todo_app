const express = require('express')
const auth_middleware = require('../middlewares/auth')
const User = require('../models/User')

const router = express.Router()

router.get('/user', auth_middleware, async (req, res) => {
    try {
        const details_user = await User.findAll({ where: { id: req.user.id } })
        res.json(details_user)
    } catch (err) {
        res.status(500).json({ message: 'Error getting details user' })
    }
})

module.exports = router