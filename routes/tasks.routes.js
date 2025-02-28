const express = require('express')
const Task = require('../models/Tasks')
const auth_middleware = require('../middlewares')

const router = express.Router()

router.get('/tasks', auth_middleware, async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { user_id: req.user.id } })
        res.json(tasks)
    } catch (err) {
        res.status(500).json({ message: 'Error getting tasks' })
    }
})

module.exports = router