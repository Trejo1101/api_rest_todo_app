const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const User = require('./User')

const Task = sequelize.define('Task', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description: { type: DataTypes.STRING, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
    is_completed: { type: DataTypes.BOOLEAN, defaultValue: false }
})

User.hasMany(Task, { foreignKey: 'user_id' })
Task.belongsTo(User, { foreignKey: 'user_id' })

module.exports = Task