require('dotenv').config()
const express = require('express')
const cors = require('cors')
const sequelize = require('./config/database')
const auth_routes = require('./routes/auth.routes')
const tasks_routes = require('./routes/tasks.routes')
const details_user = require('./routes/user.routes')

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json())

app.use('/api', auth_routes)
app.use('/api', tasks_routes)
app.use('/api', details_user)

sequelize.sync().then(() => console.log('Connected database'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))