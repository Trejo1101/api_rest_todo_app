const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config()

const router = express.Router()

router.post('/register', async (req, res) => {
    const { name, last_name, email, user_password } = req.body
    if (!name || !last_name || !email || !user_password){
        return res.status(400).json({ message: 'Invalid data' })
    }
    
    const salt = await bcrypt.getSalt(10)
    const hashed_password = await bcrypt.hash(user_password, salt)

    try{
        const new_user = await User.create({ name, last_name, email, user_password: hashed_password })
        res.status(201).json({ message: 'Created user', user_id: new_user.id })
    } catch(err){
        res.status(500).json({ message: 'Error creating user' })
    }
})

router.post('/login', async (req, res) => {
    const { email, user_password } = req.body
    const user = await User.findOne({ where: { email } })

    if (!email || !(await bcrypt.compare(user_password, user.user_password))){
        return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '15m' })
    res.json({ token })
})

module.exports = router