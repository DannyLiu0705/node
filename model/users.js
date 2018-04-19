
var sequelize = require('../util/conn.js')
const Sequelize = require('sequelize');
const users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    timestamps: false,
    freezeTableName: true
})

module.exports = users;