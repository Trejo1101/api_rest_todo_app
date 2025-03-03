const express = require('express')
const Task = require('../models/Tasks')
const auth_middleware = require('../middlewares/auth')

const router = express.Router()

router.get('/tasks', auth_middleware, async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { user_id: req.user.id } })
        res.json(tasks)
    } catch (err) {
        res.status(500).json({ message: 'Error getting tasks' })
    }
})

router.post('/tasks', auth_middleware, async (req, res) => {
    const { description } = req.body
    if (!description) {
        return res.status(400).json({ message: 'Id not found' })
    }
    try {
        const new_task = await Task.create( { description, user_id: req.user.id } )
        return res.status(201).json({ message: 'Created task', task_id: new_task.id })
    } catch (err) {
        return res.status(500).json({ message: 'Error creating task' })
    }
})

router.put('/tasks/:id', auth_middleware, async (req, res) => {
    const task_id = req.params.id
    const { description } = req.body
    const exists_task = await Task.findOne({ where: { id: task_id, user_id: req.user.id } })
    if (!exists_task) {
        return res.status(400).json({ message: 'Id not found' })
    }
    try {
        const update_task = await exists_task.update({ description })
        return res.status(200).json({ message: 'Update completed successfully' })
    } catch (err) {
        return res.status(500).json({ message: 'Error updating task' })
    }
})

router.put('/tasks/completed/:id', auth_middleware, async (req, res) => {
    const task_id = req.params.id
    const { is_completed } = req.body
    const exists_task = await Task.findOne({ where: { id: task_id, user_id: req.user.id } })
    if (!exists_task) {
        return res.status(400).json({ message: 'Id not found' })
    }
    try {
        const update_task = await exists_task.update({ is_completed })
        return res.status(200).json({ message: 'Update completed successfully' })
    } catch (err) {
        return res.status(500).json({ message: 'Error updating task' })
    }
})

router.delete('/tasks/:id', auth_middleware, async (req, res) => {
    const task_id = req.params.id
    const exists_task = await Task.findOne({ where: { id: task_id, user_id: req.user.id } })
    if (!exists_task) {
        return res.status(400).json({ message: 'Id not found' })
    }
    try {
        const delete_task = await Task.destroy({ where: { id: task_id, user_id: req.user.id } })
        return res.status(200).json({ message: 'Delete completed successfully' })
    } catch (err) {
        return res.status(500).json({ message: 'Error deleting task' })
    }
})

module.exports = router